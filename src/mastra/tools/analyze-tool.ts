import { createTool } from "@mastra/core/tools";
import { z } from "zod";

function analyzeCode(
  html: string,
  css: string,
  js: string,
  userRequest: string
): string {
  const analysisPrompt = `Analyze the following code snippets based on the user request: ${userRequest}.
    
    HTML Code:
    ${html || "None provided"}
    
    CSS Code:
    ${css || "None provided"}
    
    JavaScript Code:
    ${js || "None provided"}
    
    Provide a concise analysis focusing on the user's request (e.g., identify bugs, suggest improvements, explain logic).`;
  return analysisPrompt;
}

export const analyzeCodeTool = createTool({
  id: "Analyze Code",
  inputSchema: z.object({
    html: z.string().optional().default(""),
    css: z.string().optional().default(""),
    js: z.string().optional().default(""),
    userRequest: z.string(),
  }),
  description: `Analyzes the provided HTML, CSS, and JavaScript code based on the user's request.
    Identifies potential issues, bugs, areas for improvement, or explains the code.
    Returns a textual analysis.`,
  execute: async ({ context: { html, css, js, userRequest } }) => {
    return analyzeCode(html || "", css || "", js || "", userRequest);
  },
});
