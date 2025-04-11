import { createTool } from "@mastra/core/tools";
import { z } from "zod";

function suggestCodeChanges(
  html: string,
  css: string,
  js: string,
  userRequest: string
): string {
  const suggestionPrompt = `Based on the user request "${userRequest}" and the provided code:
  
      HTML Code:
      ${html || "None provided"}
      
      CSS Code:
      ${css || "None provided"}
      
      JavaScript Code:
      ${js || "None provided"}
      
      Generate the modified code snippet(s) or provide clear instructions for the requested changes.
      Clearly indicate which part the changes apply to (HTML, CSS, or JavaScript).
      If suggesting modifications, provide the complete modified code block for clarity.`;

  return suggestionPrompt;
}

export const suggestCodeTool = createTool({
  id: "Suggest Code",
  inputSchema: z.object({
    html: z.string().optional().default(""),
    css: z.string().optional().default(""),
    js: z.string().optional().default(""),
    userRequest: z.string(),
  }),
  description: `Suggests improvements or changes to the provided HTML, CSS, and JavaScript code based on the user's request.
    Returns suggested code modifications or implementation guidance.`,
  execute: async ({ context: { html, css, js, userRequest } }) => {
    return suggestCodeChanges(html || "", css || "", js || "", userRequest);
  },
});
