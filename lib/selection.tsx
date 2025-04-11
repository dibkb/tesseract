import type { editor } from "monaco-types";
import type { Selection } from "@/constants/types/selection";

function getSelectedLines(
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>
): Selection | null {
  if (!editorRef.current) return null;

  const selection = editorRef.current.getSelection();
  if (!selection) return null;

  const model = editorRef.current.getModel();
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

export default getSelectedLines;
