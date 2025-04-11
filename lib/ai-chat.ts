import { z } from "zod";

const inputSchema = z.object({
  html: z.string(),
  userRequest: z.string(),
});
const outPutSchema = z.object({
  html: z.string(),
  css: z.string(),
  js: z.string(),
  explanation: z.string(),
});

export { inputSchema, outPutSchema };
