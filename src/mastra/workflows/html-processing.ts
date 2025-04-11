import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import {
  htmlFilterAgent,
  codeOperationAgent,
  verificationAgent,
} from "../agents";

// Step 1: Filter HTML and create plan
const filterStep = new Step({
  id: "filterStep",
  execute: async ({ context }) => {
    const result = await htmlFilterAgent.stream(
      `HTML: ${context.triggerData.html}\n\nRequest: ${context.triggerData.userRequest}`,
      {
        output: z.object({
          filteredHtml: z.string(),
          expandedPlan: z.string(),
        }),
      }
    );
    const response = await result.toTextStreamResponse();
    return JSON.parse(await response.text());
  },
});

// Step 2: Perform operations on filtered HTML
const operationStep = new Step({
  id: "operationStep",
  execute: async ({ context }) => {
    const filterResult = context.getStepResult<{
      filteredHtml: string;
      expandedPlan: string;
    }>("filterStep");
    if (!filterResult) {
      throw new Error("Filter step result not found");
    }

    const result = await codeOperationAgent.stream(
      `Filtered HTML: ${filterResult.filteredHtml}\n\nPlan: ${filterResult.expandedPlan}`,
      {
        output: z.object({
          modifiedHtml: z.string(),
          changes: z.string(),
        }),
      }
    );
    const response = await result.toTextStreamResponse();
    return JSON.parse(await response.text());
  },
});

// Step 3: Verify the modifications
const verificationStep = new Step({
  id: "verificationStep",
  execute: async ({ context }) => {
    const operationResult = context.getStepResult<{
      modifiedHtml: string;
      changes: string;
    }>("operationStep");
    if (!operationResult) {
      throw new Error("Operation step result not found");
    }

    const result = await verificationAgent.stream(
      `Original HTML: ${context.triggerData.html}\n\nModified HTML: ${operationResult.modifiedHtml}\n\nChanges Made: ${operationResult.changes}`,
      {
        output: z.object({
          verifiedHtml: z.string(),
          verificationReport: z.string(),
          status: z.enum(["success", "needs-improvement", "failed"]),
        }),
      }
    );
    const response = await result.toTextStreamResponse();
    return JSON.parse(await response.text());
  },
});

// Final step to combine all results
const finalStep = new Step({
  id: "finalStep",
  execute: async ({ context }) => {
    const filterResult = context.getStepResult<{
      filteredHtml: string;
      expandedPlan: string;
    }>("filterStep");
    const operationResult = context.getStepResult<{
      modifiedHtml: string;
      changes: string;
    }>("operationStep");
    const verificationResult = context.getStepResult<{
      verifiedHtml: string;
      verificationReport: string;
      status: "success" | "needs-improvement" | "failed";
    }>("verificationStep");

    return {
      finalHtml: verificationResult.verifiedHtml,
      verificationReport: verificationResult.verificationReport,
      status: verificationResult.status,
      changes: operationResult.changes,
      expandedPlan: filterResult.expandedPlan,
    };
  },
});

// Build and export the workflow
const workflow = new Workflow({
  name: "html-processing",
  triggerSchema: z.object({
    html: z.string(),
    userRequest: z.string(),
  }),
  steps: [filterStep, operationStep, verificationStep, finalStep],
});

export default workflow;
