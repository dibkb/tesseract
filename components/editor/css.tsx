"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

const Css = () => {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="css"
      defaultValue="// Tesseract welcomes you to the css editor! 🚀"
      theme={theme === "dark" ? "vs-dark" : "vs"}
    />
  );
};

export default Css;
