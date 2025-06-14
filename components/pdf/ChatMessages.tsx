import { Message as VercelChatMessage } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { CodeBlock } from "@/components/ui/codeblock";
import { MemoizedReactMarkdown } from "@/components/pdf/ChatMarkdown";
import { IconOpenAI } from "@/components/ui/icons";
import { ChatMessageActions } from "@/components/pdf/ChatMessageActions";

export interface ChatMessageProps {
  message: VercelChatMessage;
  sources: any[];
}

type CodeComponentProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const CodeComponent = ({
  inline,
  className,
  children,
  ...props
}: CodeComponentProps) => {
  const childText =
    Array.isArray(children) && children[0] ? String(children[0]) : "";
  if (childText === "▍") {
    return <span className="mt-1 animate-pulse cursor-default">▍</span>;
  }

  const match = /language-(\w+)/.exec(className || "");

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <CodeBlock
      key={Math.random()}
      language={(match && match[1]) || ""}
      value={String(children).replace(/\n$/, "")}
      {...props}
    />
  );
};

export function ChatMessages({ message, sources }: ChatMessageProps) {
  const colorClassName =
    message.role === "user"
      ? "bg-gray-100 rounded-xl border border-1 mb-2 mr-2"
      : "mb-2";
  const alignmentClassName =
    message.role === "user" ? "flex-row-reverse" : "flex-row";

  const extractSourcePageNumber = (source: {
    metadata: Record<string, any>;
  }) => {
    return source.metadata["page"];
  };

  return (
    <li className={`flex items-center ${alignmentClassName} group`}>
      <div className={`p-3 px-4 ${colorClassName} flex flex-col relative`}>
        <div className="flex items-center ml-2">
          {message.role !== "user" && (
            <div className="rounded-full border border-gray-100 p-2 mr-2 w-8">
              <IconOpenAI className="w-4" />
            </div>
          )}
          <div className="flex text-base-content items-center">
            <MemoizedReactMarkdown
              className="prose"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{ code: CodeComponent }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          </div>
        </div>
        {sources && sources.length > 0 && (
          <div className="flex flex-col items-center ml-2">
            <p className="font-bold mt-4 mr-auto px-2 py-1 rounded">
              <h2>More info:</h2>
            </p>
            <div className="mt-1 mr-2 px-2 py-1 rounded text-xs">
              {sources
                .filter((source, index, self) => {
                  const pageNumber = extractSourcePageNumber(source);
                  return (
                    self.findIndex(
                      (s) => extractSourcePageNumber(s) === pageNumber
                    ) === index
                  );
                })
                .map((source, i) => (
                  <button
                    key={"source:" + i}
                    className="border ml-1 bg-gray-200 px-3 py-1 hover:bg-gray-100 transition rounded-lg"
                  >
                    p. {extractSourcePageNumber(source)}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
      <ChatMessageActions message={message} />
    </li>
  );
}
