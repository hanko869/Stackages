import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Chat as PreviewChat } from "@/components/chat/chat";
import {
  getChatById,
  getMessagesByChatId,
  getSession,
} from "@/lib/db/cached-queries";
import { convertToUIMessages } from "@/lib/ai/chat";
import { availableModels } from "@/lib/ai/models";
import { toolConfig } from "../toolConfig";

export default async function Page(props: { params: Promise<any> }) {
  // Get user session
  const user = await getSession();

  // No paywall check here, it's handled in the chat route + the chat component for more flexibility

  // Extract chat ID from URL parameters
  const params = await props.params;
  const { id } = params;

  // Fetch chat data and verify it exists
  const chat = await getChatById(id);
  if (!chat) {
    notFound();
  }

  // Only allow access to own chats for authenticated users
  if (user && user.id !== chat.user_id) {
    notFound();
  }

  // Fetch chat messages from database
  const messagesFromDb = await getMessagesByChatId(id);

  // Get user preferences from cookies
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;
  const browseEnabledFromCookie =
    cookieStore.get("browse-enabled")?.value === "true";

  const selectedModelId =
    availableModels.find((model) => model.id === modelIdFromCookie)?.id ||
    toolConfig.aiModel;

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId={selectedModelId}
      initialBrowseEnabled={browseEnabledFromCookie}
      isAuthenticated={!!user}
    />
  );
}
