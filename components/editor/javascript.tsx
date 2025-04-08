"use client";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import { useTheme } from "next-themes";

const Javascript = () => {
  const { js, setJs, fontSize } = useScriptsStore((state) => state);
  const { theme } = useTheme();
  return (
    <CodeiumEditor
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
