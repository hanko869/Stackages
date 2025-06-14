import { SetStateAction } from "react";

import { UIBlock } from "./canvas/canvas";
import {
  SearchIcon,
  FileIcon,
  LoaderIcon,
  PencilIcon,
  ComputerIcon,
} from "lucide-react";

type DocumentToolType = "create" | "update";
type ToolType = DocumentToolType | "browseInternet" | "suggestApps";

const getActionText = (type: ToolType) => {
  switch (type) {
    case "create":
      return "Creating";
    case "update":
      return "Updating";
    case "browseInternet":
      return "Searching";
    case "suggestApps":
      return "Finding";
    default:
      return null;
  }
};

interface DocumentToolResultProps {
  type: ToolType;
  result: any;
  block: UIBlock;
  setBlock: (value: SetStateAction<UIBlock>) => void;
}

export function DocumentToolResult({
  type,
  result,
  block,
  setBlock,
}: DocumentToolResultProps) {
  return (
    <div
      className={`
        group
        bg-background/50
        hover:bg-muted/30
        cursor-pointer 
        border-[0.5px] border-border/40
        hover:border-border/60
        py-2.5 px-3.5
        rounded-lg
        w-fit 
        flex flex-row 
        gap-3
        items-center
        shadow-[0_1px_3px_0_rgb(0,0,0,0.02)]
        hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.02)]
        transition-all
        duration-300
        ease-out
        backdrop-blur-[2px]
        relative
        overflow-hidden
        hover:translate-y-[-1px]
        active:translate-y-[0px]
      `}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const boundingBox = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };

        setBlock({
          documentId: result.id,
          content: "",
          title: result.title,
          isVisible: true,
          status: "idle",
          boundingBox,
        });
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="text-muted-foreground/70 group-hover:text-primary/70 transition-colors duration-300 flex items-center">
        {type === "create" ? (
          <FileIcon className="h-[15px] w-[15px]" />
        ) : type === "update" ? (
          <PencilIcon className="h-[15px] w-[15px]" />
        ) : type === "browseInternet" ? (
          <SearchIcon className="h-[15px] w-[15px]" />
        ) : type === "suggestApps" ? (
          <ComputerIcon className="h-[15px] w-[15px]" />
        ) : null}
      </div>

      <div className="text-[13px] leading-[15px] text-muted-foreground/90 group-hover:text-foreground transition-colors duration-300">
        <span className="opacity-60 font-normal">{getActionText(type)}</span>{" "}
        <span className="opacity-90 font-medium">{result.title}</span>
      </div>
    </div>
  );
}

export function AppSuggestionToolCall({ args }: { args: any }) {
  return (
    <div className="w-fit bg-background/50 border-[0.5px] border-border/40 py-2.5 px-3.5 rounded-lg flex flex-row items-center justify-between gap-3 shadow-[0_1px_3px_0_rgb(0,0,0,0.02)] backdrop-blur-[2px]">
      <div className="flex flex-row gap-3 items-center">
        <div className="text-muted-foreground/70 flex items-center">
          <ComputerIcon className="h-[15px] w-[15px]" />
        </div>

        <div className="text-[13px] leading-[15px] text-muted-foreground/90">
          <span className="opacity-60 font-normal">Finding</span>{" "}
          <span className="opacity-90 font-medium">relevant apps</span>
        </div>
      </div>

      <div className="animate-spin flex items-center">
        <LoaderIcon className="h-[15px] w-[15px] text-muted-foreground/70" />
      </div>
    </div>
  );
}

interface DocumentToolCallProps {
  type: DocumentToolType;
  args: any;
}

export function DocumentToolCall({ type, args }: DocumentToolCallProps) {
  return (
    <div className="w-fit bg-background/50 border-[0.5px] border-border/40 py-2.5 px-3.5 rounded-lg flex flex-row items-center justify-between gap-3 shadow-[0_1px_3px_0_rgb(0,0,0,0.02)] backdrop-blur-[2px]">
      <div className="flex flex-row gap-3 items-center">
        <div className="text-muted-foreground/70 flex items-center">
          {type === "create" ? (
            <FileIcon className="h-[15px] w-[15px]" />
          ) : (
            <PencilIcon className="h-[15px] w-[15px]" />
          )}
        </div>

        <div className="text-[13px] leading-[15px] text-muted-foreground/90">
          <span className="opacity-60 font-normal">{getActionText(type)}</span>{" "}
          <span className="opacity-90 font-medium">{args.title}</span>
        </div>
      </div>

      <div className="animate-spin flex items-center">
        <LoaderIcon className="h-[15px] w-[15px] text-muted-foreground/70" />
      </div>
    </div>
  );
}
