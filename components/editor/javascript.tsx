"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

const Javascript = () => {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// Tesseract welcomes you to the javascript editor! 🚀"
      theme={theme === "dark" ? "vs-dark" : "vs"}
    />
  );
};

export default Javascript;
