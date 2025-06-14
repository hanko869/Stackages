/**
 * Canvas - Document Editor
 *
 * This is a smart document editor that lets users:
 * - Edit documents while chatting with AI
 * - Save different versions of their document
 * - Compare old and new versions
 * - Works on both desktop and mobile devices
 * - Get AI help while writing
 *
 * Main Parts:
 * - A chat window on the left
 * - A document editor on the right
 * - Buttons to switch between document versions
 * - Tools to help with writing
 *
 * Think of it like Google Docs, but with an AI assistant
 * that helps you write and edit!
 */

// Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useMemo,
  memo,
  useRef,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  useCopyToClipboard,
  useDebounceCallback,
  useWindowSize,
} from "usehooks-ts";
import { fetcher } from "@/lib/ai/chat";
import { cn } from "@/lib/utils";
import { DiffView } from "./diffview";
import { DocumentSkeleton } from "./document-skeleton";
import { Editor } from "./editor";
import { X } from "lucide-react";
import { PreviewMessage } from "../message";
import { MultimodalInput } from "../multimodal-input";
import { Toolbar } from "./toolbar";
import { useScrollToBottom } from "../use-scroll-to-bottom";
import { VersionFooter } from "./version-footer";
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Copy } from "lucide-react";
import type { Document } from "@/lib/types/supabase";
import { getCookie, setCookie } from "@/lib/utils/cookies";
import cx from "classnames";

export interface UIBlock {
  title: string; // The name of the document
  documentId: string; // A unique ID for the document
  content: string; // The actual text in the document
  isVisible: boolean; // Whether we can see it or not
  status: "streaming" | "idle"; // If AI is currently writing (streaming) or not (idle)
  boundingBox: {
    // Where the document appears on screen
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

// Shows three dots when AI is writing
const StreamingIndicator = memo(function StreamingIndicator() {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent h-32 pointer-events-none">
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
        <div className="size-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]" />
        <div className="size-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]" />
        <div className="size-2 rounded-full bg-foreground/50 animate-bounce" />
      </div>
    </div>
  );
});

// The main editor where you type and edit text
const EditorWrapper = memo(
  function EditorWrapper({
    content,
    isCurrentVersion,
    currentVersionIndex,
    status,
    saveContent,
  }: {
    content: string;
    isCurrentVersion: boolean;
    currentVersionIndex: number;
    status: "streaming" | "idle";
    saveContent: (content: string, debounce: boolean) => void;
  }) {
    // Keeps track of what's being typed
    const contentRef = useRef(content);
    useEffect(() => {
      contentRef.current = content;
    }, [content]);

    return (
      <div className="relative w-full">
        <Editor
          content={content}
          isCurrentVersion={isCurrentVersion}
          currentVersionIndex={currentVersionIndex}
          status={status}
          saveContent={saveContent}
        />
        {status === "streaming" && <StreamingIndicator />}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.content === nextProps.content &&
      prevProps.status === nextProps.status &&
      prevProps.isCurrentVersion === nextProps.isCurrentVersion &&
      prevProps.currentVersionIndex === nextProps.currentVersionIndex
    );
  }
);

// Helps us remember what's in the document without loading it again
const useDocumentContent = (
  documents: Document[] | undefined,
  index: number
) => {
  return useMemo(() => {
    if (!documents) return "";
    if (!documents[index]) return "";
    return documents[index].content ?? "";
  }, [documents, index]);
};

// All the features our editor needs to work
interface BlockProps {
  chatId: string; // ID for the chat session
  input: string; // What user is typing
  setInput: (input: string) => void; // Updates what user typed
  handleSubmit: (
    event?: { preventDefault?: () => void },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  block: UIBlock;
  setBlock: Dispatch<SetStateAction<UIBlock>>;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  selectedModelId?: string;
  isBrowseEnabled?: boolean;
  onBrowseToggle?: (enabled: boolean) => void;
  onModelChange?: (modelId: string) => void;
}

// The main editor component that puts everything together
export function Block({
  chatId,
  input,
  setInput,
  handleSubmit,
  isLoading,
  stop,
  attachments,
  setAttachments,
  append,
  block,
  setBlock,
  messages,
  setMessages,
  selectedModelId = "gpt-4o-mini",
  isBrowseEnabled = false,
  onBrowseToggle,
  onModelChange,
}: BlockProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const {
    data: documents,
    isLoading: isDocumentsFetching,
    mutate: mutateDocuments,
  } = useSWR<Array<Document>>(
    block?.documentId && block.status !== "streaming"
      ? `/api/document?id=${block.documentId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      keepPreviousData: true,
    }
  );

  // Keeps track of which version we're looking at
  const [mode, setMode] = useState<"edit" | "diff">("edit");
  const [document, setDocument] = useState<Document | null>(null);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);

  useEffect(() => {
    if (documents && documents.length > 0) {
      const mostRecentDocument = documents.at(-1);
      console.log("mostRecentDocument", mostRecentDocument);

      if (mostRecentDocument) {
        setDocument(mostRecentDocument);
        setCurrentVersionIndex(documents.length - 1);
        setBlock((currentBlock) => ({
          ...currentBlock,
          content: mostRecentDocument.content ?? "",
        }));
      }
    }
  }, [documents, setBlock]);

  useEffect(() => {
    if (block.status === "streaming") {
      // Prevent document fetching during streaming
      return;
    }
    mutateDocuments();
  }, [block.status, mutateDocuments]);

  const { mutate } = useSWRConfig();
  const [isContentDirty, setIsContentDirty] = useState(false);

  // Saves changes when you type
  const handleContentChange = useCallback(
    (updatedContent: string) => {
      if (!block) return;

      mutate<Array<Document>>(
        `/api/document?id=${block.documentId}`,
        async (currentDocuments) => {
          if (!currentDocuments) return undefined;

          const currentDocument = currentDocuments.at(-1);

          if (!currentDocument || !currentDocument.content) {
            setIsContentDirty(false);
            return currentDocuments;
          }

          if (currentDocument.content !== updatedContent) {
            await fetch(`/api/document?id=${block.documentId}`, {
              method: "POST",
              body: JSON.stringify({
                title: block.title,
                content: updatedContent,
              }),
            });

            setIsContentDirty(false);

            const newDocument = {
              ...currentDocument,
              content: updatedContent,
              createdAt: new Date(),
            };

            return [...currentDocuments, newDocument];
          } else {
            return currentDocuments;
          }
        },
        { revalidate: false }
      );
    },
    [block, mutate]
  );

  const debouncedHandleContentChange = useDebounceCallback(
    handleContentChange,
    3000
  );

  const saveContent = useCallback(
    (updatedContent: string, debounce: boolean) => {
      if (document && updatedContent !== document.content) {
        setIsContentDirty(true);

        if (debounce) {
          debouncedHandleContentChange(updatedContent);
        } else {
          handleContentChange(updatedContent);
        }
      }
    },
    [document, debouncedHandleContentChange, handleContentChange]
  );

  function getDocumentContentById(index: number) {
    if (!documents) return "";
    if (!documents[index]) return "";
    return documents[index].content ?? "";
  }

  const [restoredContent, setRestoredContent] = useState<string | null>(null);

  // Handles switching between different versions
  const handleVersionChange = (type: "next" | "prev" | "toggle" | "latest") => {
    if (!documents) return;

    if (type === "latest") {
      setCurrentVersionIndex(documents.length - 1);
      setMode("edit");
    }

    if (type === "toggle") {
      setMode((mode) => (mode === "edit" ? "diff" : "edit"));
    }

    if (type === "prev") {
      if (currentVersionIndex > 0) {
        setCurrentVersionIndex((index) => index - 1);
      }
    } else if (type === "next") {
      if (currentVersionIndex < documents.length - 1) {
        setCurrentVersionIndex((index) => index + 1);
      }
    }
  };

  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  /*
   * NOTE: if there are no documents, or if
   * the documents are being fetched, then
   * we mark it as the current version.
   */

  const isCurrentVersion =
    documents && documents.length > 0
      ? currentVersionIndex === documents.length - 1
      : true;

  // Checks if we're on a phone or computer
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;

  const [_, copyToClipboard] = useCopyToClipboard();

  // Memoize current document content
  const currentContent = useDocumentContent(documents, currentVersionIndex);

  // Shows the right content based on what version we're viewing
  const displayContent = useMemo(() => {
    if (block.status === "streaming") {
      return block.content; // Show what AI is currently writing
    }
    if (restoredContent && !isCurrentVersion) {
      return restoredContent; // Show an old version
    }
    return isCurrentVersion ? block.content : currentContent; // Show current version
  }, [
    block.status,
    block.content,
    isCurrentVersion,
    currentContent,
    restoredContent,
  ]);

  // Add this effect to handle browse state changes
  useEffect(() => {
    const browseEnabledFromCookie = getCookie("browse-enabled");
    if (browseEnabledFromCookie === "true" && onBrowseToggle) {
      onBrowseToggle(true);
    }
  }, [onBrowseToggle]);

  const { toast } = useToast();

  return (
    <motion.div
      className="flex flex-row h-dvh w-dvw fixed top-0 left-0 z-50 bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.4 } }}
    >
      {!isMobile && (
        <motion.div
          className="relative w-[400px] bg-muted/50 dark:bg-background/50 h-dvh shrink-0 border-r border-border/50"
          initial={{ opacity: 0, x: 10, scale: 1 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 30,
            },
          }}
          exit={{
            opacity: 0,
            x: 0,
            scale: 0.95,
            transition: { delay: 0 },
          }}
        >
          <AnimatePresence>
            {!isCurrentVersion && (
              <motion.div
                className="left-0 absolute h-dvh w-[400px] top-0 bg-zinc-900/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <div className="bg-base-100 flex flex-col h-full justify-between items-center gap-4">
            <div
              ref={messagesContainerRef}
              className="flex flex-col gap-4 h-full items-center overflow-y-scroll px-4 pt-20"
            >
              {messages.map((message, index) => (
                <PreviewMessage
                  key={message.id}
                  message={message}
                  block={block}
                  setBlock={setBlock}
                  isLoading={isLoading && index === messages.length - 1}
                  className={cx({
                    "bg-white": message.role === "user",
                  })}
                />
              ))}

              <div
                ref={messagesEndRef}
                className="shrink-0 min-w-[24px] min-h-[24px]"
              />
            </div>

            <form className="flex flex-row gap-2 relative items-end w-full px-4 pb-4">
              <MultimodalInput
                chatId={chatId}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={stop}
                containsImages={true}
                attachments={attachments}
                setAttachments={setAttachments}
                messages={messages}
                append={append}
                className="bg-white"
                setMessages={setMessages}
                selectedModelId={selectedModelId}
                isBrowseEnabled={isBrowseEnabled}
                onBrowseToggle={onBrowseToggle}
                onModelChange={onModelChange}
                isAuthenticated={true}
              />
            </form>
          </div>
        </motion.div>
      )}

      <motion.div
        className="fixed bg-background h-dvh flex flex-col shadow-sm overflow-y-scroll"
        initial={
          isMobile
            ? {
                opacity: 0,
                x: 0,
                y: 0,
                width: windowWidth,
                height: windowHeight,
                borderRadius: 50,
              }
            : {
                opacity: 0,
                x: block.boundingBox.left,
                y: block.boundingBox.top,
                height: block.boundingBox.height,
                width: block.boundingBox.width,
                borderRadius: 50,
              }
        }
        animate={
          isMobile
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                width: windowWidth,
                height: "100dvh",
                borderRadius: 0,
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }
            : {
                opacity: 1,
                x: 400,
                y: 0,
                height: windowHeight,
                width: windowWidth ? windowWidth - 400 : "calc(100dvw-400px)",
                borderRadius: 0,
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }
        }
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: {
            delay: 0.1,
            type: "spring",
            stiffness: 600,
            damping: 30,
          },
        }}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => {
                setBlock((currentBlock) => ({
                  ...currentBlock,
                  isVisible: false,
                }));
              }}
            >
              <X className="h-4 w-4" />
            </Button>

            <span className="text-base font-medium">
              {document?.title ?? block.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => handleVersionChange("prev")}
              disabled={
                currentVersionIndex === 0 || block.status === "streaming"
              }
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => handleVersionChange("next")}
              disabled={isCurrentVersion || block.status === "streaming"}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 hover:bg-muted", {
                "bg-blue-500/10 text-blue-500": mode === "diff",
              })}
              onClick={() => handleVersionChange("toggle")}
              disabled={
                block.status === "streaming" || currentVersionIndex === 0
              }
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => {
                copyToClipboard(block.content);
                toast({
                  title: "Success",
                  description: "Copied to clipboard!",
                });
              }}
              disabled={block.status === "streaming"}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="prose dark:prose-invert bg-background h-full overflow-y-scroll px-4 py-6 md:p-16 !max-w-full pb-32">
          <div className="max-w-[650px] mx-auto">
            {isDocumentsFetching && !block.content ? (
              <DocumentSkeleton />
            ) : mode === "edit" ? (
              <EditorWrapper
                content={displayContent}
                isCurrentVersion={isCurrentVersion}
                currentVersionIndex={currentVersionIndex}
                status={block.status}
                saveContent={saveContent}
              />
            ) : (
              <DiffView
                oldContent={getDocumentContentById(currentVersionIndex - 1)}
                newContent={getDocumentContentById(currentVersionIndex)}
              />
            )}

            <AnimatePresence>
              {isCurrentVersion && (
                <Toolbar
                  isToolbarVisible={isToolbarVisible}
                  setIsToolbarVisible={setIsToolbarVisible}
                  append={append}
                  isLoading={isLoading}
                  stop={stop}
                  setMessages={setMessages}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {!isCurrentVersion && (
            <VersionFooter
              block={block}
              currentVersionIndex={currentVersionIndex}
              documents={documents as Document[]}
              handleVersionChange={handleVersionChange}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
