"use client";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import { useTheme } from "next-themes";
import type { editor } from "monaco-types";
const Javascript = () => {
  const { js, setJs, fontSize, jsEditorRef } = useScriptsStore(
    (state) => state
  );
  const { theme } = useTheme();

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    jsEditorRef.current = editor;
  }

  return (
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
  );
};

export default Javascript;
