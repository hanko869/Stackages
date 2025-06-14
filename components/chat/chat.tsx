"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { useSWRConfig } from "swr";
import { useWindowSize } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PreviewMessage, ThinkingMessage } from "@/components/chat/message";
import { useScrollToBottom } from "@/components/chat/use-scroll-to-bottom";
import { Block, UIBlock } from "./canvas/canvas";
import { BlockStreamHandler } from "./canvas/canvas-stream-handler";
import { MultimodalInput } from "./multimodal-input";
import { AppInfo } from "@/app/(apps)/chat/info";
import { setCookie } from "@/lib/utils/cookies";
import { useToast } from "@/components/ui/use-toast";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface ExtendedMessage extends Message {
  attachments?: Attachment[];
  experimental_attachments?: Attachment[];
}

function hasImagesInConversation(messages: ExtendedMessage[]): boolean {
  return messages.some(
    (message) =>
      message.attachments?.some((attachment) =>
        attachment.contentType?.startsWith("image/")
      ) ||
      message.experimental_attachments?.some((attachment) =>
        attachment.contentType?.startsWith("image/")
      )
  );
}

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  initialBrowseEnabled = false,
  isAuthenticated = false,
}: {
  id: string;
  initialMessages: Array<ExtendedMessage>;
  selectedModelId: string;
  initialBrowseEnabled?: boolean;
  isAuthenticated?: boolean;
}) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [currentModelId, setCurrentModelId] = useState(selectedModelId);
  const [isBrowseEnabled, setIsBrowseEnabled] = useState(initialBrowseEnabled);
  const { toast } = useToast();

  const handleBrowseToggle = useCallback((enabled: boolean) => {
    setIsBrowseEnabled(enabled);
    setCookie("browse-enabled", enabled.toString());
  }, []);

  const handleModelChange = useCallback((modelId: string) => {
    setCurrentModelId(modelId);
    setCookie("model-id", modelId);
  }, []);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    data: streamingData,
  } = useChat({
    id,
    api: "/api/chat",
    body: {
      id,
      selectedModelId: currentModelId,
      isBrowseEnabled,
    },
    initialMessages,
    onError: (error) => {
      if (error?.message?.includes("Insufficient credits")) {
        toast({
          variant: "destructive",
          title: "Out of Credits",
          description: (
            <div className="flex flex-col gap-2">
              <p className="font-medium">
                {error.message
                  .replace('{"error":"Insufficient credits","message":"', "")
                  .replace('"}', "")}
              </p>
              <p>
                You can still use GPT-4o mini and Claude 3.5 Haiku for free!
                However, premium models and features (like web browsing) require
                credits.
              </p>
              <p>
                To prevent abuse, we use a credit system for premium features.
              </p>
              <a
                href="https://anotherwrapper.lemonsqueezy.com/buy/d69ee93a-1070-4820-bec8-cce8b7d6de7d"
                className="text-primary hover:underline font-medium"
                target="_blank"
              >
                Get more credits →
              </a>
            </div>
          ),
          duration: 10000,
        });
      }
    },
    onResponse: (response) => {
      const creditUsageHeader = response.headers.get("x-credit-usage");

      if (creditUsageHeader) {
        try {
          const usage = JSON.parse(creditUsageHeader);

          if (usage.remaining < 10) {
            toast({
              description: (
                <div className="flex flex-col gap-4 p-1">
                  {/* Credit Usage Section */}
                  <div className="flex items-start gap-3">
                    <InfoCircledIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-[15px]">
                        -{usage.cost} credits used for this message
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {usage.remaining} credits remaining
                      </p>
                    </div>
                  </div>

                  {/* Explanation Section */}
                  <div className="ml-8 space-y-4">
                    <p className="text-[15px] text-blue-600 font-medium">
                      You're running low on credits
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
                        <p className="text-[14px] text-muted-foreground">
                          Premium models cost 1 credit per message
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
                        <p className="text-[14px] text-muted-foreground">
                          Web browsing costs 1 credit per message
                        </p>
                      </div>

                      <p className="text-[14px] text-green-600 leading-normal pl-1 font-medium">
                        Turn off browsing and switch to GPT-4o mini or Claude
                        Haiku to chat for free
                      </p>
                    </div>
                  </div>
                </div>
              ),
              duration: 5000,
            });
          }
        } catch (error) {
          console.error("[Frontend] Error parsing credit usage:", error);
        }
      }
    },
    onFinish: () => {
      mutate("/api/history");
    },
  });

  const { width: windowWidth = 1920, height: windowHeight = 1080 } =
    useWindowSize();

  const [block, setBlock] = useState<UIBlock>({
    documentId: "init",
    content: "",
    title: "",
    status: "idle",
    isVisible: false,
    boundingBox: {
      top: windowHeight / 4,
      left: windowWidth / 4,
      width: 250,
      height: 50,
    },
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  const containsImages = useMemo(
    () => hasImagesInConversation(messages),
    [messages]
  );

  console.log(messages);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
          <Button
            variant="ghost"
            className="order-2 hover:bg-primary/10 hover:text-primary md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
            onClick={() => {
              router.push("/chat");
              router.refresh();
            }}
          >
            <PlusIcon />
            <span className="md:sr-only">New Chat</span>
          </Button>
        </header>
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
        >
          {messages.length === 0 && <AppInfo />}

          {messages.map((message, index) => (
            <PreviewMessage
              key={message.id}
              message={message}
              block={block}
              setBlock={setBlock}
              isLoading={isLoading && messages.length - 1 === index}
            />
          ))}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <ThinkingMessage />
            )}

          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>
        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            messages={messages}
            attachments={attachments}
            setAttachments={setAttachments}
            containsImages={containsImages}
            setMessages={setMessages}
            append={append}
            selectedModelId={currentModelId}
            onModelChange={handleModelChange}
            isBrowseEnabled={isBrowseEnabled}
            onBrowseToggle={handleBrowseToggle}
            className="bg-base-100/70"
            isAuthenticated={isAuthenticated}
          />
        </form>
      </div>

      <AnimatePresence>
        {block && block.isVisible && (
          <Block
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            append={append}
            block={block}
            setBlock={setBlock}
            messages={messages}
            setMessages={setMessages}
            selectedModelId={currentModelId}
            isBrowseEnabled={isBrowseEnabled}
            onBrowseToggle={handleBrowseToggle}
            onModelChange={handleModelChange}
          />
        )}
      </AnimatePresence>

      <BlockStreamHandler streamingData={streamingData} setBlock={setBlock} />
    </>
  );
}
