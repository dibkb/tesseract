// This function simulates an LLM enhancing code
// In a real application, this would make an API call to an LLM service

/**
 * Enhance code using an LLM (simulated)
 * @param codeSelection The code selection to enhance
 * @param language The language of the code
 * @returns The enhanced code
 */
export const enhanceWithLLM = (
  codeSelection: string,
  language: string = "javascript"
): string => {
  // In a real application, you would make an API call to an LLM service
  // For this example, we'll simulate some common code improvements

  let enhancedCode = codeSelection;

  if (language === "javascript" || language === "typescript") {
    // Add semicolons where they might be missing
    enhancedCode = enhancedCode.replace(/(\w+)\s*\n/g, "$1;\n");

    // Convert var to const where possible
    enhancedCode = enhancedCode.replace(/var\s+(\w+)\s*=/g, "const $1 =");

    // Improve formatting of function declarations
    enhancedCode = enhancedCode.replace(/function\s*\(\)/g, "function()");

    // Convert anonymous functions to arrow functions
    enhancedCode = enhancedCode.replace(
      /function\s*\(([^)]*)\)\s*{/g,
      "($1) => {"
    );
  } else if (language === "html") {
    // Add missing alt attributes to images
    enhancedCode = enhancedCode.replace(
      /<img([^>]*)>/g,
      '<img$1 alt="Image description">'
    );

    // Add semantic HTML elements
    enhancedCode = enhancedCode.replace(
      /<div([^>]*)class="header"/g,
      "<header$1"
    );
    enhancedCode = enhancedCode.replace(
      /<div([^>]*)class="footer"/g,
      "<footer$1"
    );
  } else if (language === "css") {
    // Add vendor prefixes
    enhancedCode = enhancedCode.replace(
      /border-radius:\s*([^;]+);/g,
      "-webkit-border-radius: $1;\n  -moz-border-radius: $1;\n  border-radius: $1;"
    );
  }

  return enhancedCode;
};

/**
 * Utility function to apply DiffEditor to selected code
 * @param originalCode The original code
 * @param language The language of the code
 * @returns An object with original and improved code
 */
export const getDiffContent = (
  originalCode: string,
  language: string = "javascript"
) => {
  const improvedCode = enhanceWithLLM(originalCode, language);

  return {
    original: originalCode,
    improved: improvedCode,
  };
};
