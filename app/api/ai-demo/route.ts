import { mastra } from "@/src/mastra";
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
export async function POST(req: Request) {
  const message = await req.json();
  const parsedMessage = inputSchema.parse(message);

  const agent = mastra.getAgent("codeAssistant");
  // Format the user request with HTML content template
  const formattedMessage = `HTML: ${parsedMessage.html}\n\nRequest: ${parsedMessage.userRequest}`;
  const result = await agent.stream(formattedMessage, {
    output: outPutSchema,
  });

  return result.toTextStreamResponse();
}
