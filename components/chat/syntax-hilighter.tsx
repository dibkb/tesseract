"use client";
import React from "react";
import { gruvboxDark, vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { useHydration } from "../hooks/useHydration";
const TesseractSyntaxHighlighter = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  const { theme } = useTheme();
  const isHydrated = useHydration();
  if (!isHydrated) return null;
  return (
    <SyntaxHighlighter
      language={language}
      style={theme === "dark" ? gruvboxDark : vs}
      className="rounded-md border-dashed border dark:border-neutral-700 border-neutral-300"
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default TesseractSyntaxHighlighter;
