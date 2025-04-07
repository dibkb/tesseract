import { useRef, useEffect } from "react";
import type { editor } from "monaco-types";
import type { Selection } from "@/constants/types/selection";
import ManageSelection from "@/constants/selection";

export const useEditorRef = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function getSelectedLines(): Selection | null {
    if (!editorRef.current) return null;

    const selection = editorRef.current.getSelection();
    if (!selection) return null;

    const model = editorRef.current.getModel();
    if (!model) return null;

    const startLine = selection.startLineNumber;
    const endLine = selection.endLineNumber;

    const selectedText = model.getValueInRange(selection);
    const lines = selectedText.split("\n");
    return {
      startLine,
      endLine,
      lines,
      text: selectedText,
    };
  }

  return {
    editorRef,
    handleEditorDidMount,
    getSelectedLines,
  };
};

export const useHtmlSelection = () => {
  const { getSelectedLines, handleEditorDidMount } = useEditorRef();

  useEffect(() => {
    if (getSelectedLines) {
      // Just set the callback function, don't call it immediately
      ManageSelection.getInstance().setHtmlSelection(
        getSelectedLines as () => Selection
      );
    }
  }, [getSelectedLines]);

  return handleEditorDidMount;
};
