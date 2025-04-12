"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import type { editor } from "monaco-types";
import DiffEditorWrapper from "./DiffEditorExample";
import { cn } from "@/lib/utils";
import { deleteLines, pasteAtLine } from "@/lib/editor-paste-delete";
import { useCallback } from "react";

const Css = () => {
  const { theme } = useTheme();
  const {
    css,
    setCss,
    fontSize,
    cssEditorRef,
    cssSelection,
    setCssSelection,
    cssAiGenerated,
    setCssAiGenerated,
  } = useScriptsStore((state) => state);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    cssEditorRef.current = editor;
  }

  const acceptChanges = useCallback(() => {
    if (cssEditorRef.current) {
      deleteLines(cssSelection.startLine, cssSelection.endLine, cssEditorRef);
      pasteAtLine(cssSelection.startLine, cssAiGenerated, cssEditorRef);
      setCssSelection({
        startLine: 0,
        endLine: 0,
        text: "",
      });
      setCssAiGenerated("");
    }
  }, [
    cssEditorRef,
    cssSelection,
    cssAiGenerated,
    setCssAiGenerated,
    setCssSelection,
  ]);

  const rejectChanges = useCallback(() => {
    setCssSelection({
      startLine: 0,
      endLine: 0,
      text: "",
    });
    setCssAiGenerated("");
  }, [setCssSelection, setCssAiGenerated]);
  return (
    <div className="relative h-full">
      <CodeiumEditor
        onMount={handleEditorDidMount}
        height="100%"
        language="css"
        defaultValue="/* Welcome to the CSS editor! 🚀*/"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        value={css}
        onChange={(value) => setCss(value || "")}
        options={{
          fontSize,
        }}
        className="tesseract--editor"
      />
      {
        <DiffEditorWrapper
          original={cssSelection}
          improved={cssAiGenerated}
          acceptChanges={acceptChanges}
          rejectChanges={rejectChanges}
          language={"css"}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[50%] bg-white dark:bg-[#1e1e1e] border-t z-[-100]",
            cssSelection.text && cssAiGenerated && "z-[100]"
          )}
        />
      }
    </div>
  );
};

export default Css;
