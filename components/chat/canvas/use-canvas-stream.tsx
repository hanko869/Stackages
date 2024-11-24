import { JSONValue } from "ai";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSWRConfig } from "swr";

import { UIBlock } from "./canvas";

type StreamingDelta = {
  type: "text-delta" | "title" | "id" | "clear" | "finish";
  content: string;
};

export function useBlockStream({
  streamingData,
  setBlock,
}: {
  streamingData: JSONValue[] | undefined;
  setBlock: Dispatch<SetStateAction<UIBlock>>;
}) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const mostRecentDelta = streamingData?.at(-1);
    if (!mostRecentDelta) return;

    const delta = mostRecentDelta as StreamingDelta;

    setBlock((draftBlock) => {
      switch (delta.type) {
        case "id":
          return {
            ...draftBlock,
            documentId: delta.content as string,
          };

        case "title":
          return {
            ...draftBlock,
            title: delta.content as string,
          };

        case "text-delta":
          return {
            ...draftBlock,
            content: draftBlock.content + (delta.content as string),
            isVisible:
              draftBlock.status === "streaming" &&
              draftBlock.content.length > 200 &&
              draftBlock.content.length < 250
                ? true
                : draftBlock.isVisible,
            status: "streaming",
          };

        case "clear":
          return {
            ...draftBlock,
            content: "",
            status: "streaming",
          };

        case "finish":
          return {
            ...draftBlock,
            status: "idle",
          };

        default:
          return draftBlock;
      }
    });
  }, [streamingData, setBlock]);
}
