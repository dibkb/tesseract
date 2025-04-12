"use client";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import { useTheme } from "next-themes";
import type { editor } from "monaco-types";
import { useCallback } from "react";
import { deleteLines, pasteAtLine } from "@/lib/editor-paste-delete";
import DiffEditorWrapper from "./DiffEditorExample";
import { cn } from "@/lib/utils";
const Javascript = () => {
  const {
    js,
    setJs,
    fontSize,
    jsEditorRef,
    jsSelection,
    setJsSelection,
    jsAiGenerated,
    setJsAiGenerated,
  } = useScriptsStore((state) => state);
  const { theme } = useTheme();

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    jsEditorRef.current = editor;
  }

  const acceptChanges = useCallback(() => {
    if (jsEditorRef.current) {
      deleteLines(jsSelection.startLine, jsSelection.endLine, jsEditorRef);
      pasteAtLine(jsSelection.startLine, jsAiGenerated, jsEditorRef);
      setJsSelection({
        startLine: 0,
        endLine: 0,
        text: "",
      });
      setJsAiGenerated("");
    }
  }, [
    jsEditorRef,
    jsSelection,
    jsAiGenerated,
    setJsAiGenerated,
    setJsSelection,
  ]);

  const rejectChanges = useCallback(() => {
    setJsSelection({
      startLine: 0,
      endLine: 0,
      text: "",
    });
    setJsAiGenerated("");
  }, [setJsSelection, setJsAiGenerated]);

  return (
    <div className="relative h-full">
      <CodeiumEditor
        onMount={handleEditorDidMount}
        height="100%"
        language="javascript"
        defaultValue="// Welcome to the javascript editor! 🚀"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        value={js}
        onChange={(value) => setJs(value || "")}
        options={{
          fontSize,
        }}
        className="tesseract--editor"
      />
      {
        <DiffEditorWrapper
          original={jsSelection}
          improved={jsAiGenerated}
          acceptChanges={acceptChanges}
          rejectChanges={rejectChanges}
          language={"javascript"}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[50%] bg-white dark:bg-[#1e1e1e] border-t z-[-100]",
            jsSelection.text && jsAiGenerated && "z-[100]"
          )}
        />
      }
    </div>
  );
};

export default Javascript;
