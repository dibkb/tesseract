export const killIndent = (code: string) => {
  const lines = code.split("\n");
  const minIndent = Math.min(
    ...lines.map((line) => line.match(/^\s*/)?.[0].length || 0)
  );
  return lines.map((line) => line.slice(minIndent)).join("\n");
};

export const matchIndent = (original: string, improved: string) => {
  const originalLines = original.split("\n");
  const improvedLines = improved.split("\n");

  return improvedLines
    .map((line, index) => {
      if (index >= originalLines.length) return line;
      const originalIndent = originalLines[index].match(/^\s*/)?.[0] || "";
      return originalIndent + line.trimStart();
    })
    .join("\n");
};
