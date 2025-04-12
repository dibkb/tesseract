"use client";
import React from "react";
import {
  hybrid,
  gruvboxDark,
  xcode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { useHydration } from "../hooks/useHydration";
import { Link } from "lucide-react";
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
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={theme === "dark" ? gruvboxDark : xcode}
        className="rounded-md border-dashed border dark:border-neutral-700 border-neutral-300"
      >
        {code}
      </SyntaxHighlighter>
      <button
        className="text-xs flex items-center gap-1 py-1 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md absolute top-2 right-2 backdrop-blur-sm"
        onClick={() => {}}
      >
        <Link className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
        Copy
      </button>
    </div>
  );
};

export default TesseractSyntaxHighlighter;
