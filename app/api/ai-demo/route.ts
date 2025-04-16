import { outPutSchema, inputSchema } from "@/lib/ai-chat";
import { mastra } from "@/src/mastra";

export async function POST(req: Request) {
  const message = await req.json();
  const parsedMessage = inputSchema.parse(message);

  const agent = mastra.getAgent("codeAssistant");
  // Format the user request with HTML content template
  const formattedMessage = `HTML: ${parsedMessage.html}\n\nCSS: ${parsedMessage.css}\n\nJavaScript: ${parsedMessage.js}\n\nRequest: ${parsedMessage.userRequest}`;
  const result = await agent.stream(formattedMessage, {
    output: outPutSchema,
  });
  console.log(result);

  return result.toTextStreamResponse();
}
