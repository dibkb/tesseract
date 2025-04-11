/* eslint-disable @next/next/no-img-element */
"use client";
import ImageUpload from "@/components/image-uplaod";
import { Button } from "@/components/ui/button";
import { useScriptsStore } from "@/stores/scripts-provider";
import { Suspense, useState } from "react";
import { generateWebsiteOutPutSchema } from "@/lib/ai-chat";
function HomeContent() {
  const { setHtml, setCss, setJs } = useScriptsStore((state) => state);
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };
  const handleGenerateWebsite = async () => {
    const res = await fetch("/api/generate-website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl,
      }),
    });
    const data = await res.json();
    const parse = generateWebsiteOutPutSchema.parse(data.object);
    setHtml(parse.html);
    setCss(parse.css);
    setJs(parse.js);
  };
  return (
    <main className="h-[calc(100vh-3rem)]">
      <section className="w-full h-full container mx-auto flex justify-center items-center">
        <div className="flex flex-col gap-4 w-[90vw] max-w-[900px] items-center">
          <h3 className="text-3xl font-medium text-neutral-700 dark:text-neutral-200 text-center mb-4">
            Turn screenshot into a website and deploy in seconds
          </h3>
          <div className="w-full max-w-[600px]">
            <ImageUpload onUploadComplete={handleUploadComplete} />
          </div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="screenshot"
              className="w-full border border-dashed border-neutral-200 dark:border-neutral-700 rounded-md max-w-[600px] max-h-[400px] object-contain"
            />
          )}
          <Button
            className="w-full max-w-[400px] font-medium py-3 select-none"
            disabled={!imageUrl}
            onClick={handleGenerateWebsite}
          >
            Generate Website 🚀
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
