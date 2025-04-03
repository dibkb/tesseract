"use client";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";

const Css = () => {
  const { theme } = useTheme();
  const { css, setCss } = useScriptsStore((state) => state);
  return (
    <Editor
      height="100%"
      defaultLanguage="css"
      defaultValue="/* Welcome to the CSS editor! 🚀*/"
      theme={theme === "dark" ? "vs-dark" : "vs"}
      value={css}
      onChange={(value) => setCss(value || "")}
    />
  );
};

export default Css;
