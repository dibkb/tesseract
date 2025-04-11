"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import type { editor } from "monaco-types";
import DiffEditorWrapper from "./DiffEditorExample";
import { cn } from "@/lib/utils";

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
  return (
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
      {
        <DiffEditorWrapper
          original={htmlSelection.text}
          improved={htmlAiGenerated}
          language={"html"}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[40%] bg-white dark:bg-[#1e1e1e] border-t z-[-100]",
            htmlSelection.text && htmlAiGenerated && "z-[100]"
          )}
        />
      }
    </div>
  );
};

export default Html;
