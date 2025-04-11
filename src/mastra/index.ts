import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { weatherAgent } from "./agents";
import codeAssistant from "./agents/code-assistant";
export const mastra = new Mastra({
  agents: { weatherAgent, codeAssistant },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
