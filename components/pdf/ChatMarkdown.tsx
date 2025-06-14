// components/markdown.tsx
import { FC, memo } from "react";
import ReactMarkdown, { Components } from "react-markdown";

interface MemoizedReactMarkdownProps {
  children: string;
  className?: string;
  remarkPlugins?: any[];
  components?: Components;
}

const MemoizedReactMarkdown: FC<MemoizedReactMarkdownProps> = memo(
  function MemoizedReactMarkdown({ children, ...props }) {
    return <ReactMarkdown {...props}>{children}</ReactMarkdown>;
  }
);

export { MemoizedReactMarkdown };
