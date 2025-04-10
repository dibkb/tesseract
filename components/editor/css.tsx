"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import type { editor } from "monaco-types";

const Css = () => {
  const { theme } = useTheme();
  const { css, setCss, fontSize, cssEditorRef } = useScriptsStore(
    (state) => state
  );

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    cssEditorRef.current = editor;
  }

  return (
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
  );
};

export default Css;
