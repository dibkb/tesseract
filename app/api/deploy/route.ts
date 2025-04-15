import { NextResponse } from "next/server";
import JSZip from "jszip";
import { resetCss } from "@/utils/reset-css";
import { addFooterCSS, createFullHtml } from "@/utils/create-preview";
export async function POST(req: Request) {
  try {
    const { html, css, js } = await req.json();
    const zip = new JSZip();

    // Create the HTML content with proper whitespace preservation

    zip.file("index.html", createFullHtml({ html }));
    zip.file("reset.css", resetCss);
    zip.file("style.css", addFooterCSS(css));
    zip.file("script.js", js);
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Create a new site on Netlify with increased timeout
    const netlifyResponse = await fetch(
      "https://api.netlify.com/api/v1/sites/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          name: "honestly-tesseract-site" + Date.now(),
        }),
        // Increase timeout to 30 seconds
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!netlifyResponse.ok) {
      const errorData = await netlifyResponse.json().catch(() => ({}));
      throw new Error(
        `Failed to create site: ${netlifyResponse.status} ${JSON.stringify(
          errorData
        )}`
      );
    }

    const siteData = await netlifyResponse.json();
    console.log("Site created:", siteData);
    const siteId = siteData.id;

    // Create a deploy with files
    // Using the file-tree endpoint which is the correct way to deploy files
    const deployResponse = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`,
          "Content-Type": "application/zip",
        },
        body: zipBuffer,
        // Increase timeout to 30 seconds
        signal: AbortSignal.timeout(30000),
      }
    );

    const deployData = await deployResponse.json();
    console.log("Deploy completed:", deployData);

    return NextResponse.json({
      success: true,
      deployUrl: deployData.ssl_url || deployData.url,
      deployData: deployData,
    });
  } catch (error) {
    console.error("Deployment error:", error);
    return NextResponse.json(
      {
        error: "Deployment failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
