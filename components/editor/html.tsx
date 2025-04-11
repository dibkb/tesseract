"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import type { editor } from "monaco-types";
import DiffEditorWrapper from "./DiffEditorExample";

const Html = () => {
  const { theme } = useTheme();
  const {
    html,
    setHtml,
    fontSize,
    htmlSelection,
    htmlEditorRef,
    htmlAiGenerated,
  } = useScriptsStore((state) => state);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    htmlEditorRef.current = editor;
  }

  const onChange = (value: string | undefined) => {
    setHtml(value || "");
  };
  console.log("htmlAiGenerated", htmlAiGenerated);
  console.log("htmlSelection", htmlSelection.text);
  return (
    <div className="h-full flex flex-col">
      {/* Main editor */}
      <div className="relative h-full">
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
            glyphMargin: true,
          }}
          className="tesseract--editor h-full"
        />
      </div>
      {/* Diff editor */}
      {
        <DiffEditorWrapper
          original={htmlSelection.text}
          improved={htmlAiGenerated}
          language={"html"}
        />
      }
    </div>
  );
};

export default Html;
