import { useEffect } from "react";
import type { editor } from "monaco-types";
import type { Selection } from "@/constants/types/selection";
import ManageSelection from "@/constants/selection";
import { useScriptsStore } from "@/stores/scripts-provider";

export const useEditorRef = () => {
  const { htmlEditorRef } = useScriptsStore((state) => state);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    htmlEditorRef.current = editor;
  }

  function getSelectedLines(): Selection | null {
    if (!htmlEditorRef.current) return null;

    const selection = htmlEditorRef.current.getSelection();
    if (!selection) return null;

    const model = htmlEditorRef.current.getModel();
    if (!model) return null;

    const startLine = selection.startLineNumber;
    const endLine = selection.endLineNumber;

    const selectedText = model.getValueInRange(selection);
    return {
      startLine,
      endLine,
      text: selectedText,
    };
  }

  return {
    htmlEditorRef,
    handleEditorDidMount,
    getSelectedLines,
  };
};

export const useHtmlSelection = () => {
  const { getSelectedLines, handleEditorDidMount, htmlEditorRef } =
    useEditorRef();

  useEffect(() => {
    if (getSelectedLines) {
      // Just set the callback function, don't call it immediately
      ManageSelection.getInstance().setHtmlSelection(
        getSelectedLines as () => Selection
      );
    }
  }, [getSelectedLines]);

  return { handleEditorDidMount, htmlEditorRef };
};
