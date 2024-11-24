"use client";

import { isAfter } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { useWindowSize } from "usehooks-ts";

import { Document } from "@/lib/types/supabase";
import { getDocumentTimestampByIndex } from "@/lib/ai/chat";

import { UIBlock } from "./canvas";
import { LoaderIcon } from "../icons";
import { Button } from "../../ui/button";
import { RotateCcw, ArrowLeft } from "lucide-react";

interface VersionFooterProps {
  block: UIBlock;
  currentVersionIndex: number;
  documents: Document[];
  handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void;
}

export const VersionFooter = ({
  block,
  handleVersionChange,
  documents,
  currentVersionIndex,
}: VersionFooterProps) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { mutate } = useSWRConfig();
  const [isMutating, setIsMutating] = useState(false);

  if (!documents) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t shadow-lg"
      initial={{ y: isMobile ? 200 : 77 }}
      animate={{ y: 0 }}
      exit={{ y: isMobile ? 200 : 77 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center lg:text-left">
          <h3 className="font-medium text-sm text-foreground/90">
            Viewing Previous Version
          </h3>
          <p className="text-xs text-muted-foreground">
            Restore this version to continue editing
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="min-w-[140px] font-medium"
            disabled={isMutating}
            onClick={async () => {
              setIsMutating(true);
              mutate(
                `/api/document?id=${block.documentId}`,
                await fetch(`/api/document?id=${block.documentId}`, {
                  method: "PATCH",
                  body: JSON.stringify({
                    timestamp: getDocumentTimestampByIndex(
                      documents,
                      currentVersionIndex
                    ),
                  }),
                }),
                {
                  optimisticData: documents
                    ? [
                        ...documents.filter((document) =>
                          isAfter(
                            new Date(document.created_at),
                            new Date(
                              getDocumentTimestampByIndex(
                                documents,
                                currentVersionIndex
                              )
                            )
                          )
                        ),
                      ]
                    : [],
                }
              );
            }}
          >
            <span className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Restore version
              {isMutating && (
                <span className="animate-spin">
                  <LoaderIcon size={12} />
                </span>
              )}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="min-w-[140px] font-medium"
            onClick={() => handleVersionChange("latest")}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to latest
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
