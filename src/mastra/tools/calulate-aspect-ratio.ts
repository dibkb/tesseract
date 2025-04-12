import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const calulateAspectRatioTool = createTool({
  id: "Calulate Aspect Ratio",
  inputSchema: z.object({
    width: z.number(),
    height: z.number(),
  }),
  description: `Calulates the aspect ratio of the provided width and height.
      Returns a textual analysis.`,
  execute: async ({ context: { width, height } }) => {
    const aspectRatio = width / height;
    return `The aspect ratio of the provided width and height is ${aspectRatio}`;
  },
});
