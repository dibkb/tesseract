import type { editor } from "monaco-types";

export const deleteLines = (
  startLine: number,
  endLine: number,
  htmlEditorRef: React.RefObject<editor.IStandaloneCodeEditor | null>
) => {
  if (!htmlEditorRef.current) return;

  const model = htmlEditorRef.current.getModel();
  if (!model) return;

  const range = {
    startLineNumber: startLine,
    startColumn: 1,
    endLineNumber: endLine + 1,
    endColumn: 1,
  };

  htmlEditorRef.current.executeEdits("delete-lines", [
    {
      range,
      text: "",
      forceMoveMarkers: true,
    },
  ]);
};

export const pasteAtLine = (
  lineNumber: number,
  text: string,
  htmlEditorRef: React.RefObject<editor.IStandaloneCodeEditor | null>
) => {
  if (!htmlEditorRef.current) return;

  const model = htmlEditorRef.current.getModel();
  if (!model) return;

  const range = {
    startLineNumber: lineNumber,
    startColumn: 1,
    endLineNumber: lineNumber,
    endColumn: 1,
  };

  htmlEditorRef.current.executeEdits("paste-text", [
    {
      range,
      text: text + "\n",
      forceMoveMarkers: true,
    },
  ]);
};
