"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import { useHtmlSelection } from "../hooks/useEditorRef";
const Html = () => {
  const handleEditorDidMount = useHtmlSelection();
  const { theme } = useTheme();
  const { html, setHtml, fontSize } = useScriptsStore((state) => state);
  const onChange = (value: string | undefined) => {
    setHtml(value || "");
  };

  return (
    <CodeiumEditor
      onMount={handleEditorDidMount}
      height="100%"
      value={html}
      onChange={onChange}
      language="html"
      defaultValue="<!-- Welcome to the HTML editor! 🚀-->"
      theme={theme === "dark" ? "vs-dark" : "vs"}
      options={{
        fontSize,
      }}
      className="tesseract--editor"
    />
  );
};

export default Html;
