import { Attachment } from "ai";

import { LoaderIcon } from "./icons";
import { cn } from "@/lib/utils";

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
  showFileName = false,
  size = "small",
}: {
  attachment: Attachment;
  isUploading?: boolean;
  showFileName?: boolean;
  size?: "small" | "normal" | "large";
}) => {
  const { name, url, contentType } = attachment;

  const sizeClasses = {
    small: "w-[100px]",
    normal: "w-[200px]",
    large: "w-[300px]",
  };

  return (
    <div className={cn(sizeClasses[size], "shrink-0")}>
      <div className="relative rounded-lg overflow-hidden bg-muted aspect-square w-full">
        {contentType?.startsWith("image") || url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt={name ?? "An image attachment"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-muted-foreground">No preview</span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="animate-spin text-zinc-500">
              <LoaderIcon />
            </div>
          </div>
        )}
      </div>
      {showFileName && name && !name.includes("undefined") && (
        <div className="text-xs text-zinc-500 truncate mt-1">{name}</div>
      )}
    </div>
  );
};
