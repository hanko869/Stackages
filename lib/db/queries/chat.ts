import type { Client, Database } from "@/lib/types/supabase";

type Tables = Database["public"]["Tables"];

export async function saveChatQuery(
  client: Client,
  {
    id,
    userId,
    title,
  }: {
    id: string;
    userId: string;
    title: string;
  }
) {
  const { error } = await client.from("chats").insert({
    id,
    user_id: userId,
    title,
  });

  if (error) throw error;
}

export async function getChatByIdQuery(client: Client, { id }: { id: string }) {
  const { data: chat, error } = await client
    .from("chats")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return chat;
}

export async function getMessagesByChatIdQuery(
  client: Client,
  { id }: { id: string }
) {
  const { data: messages, error } = await client
    .from("messages")
    .select()
    .eq("chat_id", id)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return messages;
}

export async function saveMessagesQuery(
  client: Client,
  {
    chatId,
    messages,
  }: {
    chatId: string;
    messages: Tables["messages"]["Insert"][];
  }
) {
  const messagesWithChatId = messages.map((message) => ({
    ...message,
    chat_id: chatId,
  }));

  const { error } = await client.from("messages").insert(messagesWithChatId);

  if (error) throw error;
}

export async function getDocumentByIdQuery(
  client: Client,
  { id }: { id: string }
): Promise<Tables["chat_documents"]["Row"] | null> {
  const { data: documents, error } = await client
    .from("chat_documents")
    .select()
    .eq("id", id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) throw error;
  return documents?.[0] || null;
}

export async function saveDocumentQuery(
  client: Client,
  {
    id,
    title,
    content,
    userId,
  }: {
    id: string;
    title: string;
    content?: string;
    userId: string;
  }
) {
  const { error } = await client.from("chat_documents").insert({
    id,
    title,
    content,
    user_id: userId,
  });

  if (error) throw error;
}

export async function deleteDocumentsByIdAfterTimestampQuery(
  client: Client,
  { id, timestamp }: { id: string; timestamp: string }
) {
  const { error } = await client
    .from("chat_documents")
    .delete()
    .eq("id", id)
    .gte("created_at", timestamp);

  if (error) throw error;
}
