import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import {
  weatherAgent,
  htmlFilterAgent,
  codeOperationAgent,
  verificationAgent,
} from "./agents";
import codeAssistant from "./agents/code-assistant";
import htmlProcessingWorkflow from "./workflows/html-processing";

export const mastra = new Mastra({
  agents: {
    weatherAgent,
    codeAssistant,
    htmlFilterAgent,
    codeOperationAgent,
    verificationAgent,
  },
  workflows: {
    htmlProcessing: htmlProcessingWorkflow,
  },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
