/**
 * Chat utilities for handling AI message transformations and sanitization
 * Includes functions for:
 * - Converting database messages to UI format
 * - Sanitizing messages
 * - Managing tool invocations
 * - Handling message annotations
 */

import {
  CoreAssistantMessage,
  CoreMessage,
  CoreToolMessage,
  Message,
  ToolInvocation,
  ToolContent,
  Attachment,
} from "ai";
import type { Database } from "@/lib/types/supabase";

type DBMessage = Database["public"]["Tables"]["messages"]["Row"];
type Document = Database["public"]["Tables"]["chat_documents"]["Row"];

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function parseToolContent(content: string): ToolContent {
  try {
    const parsed = JSON.parse(content);
    const toolResults = Array.isArray(parsed) ? parsed : [parsed];

    return toolResults.map((item: any) => ({
      type: "tool-result",
      toolCallId: item.toolCallId || generateUUID(),
      toolName: item.toolName,
      result: item.result,
    }));
  } catch (e) {
    console.error("Failed to parse tool content:", e);
    return [];
  }
}

function addToolMessageToChat({
  toolMessage,
  messages,
}: {
  toolMessage: DBMessage;
  messages: Array<Message>;
}): Array<Message> {
  return messages.map((message: Message): Message => {
    if (!message.toolInvocations) return message;

    const toolContent = parseToolContent(toolMessage.content?.toString() ?? "");

    const matchedToolCallIds = new Set<string>();

    const updatedToolInvocations = message.toolInvocations.map(
      (toolInvocation) => {
        if (toolInvocation.state !== "call") return toolInvocation;

        const toolResult = toolContent.find(
          (tool) => tool.toolCallId === toolInvocation.toolCallId
        );

        if (toolResult) {
          matchedToolCallIds.add(toolResult.toolCallId);
          return {
            ...toolInvocation,
            state: "result" as const,
            result: toolResult.result,
          };
        }

        return toolInvocation;
      }
    );

    return {
      ...message,
      toolInvocations: updatedToolInvocations,
    };
  });
}

export function convertToUIMessages(
  messages: Array<DBMessage>
): Array<Message> {
  return messages.reduce((chatMessages: Array<Message>, message) => {
    if (message.role === "tool") {
      return addToolMessageToChat({
        toolMessage: message,
        messages: chatMessages,
      });
    }

    let textContent = "";
    let toolInvocations: Array<ToolInvocation> = [];
    let attachments: Array<Attachment> = [];

    try {
      const content = message.content?.toString() ?? "";
      if (content.trim().startsWith("[") || content.trim().startsWith("{")) {
        const parsedContent = JSON.parse(content);

        if (Array.isArray(parsedContent)) {
          for (const item of parsedContent) {
            if (item.type === "text") {
              textContent += item.text;
            } else if (item.type === "image") {
              attachments.push({
                url: item.image,
                contentType: "image/jpeg", // or determine from URL
                name: item.image.split("/").pop() || "image",
              });
            } else if (item.type === "tool-call") {
              toolInvocations.push({
                state: "call",
                toolCallId: item.toolCallId,
                toolName: item.toolName,
                args: item.args,
              });
            }
          }
        } else {
          textContent = content;
        }
      } else {
        textContent = content;
      }
    } catch {
      textContent = message.content?.toString() ?? "";
    }

    chatMessages.push({
      id: message.id,
      role: message.role as Message["role"],
      content: textContent,
      toolInvocations: toolInvocations.length > 0 ? toolInvocations : undefined,
      experimental_attachments:
        attachments.length > 0 ? attachments : undefined,
    });

    return chatMessages;
  }, []);
}

export function sanitizeResponseMessages(
  messages: Array<CoreToolMessage | CoreAssistantMessage>
): Array<CoreToolMessage | CoreAssistantMessage> {
  let toolResultIds: Array<string> = [];

  for (const message of messages) {
    if (message.role === "tool") {
      for (const content of message.content) {
        if (content.type === "tool-result") {
          toolResultIds.push(content.toolCallId);
        }
      }
    }
  }

  const messagesBySanitizedContent = messages.map((message) => {
    if (message.role !== "assistant") return message;

    if (typeof message.content === "string") return message;

    const sanitizedContent = message.content.filter((content) =>
      content.type === "tool-call"
        ? toolResultIds.includes(content.toolCallId)
        : content.type === "text"
        ? content.text.length > 0
        : true
    );

    return {
      ...message,
      content: sanitizedContent,
    };
  });

  return messagesBySanitizedContent.filter(
    (message) => message.content.length > 0
  );
}

export function sanitizeUIMessages(messages: Array<Message>): Array<Message> {
  const messagesBySanitizedToolInvocations = messages.map((message) => {
    if (message.role !== "assistant") return message;

    if (!message.toolInvocations) return message;

    // Only keep tool invocations that have results or are in 'call' state
    const sanitizedToolInvocations = message.toolInvocations.filter(
      (toolInvocation) =>
        toolInvocation.state === "result" ||
        (toolInvocation.state === "call" &&
          toolInvocation.toolCallId &&
          toolInvocation.toolName)
    );

    // If there are no valid tool invocations, remove them entirely
    return {
      ...message,
      toolInvocations:
        sanitizedToolInvocations.length > 0
          ? sanitizedToolInvocations
          : undefined,
      // Ensure content is not empty
      content: message.content || "",
    };
  });

  // Filter out messages with no content and no valid tool invocations
  return messagesBySanitizedToolInvocations.filter(
    (message) =>
      message.content?.length > 0 ||
      (message.toolInvocations && message.toolInvocations.length > 0)
  );
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

export function getDocumentTimestampByIndex(
  documents: Array<Document>,
  index: number
) {
  if (!documents) return new Date();
  if (index > documents.length) return new Date();

  return documents[index].created_at;
}

// Add fetcher function for SWR
export async function fetcher<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

// Add type for message annotations
interface MessageAnnotation {
  messageIdFromServer?: string;
}

// Update getMessageIdFromAnnotations to use proper typing
export function getMessageIdFromAnnotations(message: Message) {
  if (!message.annotations) return message.id;

  const annotations = message.annotations as MessageAnnotation[];
  const [annotation] = annotations;

  if (!annotation?.messageIdFromServer) return message.id;

  return annotation.messageIdFromServer;
}
