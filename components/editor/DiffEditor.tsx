"use client";
import { useTheme } from "next-themes";
import { useCallback, useRef } from "react";
import type { editor } from "monaco-types";
import { useScriptsStore } from "@/stores/scripts-provider";
import { CodeiumEditor } from "@codeium/react-code-editor";
import { calculateLineDiffs } from "@/utils/diff";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { inconsolata } from "@/constants/fonts";

interface DiffEditorProps {
  original: string;
  improved: string;
  language?: string;
}

const DiffEditor = ({
  original,
  improved,
  language = "plaintext",
}: DiffEditorProps) => {
  const { theme } = useTheme();
  const { fontSize } = useScriptsStore((state) => state);
  const originalEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const improvedEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Handle the original editor mounting
  const handleOriginalEditorDidMount = (
    editor: editor.IStandaloneCodeEditor
  ) => {
    originalEditorRef.current = editor;
    applyDiffHighlighting();
  };

  // Handle the improved editor mounting
  const handleImprovedEditorDidMount = (
    editor: editor.IStandaloneCodeEditor
  ) => {
    improvedEditorRef.current = editor;
    applyDiffHighlighting();
  };

  // Apply diff highlighting to both editors
  const applyDiffHighlighting = useCallback(() => {
    if (!originalEditorRef.current || !improvedEditorRef.current) return;

    const originalModel = originalEditorRef.current.getModel();
    const improvedModel = improvedEditorRef.current.getModel();

    if (!originalModel || !improvedModel) return;

    // Calculate differences between the two texts
    const { originalDecorations, improvedDecorations } = calculateLineDiffs(
      original,
      improved
    );

    // Apply decorations to highlight differences
    originalEditorRef.current.deltaDecorations([], originalDecorations);
    improvedEditorRef.current.deltaDecorations([], improvedDecorations);
  }, [original, improved]);

  // Update highlights when content changes
  useEffect(() => {
    applyDiffHighlighting();
  }, [original, improved, applyDiffHighlighting]);

  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full flex">
        {/* Original Editor */}
        <div className="flex-1 h-full">
          <div
            className={cn(
              "font-semibold text-sm mb-1 px-2 text-neutral-600 dark:text-neutral-400",
              inconsolata.className
            )}
          >
            Original
          </div>
          <div className="h-[calc(100%-25px)]">
            <CodeiumEditor
              onMount={handleOriginalEditorDidMount}
              height="100%"
              language={language}
              value={original}
              theme={theme === "dark" ? "vs-dark" : "vs"}
              options={{
                fontSize,
                readOnly: true,
                glyphMargin: true,
                lineNumbers: "on",
                folding: true,
                scrollBeyondLastLine: false,
              }}
              className="tesseract--editor h-full"
            />
          </div>
        </div>

        {/* Improved Editor */}
        <div className="flex-1 h-full">
          <div
            className={cn(
              "font-semibold text-sm mb-1 px-2 text-neutral-600 dark:text-neutral-400",
              inconsolata.className
            )}
          >
            Improved
          </div>
          <div className="h-[calc(100%-25px)]">
            <CodeiumEditor
              onMount={handleImprovedEditorDidMount}
              height="100%"
              language={language}
              value={improved}
              theme={theme === "dark" ? "vs-dark" : "vs"}
              options={{
                fontSize,
                readOnly: true,
                glyphMargin: true,
                lineNumbers: "on",
                folding: true,
                scrollBeyondLastLine: false,
              }}
              className="tesseract--editor h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffEditor;
