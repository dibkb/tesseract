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

  const htmlObject = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Sleek Website</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <meta property="og:title" content="Modern Sleek Website">
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://example.com">
    <meta property="og:image" content="http://example.com/image.jpg">
    <meta property="og:description" content="A modern and sleek website design.">
</head>`;

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
      {htmlObject && (
        <TesseractSyntaxHighlighter language="html" code={htmlObject} />
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
