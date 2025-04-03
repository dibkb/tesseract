"use client";
import { useScriptsStore } from "@/stores/scripts-provider";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

const Javascript = () => {
  const { js, setJs } = useScriptsStore((state) => state);
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// Welcome to the javascript editor! 🚀"
      theme={theme === "dark" ? "vs-dark" : "vs"}
      value={js}
      onChange={(value) => setJs(value || "")}
    />
  );
};

export default Javascript;
