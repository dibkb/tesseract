"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

const Html = () => {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="html"
      defaultValue="// Tesseract welcomes you to the html editor! 🚀"
      theme={theme === "dark" ? "vs-dark" : "vs"}
    />
  );
};

export default Html;
