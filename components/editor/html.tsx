"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import type { editor } from "monaco-types";
import DiffEditorWrapper from "./DiffEditorExample";
import { cn } from "@/lib/utils";
import { deleteLines, pasteAtLine } from "@/lib/editor-paste-delete";
import { useCallback } from "react";
import { indexHtml } from "@/constants/code";
const Html = () => {
  const { theme } = useTheme();
  const {
    html,
    setHtml,
    fontSize,
    htmlSelection,
    htmlEditorRef,
    htmlAiGenerated,
    setHtmlSelection,
    setHtmlAiGenerated,
  } = useScriptsStore((state) => state);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    htmlEditorRef.current = editor;
  }

  const onChange = (value: string | undefined) => {
    setHtml(value || "");
  };

  const acceptChanges = useCallback(() => {
    if (htmlEditorRef.current) {
      deleteLines(
        htmlSelection.startLine,
        htmlSelection.endLine,
        htmlEditorRef
      );
      pasteAtLine(htmlSelection.startLine, htmlAiGenerated, htmlEditorRef);
      setHtmlSelection({
        startLine: 0,
        endLine: 0,
        text: "",
      });
      setHtmlAiGenerated("");
    }
  }, [
    htmlEditorRef,
    htmlSelection,
    htmlAiGenerated,
    setHtmlAiGenerated,
    setHtmlSelection,
  ]);

  const rejectChanges = useCallback(() => {
    setHtmlSelection({
      startLine: 0,
      endLine: 0,
      text: "",
    });
    setHtmlAiGenerated("");
  }, [setHtmlSelection, setHtmlAiGenerated]);

  return (
    <div className="relative h-full">
      <CodeiumEditor
        onMount={handleEditorDidMount}
        height="100%"
        value={html}
        onChange={onChange}
        language="html"
        defaultValue={indexHtml}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        options={{
          fontSize,
          glyphMargin: true,
        }}
        className="tesseract--editor h-full"
      />
      {
        <DiffEditorWrapper
          original={htmlSelection}
          improved={htmlAiGenerated}
          acceptChanges={acceptChanges}
          rejectChanges={rejectChanges}
          language={"html"}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[50%] bg-white dark:bg-[#1e1e1e] border-t z-[-100]",
            htmlSelection.text && htmlAiGenerated && "z-[100]"
          )}
        />
      }
    </div>
  );
};

export default Html;
