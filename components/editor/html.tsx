"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";

const Html = () => {
  const { theme } = useTheme();
  const { html, setHtml } = useScriptsStore((state) => state);
  const onChange = (value: string | undefined) => {
    setHtml(value || "");
  };
  return (
    <Editor
      height="100%"
      value={html}
      onChange={onChange}
      defaultLanguage="html"
      defaultValue="<!-- Welcome to the HTML editor! 🚀-->"
      theme={theme === "dark" ? "vs-dark" : "vs"}
    />
  );
};

export default Html;
