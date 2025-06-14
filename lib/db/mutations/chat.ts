import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/utils/supabase/server";
import {
  handleDatabaseError,
  PostgrestError,
  type Client,
  type Message,
} from "@/lib/types/supabase";

const getSupabase = async () => createClient();

async function mutateQuery<T extends any[]>(
  queryFn: (client: Client, ...args: T) => Promise<void>,
  args: T,
  tags: string[]
) {
  const supabase = await getSupabase();
  try {
    await queryFn(supabase, ...args);
    tags.forEach((tag) => revalidateTag(tag));
  } catch (error) {
    handleDatabaseError(error as PostgrestError);
  }
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  await mutateQuery(
    async (client, { id, userId, title }) => {
      const now = new Date().toISOString();
      const { error } = await client.from("chats").insert({
        id,
        user_id: userId,
        title,
        created_at: now,
        updated_at: now,
      });
      if (error) throw error;
    },
    [{ id, userId, title }],
    [`user_${userId}_chats`, `chat_${id}`, "chats"]
  );
}

export async function deleteChatById(chatId: string, userId: string) {
  await mutateQuery(
    async (client, id) => {
      // Messages will be automatically deleted due to CASCADE
      const { error } = await client.from("chats").delete().eq("id", id);
      if (error) throw error;
    },
    [chatId],
    [
      `chat_${chatId}`, // Invalidate specific chat
      `user_${userId}_chats`, // Invalidate user's chat list
      `chat_${chatId}_messages`, // Invalidate chat messages
      "chats", // Invalidate all chats cache
    ]
  );
}

export async function saveMessages({
  chatId,
  messages,
}: {
  chatId: string;
  messages: Message[];
}) {
  await mutateQuery(
    async (client, { chatId, messages }) => {
      const formattedMessages = messages.map((message) => {
        // Handle tool invocations and content
        let content = message.content;

        // If message has tool invocations, save them as part of the content
        if (message?.toolInvocations && message?.toolInvocations?.length > 0) {
          content = JSON.stringify({
            content: message.content,
            toolInvocations: message.toolInvocations,
          });
        } else if (typeof content === "object") {
          content = JSON.stringify(content);
        }

        // Handle annotations if present
        if (message.annotations && message.annotations?.length > 0) {
          content = JSON.stringify({
            content: content,
            annotations: message.annotations,
          });
        }

        return {
          id: message.id,
          chat_id: chatId,
          role: message.role,
          content: content,
          created_at: message.created_at || new Date().toISOString(),
        };
      });

      const { error } = await client.from("messages").insert(formattedMessages);
      if (error) throw error;
    },
    [{ chatId, messages }],
    [`chat_${chatId}_messages`, `chat_${chatId}`]
  );
}

export async function saveDocument({
  id,
  content,
  title,
  userId,
}: {
  id: string;
  content: string;
  title: string;
  userId: string;
}) {
  const supabase = createClient();

  const newVersion = {
    id,
    content,
    title,
    user_id: userId,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("chat_documents").insert(newVersion);

  if (error) throw error;

  return { id };
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: string;
}) {
  await mutateQuery(
    async (client, { id, timestamp }) => {
      const { error } = await client
        .from("chat_documents")
        .delete()
        .eq("id", id)
        .gte("created_at", timestamp);
      if (error) throw error;
    },
    [{ id, timestamp }],
    [
      `document_${id}`, // Invalidate specific document
      `document_${id}_versions`, // Invalidate document versions
      "chat_documents", // Invalidate all documents cache
    ]
  );
}
