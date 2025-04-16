import { createTool } from "@mastra/core/tools";
import { z } from "zod"; // if you use zod for schema validation
import { Agent } from "@mastra/core/agent";
import { model } from "@/ai/providers";

// Define AgentA which will perform the first LLM call
const agentA = new Agent({
  name: "HTML Semantic Structure Validator",
  instructions:
    'You are an HTML semantic structure validator. Ensure the HTML includes proper semantic structure with essential tags like <!DOCTYPE html>, <html lang="en">, <head> with appropriate meta tags, and <body>. Preserve existing content while adding missing structural elements. Always maintain proper nesting and parent-child relationships to preserve HTML semantics.',
  model: model.languageModel("deepseek-r1-distill-llama-70b"),
});

// Create a tool for AgentA to be used by other agents
const htmlImprovementTool = createTool({
  id: "html-improvement-agent",
  description:
    "Validates and improves HTML code by ensuring proper semantic structure and essential tags are present.",
  inputSchema: z.object({
    html: z.string().describe("html code"),
  }),
  outputSchema: z.object({
    html: z.string().describe("Semantically valid HTML with proper structure"),
  }),
  execute: async ({ context }) => {
    const result =
      await agentA.generate(`Analyze this HTML and ensure it has proper semantic structure with all essential elements. Add any missing tags like <!DOCTYPE html>, <html lang="en">, <head> with meta tags, and <body> while preserving the existing content and maintaining parent-child relationships:

${context.html}`);
    return { html: result.text };
  },
});

export default htmlImprovementTool;
