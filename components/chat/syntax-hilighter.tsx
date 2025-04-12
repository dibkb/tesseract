"use client";
import React from "react";
import {
  gruvboxDark,
  xcode,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { useHydration } from "../hooks/useHydration";
import { Link } from "lucide-react";
import { toast } from "sonner";
import { matchIndent } from "@/utils/kill-indent";
import { useScriptsStore } from "@/stores/scripts-provider";
const TesseractSyntaxHighlighter = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  const { htmlSelection, cssSelection, jsSelection } = useScriptsStore(
    (state) => state
  );
  const { theme } = useTheme();
  const isHydrated = useHydration();
  if (!isHydrated) return null;

  function onClickHandler() {
    let textToCopy = "";
    switch (language) {
      case "html":
        textToCopy = matchIndent(htmlSelection.text, code);
        break;
      case "css":
        textToCopy = matchIndent(cssSelection.text, code);
        break;
      case "javascript":
        textToCopy = matchIndent(jsSelection.text, code);
        break;
      default:
        toast.error("No code to copy");
        return;
    }
    navigator.clipboard.writeText(textToCopy);
  }
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
        onClick={onClickHandler}
      >
        <Link className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
        Copy
      </button>
    </div>
  );
};

export default TesseractSyntaxHighlighter;
