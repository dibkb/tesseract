import { z } from "zod";
import { mastra } from "@/src/mastra";
import { generateWebsiteOutPutSchema } from "@/lib/ai-chat";

export async function POST(req: Request) {
  const json = await req.json();
  const parsedData = z
    .object({
      imageUrl: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .safeParse(json);

  if (!parsedData.success) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const agent = mastra.getAgent("websiteGenerator");
  const result = await agent.generate(
    [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(parsedData.data.imageUrl),
          },
          {
            type: "text",
            text: `The screenshot is ${parsedData.data.width}px wide and ${parsedData.data.height}px tall`,
          },
          {
            type: "text",
            text: "Generate a html, css and js code to replicate the website in the screenshot",
          },
        ],
      },
    ],
    {
      output: generateWebsiteOutPutSchema,
    }
  );
  console.log(result);

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}
