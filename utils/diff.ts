import type { editor } from "monaco-types";

export const calculateLineDiffs = (original: string, improved: string) => {
  const originalLines = original.split("\n");
  const improvedLines = improved.split("\n");

  const originalDecorations: editor.IModelDeltaDecoration[] = [];
  const improvedDecorations: editor.IModelDeltaDecoration[] = [];

  let i = 0;
  let j = 0;

  while (i < originalLines.length || j < improvedLines.length) {
    if (
      i < originalLines.length &&
      j < improvedLines.length &&
      originalLines[i].trim() === improvedLines[j].trim()
    ) {
      // Lines match - move forward
      i++;
      j++;
    } else {
      // Lines differ
      if (i < originalLines.length) {
        originalDecorations.push({
          range: {
            startLineNumber: i + 1,
            startColumn: 1,
            endLineNumber: i + 1,
            endColumn: originalLines[i].length + 1,
          },
          options: {
            className: "diff-removed",
            isWholeLine: true,
          },
        });
        i++;
      }
      if (j < improvedLines.length) {
        improvedDecorations.push({
          range: {
            startLineNumber: j + 1,
            startColumn: 1,
            endLineNumber: j + 1,
            endColumn: improvedLines[j].length + 1,
          },
          options: {
            className: "diff-added",
            isWholeLine: true,
          },
        });
        j++;
      }
    }
  }

  return { originalDecorations, improvedDecorations };
};
