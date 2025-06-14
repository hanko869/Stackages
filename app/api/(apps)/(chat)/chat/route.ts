/**
 * Chat API Route Handler
 * This file manages the chat functionality, including message processing, document creation,
 * web information retrieval, and credit system management.
 *
 * Main Features:
 * 1. Process chat messages between user and AI
 * 2. Create and update documents based on chat interactions
 * 3. Browse the internet for information
 * 4. Save chat history and manage chat sessions
 * 5. Credit System Management:
 *    - Track and manage user credits
 *    - Handle premium vs free model access
 *    - Control access to premium features
 *    - Automatic credit deduction
 *
 * Credit System Flow:
 * 1. Check user's available credits
 * 2. Validate feature access based on credits
 * 3. Calculate costs for:
 *    - Premium AI models
 *    - Web browsing feature
 * 4. Deduct credits for premium usage
 * 5. Return credit status in response
 *
 * Available Endpoints:
 * - POST /api/chat: Process new messages, generate AI responses, handle credits
 * - DELETE /api/chat?id={chatId}: Delete an entire chat session
 */

import {
  convertToCoreMessages,
  CoreMessage,
  Message,
  StreamData,
  streamText,
  CoreUserMessage,
  generateText,
} from "ai";
import { createClient } from "@/lib/utils/supabase/server";
import { getChatById } from "@/lib/db/cached-queries";
import {
  saveChat,
  saveMessages,
  deleteChatById,
  reduceUserCredits,
} from "@/lib/db/mutations";
import { MessageRole } from "@/lib/types/supabase";
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from "@/lib/ai/chat";
import { createSystemPrompt } from "@/app/(apps)/chat/prompt";
import { createTools, allTools } from "@/app/(apps)/chat/tools";
import { customModel } from "@/lib/ai/ai-utils";
import { getUserCreditsQuery } from "@/lib/db/queries/general";
import {
  canUseConfiguration,
  FREE_MODELS,
} from "@/app/(apps)/chat/usage-limits";
import { AIModel } from "@/lib/ai/models";

/**
 * Configuration Settings
 * - maxDuration: Maximum time (in seconds) allowed for API response
 * - customMiddleware: Custom settings for the AI model behavior
 */
export const maxDuration = 60;

/**
 * Generates a title for a new chat based on the user's first message
 * @param message - The first message from the user
 * @returns A generated title (max 80 characters)
 */
async function generateTitleFromUserMessage({
  message,
  modelId = "gpt-4o-mini",
}: {
  message: CoreUserMessage;
  modelId?: string;
}) {
  console.log("Generating title using model:", modelId);
  const { text: title } = await generateText({
    model: customModel(modelId),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

/**
 * Gets the current authenticated user
 * @throws Error if user is not authenticated
 */
async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

/**
 * Formats message content for database storage based on message type
 * Handles different message formats:
 * - User messages: Stored as plain text
 * - Tool messages: Stored as formatted tool results
 * - Assistant messages: Stored as text and tool calls
 */
function formatMessageContent(message: CoreMessage): string {
  // For user messages, store as plain text
  if (message.role === "user") {
    return typeof message.content === "string"
      ? message.content
      : JSON.stringify(message.content);
  }

  // For tool messages, format as array of tool results
  if (message.role === "tool") {
    return JSON.stringify(
      message.content.map((content) => ({
        type: content.type || "tool-result",
        toolCallId: content.toolCallId,
        toolName: content.toolName,
        result: content.result,
      }))
    );
  }

  // For assistant messages, format as array of text and tool calls
  if (message.role === "assistant") {
    if (typeof message.content === "string") {
      return JSON.stringify([{ type: "text", text: message.content }]);
    }

    return JSON.stringify(
      message.content.map((content) => {
        if (content.type === "text") {
          return {
            type: "text",
            text: content.text,
          };
        }
        return {
          type: "tool-call",
          toolCallId: content.toolCallId,
          toolName: content.toolName,
          args: content.args,
        };
      })
    );
  }

  return "";
}

/**
 * Main POST Handler
 * Processes incoming chat messages and generates AI responses
 *
 * Flow:
 * 1. Validates user authentication
 * 2. Creates or retrieves chat session
 * 3. Checks credit balance and feature access
 * 4. Processes message with AI
 * 5. Handles tool interactions (documents, internet)
 * 6. Manages credit deductions for premium features
 * 7. Saves chat history
 *
 * Credit Headers:
 * Returns 'x-credit-usage' with:
 * - cost: Credits used
 * - remaining: Available balance
 * - features: Premium features accessed
 *
 * @param request Contains chat ID, messages, and feature settings
 */
export async function POST(request: Request) {
  const {
    id,
    messages,
    selectedModelId,
    isBrowseEnabled,
  }: {
    id: string;
    messages: Array<Message>;
    selectedModelId?: string;
    isBrowseEnabled: boolean;
  } = await request.json();

  console.log("Chat route params:", {
    id,
    selectedModelId,
    isBrowseEnabled,
    messageCount: messages.length,
  });

  const user = await getUser();

  if (!user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the most recent user message for title generation
  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  if (!userMessage || userMessage.role !== "user") {
    return new Response("No user message found", { status: 400 });
  }

  const supabase = createClient();
  const credits = await getUserCreditsQuery(supabase, user.id);

  try {
    // Chat title generation logic
    const chat = await getChatById(id);

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message: userMessage as CoreUserMessage,
        modelId: selectedModelId,
      });
      await saveChat({ id, userId: user.id, title });
    } else if (chat.user_id !== user.id) {
      return new Response("Unauthorized", { status: 401 });
    } else if (chat.title === "New Chat") {
      // Update the title if it's still the default
      const title = await generateTitleFromUserMessage({
        message: userMessage as CoreUserMessage,
        modelId: selectedModelId,
      });
      await supabase
        .from("chats")
        .update({ title })
        .eq("id", id)
        .eq("user_id", user.id);
    }

    await saveMessages({
      chatId: id,
      messages: [
        {
          id: generateUUID(),
          chat_id: id,
          role: userMessage.role as MessageRole,
          content: formatMessageContent(userMessage),
          created_at: new Date().toISOString(),
        },
      ],
    });

    const streamingData = new StreamData();

    const modelToUse = selectedModelId || "gpt-4o-mini";

    // Filter tools based on isBrowseEnabled
    const activeTools = isBrowseEnabled
      ? allTools
      : allTools.filter((tool) => tool !== "browseInternet");

    console.log("Active tools:", activeTools);

    // Credit check and usage
    const usageCheck = canUseConfiguration(credits, {
      modelId: selectedModelId as AIModel,
      isBrowseEnabled,
    });

    if (!usageCheck.canUse) {
      return new Response(
        JSON.stringify({
          error: "Insufficient credits",
          message: usageCheck.reason,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle response (works for both premium and free features)
    const result = await streamText({
      model: customModel(modelToUse),
      system: createSystemPrompt(isBrowseEnabled),
      messages: coreMessages,
      maxSteps: 5,
      experimental_activeTools: activeTools,
      tools: createTools(streamingData, user.id, modelToUse, isBrowseEnabled),
      onFinish: async ({ responseMessages }) => {
        if (user && user.id) {
          try {
            const responseMessagesWithoutIncompleteToolCalls =
              sanitizeResponseMessages(responseMessages);

            await saveMessages({
              chatId: id,
              messages: responseMessagesWithoutIncompleteToolCalls.map(
                (message) => {
                  const messageId = generateUUID();

                  if (message.role === "assistant") {
                    streamingData.appendMessageAnnotation({
                      messageIdFromServer: messageId,
                    });
                  }

                  return {
                    id: messageId,
                    chat_id: id,
                    role: message.role as MessageRole,
                    content: formatMessageContent(message),
                    created_at: new Date().toISOString(),
                  };
                }
              ),
            });
          } catch (error) {
            console.error("Failed to save chat:", error);
          }
        }

        streamingData.close();
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: "stream-text",
      },
    });

    // Add credit usage data to headers only if credits were used
    const headers: Record<string, string> = {};
    if (usageCheck.requiredCredits > 0) {
      await reduceUserCredits(user.email, usageCheck.requiredCredits);
      const updatedCredits = await getUserCreditsQuery(supabase, user.id);
      const creditUsageData = {
        cost: usageCheck.requiredCredits,
        remaining: updatedCredits,
        features: [
          !FREE_MODELS.includes(selectedModelId as any)
            ? "Premium Model"
            : null,
          isBrowseEnabled ? "Web Browsing" : null,
        ].filter(Boolean),
      };
      headers["x-credit-usage"] = JSON.stringify(creditUsageData);
    }

    return result.toDataStreamResponse({
      data: streamingData,
      headers,
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    if (error instanceof Error && error.message === "Chat ID already exists") {
      // If chat already exists, just continue with the message saving
      await saveMessages({
        chatId: id,
        messages: [
          {
            id: generateUUID(),
            chat_id: id,
            role: userMessage.role as MessageRole,
            content: formatMessageContent(userMessage),
            created_at: new Date().toISOString(),
          },
        ],
      });
    } else {
      throw error; // Re-throw other errors
    }
  }
}

/**
 * DELETE Handler
 * Removes an entire chat session and its messages
 *
 * Security:
 * - Verifies user ownership of chat
 * - Only allows deletion of user's own chats
 *
 * @param request Contains chat ID to delete
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const user = await getUser();

  try {
    const chat = await getChatById(id);

    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }

    if (chat.user_id !== user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById(id, user.id);

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
