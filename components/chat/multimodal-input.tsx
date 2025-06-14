"use client";

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import cx from "classnames";
import { motion } from "framer-motion";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sanitizeUIMessages } from "@/lib/ai/chat";
import {
  AI_MODEL_DISPLAY,
  availableModels,
  AIModelDisplayInfo,
} from "@/lib/ai/models";
import { getCookie, setCookie } from "@/lib/utils/cookies";
import { ImageIcon } from "lucide-react";
import { PreviewAttachment } from "./preview-attachment";
import { Button } from "../ui/button";
import { ArrowUpIcon, StopIcon } from "./icons";
import { Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedActions = [
  {
    title: "Build a Youtube Script Generator",
    label: "How can I build a Youtube Script Generator with AnotherWrapper?",
    action:
      "I want to build a Youtube Script Generator. Which demo app can I use? It should generate text scripts, the audio for each scene + thumbnails for the video.",
    icon: "📹",
  },
  {
    title: "Write an essay",
    label: "Write an essay about Tupac Shakur",
    action: "I want to write an essay about the life of Tupac Shakur.",
    icon: "✨",
  },
];

interface MultimodalInputProps {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  containsImages: boolean;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions & {
      selectedModelId?: string;
      isBrowseEnabled?: boolean;
    }
  ) => void;
  className?: string;
  selectedModelId: string;
  onModelChange?: (modelId: string) => void;
  onBrowseToggle?: (enabled: boolean) => void;
  isBrowseEnabled: boolean;
  isAuthenticated: boolean;
}

// Add an interface for upload queue items
interface UploadQueueItem {
  id: string;
  name: string;
  file: File;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5MB in bytes

// Extend the Message type to include attachments
interface ExtendedMessage extends Message {
  attachments?: Attachment[];
  experimental_attachments?: Attachment[];
}

export function MultimodalInput({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  attachments,
  setAttachments,
  containsImages,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
  selectedModelId: initialSelectedModelId,
  onModelChange,
  onBrowseToggle,
  isBrowseEnabled,
  isAuthenticated,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();
  const router = useRouter();
  const { toast } = useToast();

  const [selectedModel, setSelectedModel] = useState<AIModelDisplayInfo>(
    () =>
      availableModels.find((model) => model.id === initialSelectedModelId) ||
      availableModels[0]
  );
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [previewAttachments, setPreviewAttachments] = useState<Attachment[]>(
    []
  );

  const submitForm = useCallback(() => {
    window.history.replaceState({}, "", `/apps/chat/${chatId}`);

    handleSubmit(undefined, {
      experimental_attachments: attachments,
      selectedModelId: selectedModel.id,
      isBrowseEnabled,
    });

    setAttachments([]);
    setLocalStorageInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [
    attachments,
    handleSubmit,
    setAttachments,
    setLocalStorageInput,
    width,
    chatId,
    selectedModel.id,
    isBrowseEnabled,
  ]);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const uploadFile = async (file: File, chatId: string) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("chatId", chatId);

    try {
      const response = await fetch(`/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          url: data.url,
          name: data.path,
          contentType: file.type,
        };
      } else {
        const { error, details } = await response.json();
        console.error("Upload error:", { error, details });
        toast({
          title: "Upload error",
          description: error,
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file, please try again!",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      // Process each file one by one
      for (const file of files) {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
          toast({
            title: `${file.name} exceeds 5MB limit`,
          });
          continue;
        }

        // Add single file to upload queue
        const queueItem = {
          id: crypto.randomUUID(),
          name: file.name,
          file,
        };
        setUploadQueue((prev) => [...prev, queueItem]);
        setIsUploading(true);

        try {
          const uploadedAttachment = await uploadFile(file, chatId);
          if (uploadedAttachment) {
            setAttachments((current) => [...current, uploadedAttachment]);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          toast({
            title: `Failed to upload ${file.name}`,
          });
        } finally {
          // Remove this file from the queue
          setUploadQueue((prev) =>
            prev.filter((item) => item.id !== queueItem.id)
          );
        }
      }
      setIsUploading(false);
    },
    [setAttachments, chatId]
  );

  useEffect(() => {
    // Load both cookies on mount
    const modelIdFromCookie = getCookie("model-id");
    const browseEnabledFromCookie = getCookie("browse-enabled");

    if (modelIdFromCookie) {
      const model = availableModels.find((m) => m.id === modelIdFromCookie);
      if (model) {
        setSelectedModel(model);
      }
    }

    if (browseEnabledFromCookie === "true" && onBrowseToggle) {
      onBrowseToggle(true);
    }
  }, [onBrowseToggle]);

  const handleModelSelect = (model: AIModelDisplayInfo) => {
    setSelectedModel(model);
    setCookie("model-id", model.id);
    setIsModelDropdownOpen(false);
    onModelChange?.(model.id);
  };

  const handleBrowseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const newValue = !isBrowseEnabled;
      onBrowseToggle?.(newValue);
      setCookie("browse-enabled", newValue.toString());
    },
    [isBrowseEnabled, onBrowseToggle]
  );

  const handleUnauthenticatedInteraction = () => {
    router.push("/auth"); // Redirect to auth page
  };

  const handleDeleteAttachment = (urlToDelete: string) => {
    setAttachments((current) =>
      current.filter((att) => att.url !== urlToDelete)
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full" onClick={handleUnauthenticatedInteraction}>
        <div className="cursor-pointer p-4 text-center border border-dashed rounded-lg">
          Sign in to send messages
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col gap-4 border-none">
      {input === "" &&
        attachments.length === 0 &&
        uploadQueue.length === 0 &&
        messages.length === 0 && (
          <div className="w-full px-1">
            <div className="text-sm text-muted-foreground/60 mb-4 font-medium">
              Get started with
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedActions.map((suggestedAction, index) => (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ delay: 0.1 * index }}
                  key={index}
                  onClick={async () => {
                    window.history.replaceState({}, "", `/chat/${chatId}`);
                    append({
                      role: "user",
                      content: suggestedAction.action,
                    });
                  }}
                  className="group flex items-center gap-3 p-3.5 
                    bg-background/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 rounded-lg
                    border border-border/30 hover:border-blue-500/30
                    transition-all duration-200
                    hover:shadow-[0_0_1px_rgba(59,130,246,0.2)]
                    dark:hover:shadow-[0_0_1px_rgba(59,130,246,0.4)]"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                    {suggestedAction.icon}
                  </span>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-medium text-foreground/90">
                      {suggestedAction.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground/70 line-clamp-1 group-hover:text-muted-foreground/90">
                      {suggestedAction.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

      {(attachments.length > 0 || uploadQueue.length > 0) && (
        <div className="flex flex-row gap-2 overflow-x-scroll items-end">
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-2">
              {attachments.map((attachment) => (
                <div key={attachment.url} className="relative group">
                  <PreviewAttachment
                    attachment={attachment}
                    isUploading={isUploading}
                    showFileName={false}
                    size="small"
                  />
                  <button
                    onClick={() => handleDeleteAttachment(attachment.url)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadQueue.map((queueItem) => (
            <PreviewAttachment
              key={queueItem.id}
              attachment={{
                url: "",
                name: queueItem.name,
                contentType: "",
              }}
              isUploading={true}
            />
          ))}
        </div>
      )}

      <textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className={cx(
          "min-h-[72px] w-full max-h-[calc(100dvh)]",
          "overflow-hidden resize-none px-4 pb-10 pt-4 rounded-2xl",
          "outline-none focus:outline-none focus:ring-0 border-0",
          className
        )}
        rows={3}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (isLoading) {
              toast({
                title: "Please wait for the model to finish its response!",
              });
            } else {
              submitForm();
            }
          }
        }}
      />

      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
          onClick={(event) => {
            event.preventDefault();
            stop();
            setMessages((messages) => sanitizeUIMessages(messages));
          }}
        >
          <StopIcon size={14} />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
          disabled={input.length === 0 || uploadQueue.length > 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}

      <div className="absolute bottom-2.5 left-2 flex gap-2 items-center">
        <button
          type="button"
          onClick={handleBrowseClick}
          className={cn(
            "p-2 rounded-full transition-colors",
            isBrowseEnabled
              ? "bg-blue-500/10 text-blue-500"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Globe className="h-4 w-4" />
        </button>
        <div className="relative">
          <button
            type="button"
            className="cursor-pointer text-xs inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-primary/80 h-7 rounded-md px-2 py-1"
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
          >
            <Image
              src={selectedModel.logo}
              alt={selectedModel.name}
              width={16}
              height={16}
              className="mr-1 rounded-sm"
            />
            {selectedModel.name}
            <svg
              className={`ml-1 h-4 w-4 transform transition-transform ${
                isModelDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isModelDropdownOpen && (
            <ul className="absolute bottom-full mb-2 z-10 w-40 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg">
              {availableModels.map((model) => {
                const isDisabled =
                  (attachments.length > 0 || containsImages) &&
                  !AI_MODEL_DISPLAY[model.id].vision;

                return (
                  <li
                    key={model.id}
                    className={cn(
                      "flex items-center px-3 py-2 text-xs",
                      isDisabled
                        ? "cursor-not-allowed opacity-50 bg-zinc-100 dark:bg-zinc-700"
                        : "cursor-pointer text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    )}
                    onClick={() => !isDisabled && handleModelSelect(model)}
                    title={
                      isDisabled
                        ? "This model doesn't support image analysis"
                        : undefined
                    }
                  >
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={16}
                      height={16}
                      className="mr-2 rounded-sm"
                    />
                    {model.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {AI_MODEL_DISPLAY[selectedModel.id].vision && (
          <label className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ImageIcon className="h-4 w-4 mr-1" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        )}
      </div>
    </div>
  );
}
