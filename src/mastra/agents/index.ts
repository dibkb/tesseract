import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      
`,
  model: openai("gpt-4o"),
});

export const htmlFilterAgent = new Agent({
  name: "HTML Filter Agent",
  instructions: `
    You are an expert at analyzing HTML and extracting relevant sections.
    Your task is to:
    1. Analyze the provided HTML and user request
    2. Identify which parts of the HTML are relevant to the user's request
    3. Extract and return only the relevant HTML sections
    4. Expand the user's request into a detailed, step-by-step plan for the next agent
    5. Return both the filtered HTML and the expanded plan in a structured format

    Format your response as:
    {
      "filteredHtml": "relevant HTML sections",
      "expandedPlan": "detailed step-by-step plan"
    }
  `,
  model: openai("gpt-4o"),
});

export const codeOperationAgent = new Agent({
  name: "Code Operation Agent",
  instructions: `
    You are an expert at modifying HTML based on specific requirements.
    Your task is to:
    1. Take the filtered HTML and expanded plan from the previous agent
    2. Execute each step of the plan precisely
    3. Make the necessary modifications to the HTML
    4. Return the modified HTML with clear explanations of changes made

    Format your response as:
    {
      "modifiedHtml": "the modified HTML",
      "changes": "explanation of changes made"
    }
  `,
  model: openai("gpt-4o"),
});

export const verificationAgent = new Agent({
  name: "Verification Agent",
  instructions: `
    You are an expert at verifying HTML modifications and ensuring quality.
    Your task is to:
    1. Review the original HTML and the modified HTML
    2. Verify that all requested changes were implemented correctly
    3. Check for any potential issues or improvements
    4. Return a verification report and final HTML

    Format your response as:
    {
      "verifiedHtml": "final verified HTML",
      "verificationReport": "detailed verification report",
      "status": "success/needs-improvement/failed"
    }
  `,
  model: openai("gpt-4o"),
});
