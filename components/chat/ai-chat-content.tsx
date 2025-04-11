"use client";
import React, { useEffect } from "react";
import { outPutSchema } from "@/lib/ai-chat";
import Markdown from "react-markdown";
import { z } from "zod";
import TesseractSyntaxHighlighter from "./syntax-hilighter";
import { useScriptsStore } from "@/stores/scripts-provider";
type OutputType = Partial<z.infer<typeof outPutSchema>>;

const AiChatContent = ({ object }: { object: OutputType | undefined }) => {
  const { setHtmlAiGenerated, setCssAiGenerated, setJsAiGenerated } =
    useScriptsStore((state) => state);

  useEffect(() => {
    if (object?.html) {
      setHtmlAiGenerated(object?.html);
    }
    if (object?.css) {
      setCssAiGenerated(object?.css);
    }
    if (object?.js) {
      setJsAiGenerated(object?.js);
    }
  }, [object, setHtmlAiGenerated, setCssAiGenerated, setJsAiGenerated]);

  return (
    <div
      className="space-y-4 p-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100"
      suppressHydrationWarning
    >
      {object?.explanation && <Markdown>{object?.explanation}</Markdown>}
      {object?.html && (
        <TesseractSyntaxHighlighter language="html" code={object?.html} />
      )}
      {object?.css && (
        <TesseractSyntaxHighlighter language="css" code={object?.css} />
      )}
      {object?.js && (
        <TesseractSyntaxHighlighter language="javascript" code={object?.js} />
      )}
    </div>
  );
};

export default AiChatContent;
