import { cookies } from "next/headers";
import { Chat } from "@/components/chat/chat";
import { generateUUID } from "@/lib/ai/chat";
import { availableModels } from "@/lib/ai/models";
import { getSession } from "@/lib/db/cached-queries";
import { toolConfig } from "./toolConfig";

export default async function Page() {
  // Get user session
  const user = await getSession();

  // No paywall check here, it's handled in the chat route + the chat component for more flexibility

  // Generate new chat ID
  const id = generateUUID();

  // Get user preferences from cookies
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;

  // Use model from cookie if valid, otherwise fallback to toolConfig.aiModel
  const selectedModelId =
    availableModels.find((model) => model.id === modelIdFromCookie)?.id ||
    toolConfig.aiModel;

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedModelId={selectedModelId}
      isAuthenticated={!!user}
    />
  );
}
