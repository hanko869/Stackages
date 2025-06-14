"use client";

import { useEffect, useRef, useState, ReactElement, FormEvent } from "react";
import { useChat } from "ai/react";
import { ChatMessages } from "@/components/pdf/ChatMessages";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ChatInputField } from "@/components/pdf/ChatInputField";

type MessageRole =
  | "function"
  | "data"
  | "system"
  | "user"
  | "assistant"
  | "tool";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  chatId: string;
  initialMessages: Message[];
  documentId?: string; // Make documentId optional
}) {
  const {
    endpoint,
    emptyStateComponent,
    placeholder,
    chatId,
    initialMessages,
    documentId,
  } = props;

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  const { toast } = useToast();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: endpoint,
    initialMessages,
    body: {
      chatId,
      documentId, // Include documentId if provided
    },
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    onError: (e) => {
      toast({
        title: "Error",
        description: e.message,
      });
    },
  });

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      return;
    }
    handleSubmit(e);
  }

  // Commented out the scroll into window part because it was giving some issues
  // useEffect(() => {
  //   if (messageContainerRef.current && messageContainerRef.current.firstChild) {
  //     (messageContainerRef.current.firstChild as HTMLElement).scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // }, [messages]);

  return (
    <main className="flex flex-col w-full h-full no-scrollbar">
      <section className="flex flex-col w-full h-full no-scrollbar">
        {messages.length === 0 ? emptyStateComponent : ""}
        <div
          className="flex flex-col-reverse w-full mb-4 overflow-auto h-full no-scrollbar"
          ref={messageContainerRef}
        >
          {messages.length > 0
            ? [...messages]
                .reverse()
                .map((m, i) => (
                  <ChatMessages
                    key={m.id}
                    message={m}
                    sources={
                      sourcesForMessages[(messages.length - 1 - i).toString()]
                    }
                  />
                ))
            : ""}
        </div>
        <div className="flex flex-col justify-center items-center">
          <ChatInputField
            input={input}
            placeholder={placeholder}
            handleInputChange={handleInputChange}
            handleSubmit={sendMessage}
            isLoading={chatEndpointIsLoading}
          />
        </div>
      </section>
      <Toaster />
    </main>
  );
}
