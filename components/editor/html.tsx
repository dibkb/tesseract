"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";

const Html = () => {
  const { theme } = useTheme();
  const { html, setHtml, fontSize } = useScriptsStore((state) => state);
  const onChange = (value: string | undefined) => {
    setHtml(value || "");
  };
  return (
    <CodeiumEditor
      height="100%"
      value={html}
      onChange={onChange}
      language="html"
      defaultValue="<!-- Welcome to the HTML editor! 🚀-->"
      theme={theme === "dark" ? "vs-dark" : "vs"}
      options={{
        fontSize,
      }}
    />
  );
};

export default Html;
