"use client";
import { useTheme } from "next-themes";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";

const Css = () => {
  const { theme } = useTheme();
  const { css, setCss, fontSize } = useScriptsStore((state) => state);
  return (
    <CodeiumEditor
      height="100%"
      language="css"
      defaultValue="/* Welcome to the CSS editor! 🚀*/"
      theme={theme === "dark" ? "vs-dark" : "vs"}
      value={css}
      onChange={(value) => setCss(value || "")}
      options={{
        fontSize,
      }}
    />
  );
};

export default Css;
