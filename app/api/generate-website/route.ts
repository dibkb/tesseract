import { z } from "zod";
import { mastra } from "@/src/mastra";
import { generateWebsiteOutPutSchema } from "@/lib/ai-chat";

export async function POST(req: Request) {
  const json = await req.json();
  const parsedData = z
    .object({
      imageUrl: z.string(),
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
            text: "Generate a website from the following screenshot",
          },
        ],
      },
    ],
    {
      output: generateWebsiteOutPutSchema,
    }
  );

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}
