import { z } from "zod";
import { mastra } from "@/src/mastra";
import { generateWebsiteOutPutSchema } from "@/lib/ai-chat";

// Increased timeout to 5 minutes (300000ms)
export const maxDuration = 300000;

export async function POST(req: Request) {
  try {
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

    try {
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

      console.log("Generation successful");

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("AI generation error:", error);

      // Return specific error details
      return new Response(
        JSON.stringify({
          error: "AI generation failed",
          message: error instanceof Error ? error.message : "Unknown error",
          details:
            error instanceof Error && "cause" in error
              ? error.cause
              : undefined,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);

    return new Response(
      JSON.stringify({
        error: "Server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
