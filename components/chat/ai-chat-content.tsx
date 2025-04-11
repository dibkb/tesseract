"use client";
import React from "react";
import { outPutSchema } from "@/lib/ai-chat";
import Markdown from "react-markdown";
import { z } from "zod";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
type OutputType = Partial<z.infer<typeof outPutSchema>>;

const AiChatContent = ({ object }: { object: OutputType | undefined }) => {
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
  return (
    <div
      className="space-y-4 p-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100"
      suppressHydrationWarning
    >
      {object?.explanation && <Markdown>{object?.explanation}</Markdown>}
      {object?.html && (
        <SyntaxHighlighter
          language="html"
          style={gruvboxDark}
          className="rounded-md"
        >
          {object?.html}
        </SyntaxHighlighter>
      )}
      {htmlObject && (
        <SyntaxHighlighter
          language="html"
          style={gruvboxDark}
          className="rounded-md"
        >
          {htmlObject}
        </SyntaxHighlighter>
      )}
      {object?.css && (
        <SyntaxHighlighter
          language="css"
          style={gruvboxDark}
          className="rounded-md"
        >
          {object?.css}
        </SyntaxHighlighter>
      )}
      {object?.js && (
        <SyntaxHighlighter
          language="javascript"
          style={gruvboxDark}
          className="rounded-md"
        >
          {object?.js}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default AiChatContent;
