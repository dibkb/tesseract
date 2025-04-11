import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { analyzeCodeTool } from "../tools/analyze-tool";
import { suggestCodeTool } from "../tools/suggest-code";

const instructions = `You are an expert AI code assistant specializing in HTML, CSS, and JavaScript.
        You help users analyze code, find bugs, suggest improvements, refactor code, and explain code snippets.
        You have access to the following tools:

        {tools}

        You should:
        1. Carefully analyze the user's request and the provided code snippets.
        2. Decide which tool(s) to use to best address the request.
        3. If analyzing first, use the analyzeCodeTool.
        4. Respond directly to the user with the final analysis, explanation, or suggested code changes based on the tool outputs.
        5. If providing code changes, clearly label which language (HTML, CSS, JS) the changes apply to and provide the complete modified code block.
        6. Brifely Explain the changes you made to the code in markdown format.
        6. If no code is provided for a specific language, treat it as empty or N/A.

        User Request: {input}
        Provided HTML Code: {code_html}
        Provided CSS Code: {code_css}
        Provided JavaScript Code: {code_js}
    `;

const codeAssistant = new Agent({
  name: "code-assistant",
  instructions: instructions,
  model: openai("gpt-4o"),
  tools: {
    analyzeCodeTool,
    suggestCodeTool,
  },
});

export default codeAssistant;
