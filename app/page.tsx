/* eslint-disable @next/next/no-img-element */
"use client";
import ImageUpload from "@/components/image-uplaod";
import { Button } from "@/components/ui/button";
import { useScriptsStore } from "@/stores/scripts-provider";
import { Suspense, useState } from "react";
import { generateWebsiteOutPutSchema } from "@/lib/ai-chat";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { inconsolata, libreBaskerville } from "@/constants/fonts";
import Link from "next/link";
import { Githubsvg, LinkedinSvg, Xsvg } from "@/components/svg/editor-buttons";
import { indexHtml } from "@/constants/html";

interface ImageProps {
  imageUrl: string;
  width: number;
  height: number;
}
function HomeContent() {
  const { setHtml, setCss, setJs, addImage } = useScriptsStore(
    (state) => state
  );
  const [imageProps, setImageProps] = useState<ImageProps>();
  const router = useRouter();
  const handleUploadComplete = (url: string, width: number, height: number) => {
    setImageProps({ imageUrl: url, width, height });
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateWebsite = async () => {
    setIsLoading(true);
    const res = await fetch("/api/generate-website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: imageProps?.imageUrl,
        width: imageProps?.width,
        height: imageProps?.height,
      }),
    });
    const data = await res.json();
    const parse = generateWebsiteOutPutSchema.parse(data.object);
    if (imageProps?.imageUrl) {
      addImage(imageProps?.imageUrl);
    }
    if (parse) {
      setHtml(parse.html);
      setCss(parse.css);
      setJs(parse.js);
      router.push("/dev?tab=preview");
    } else {
      toast.error("Something went wrong");
    }
  };

  function handleStartWithEmptyTemplate() {
    setHtml(indexHtml);
    setCss("");
    setJs("");
    router.push("/dev?tab=preview");
  }
  let buttonText = <> Generate Website 🚀 </>;
  if (isLoading) {
    buttonText = (
      <>
        <img
          src={
            "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          }
          alt=""
          className="w-4 h-4"
        />
        <span>Generating Code</span>
      </>
    );
  }

  return (
    <main className="h-[calc(100vh-3rem)]">
      <section className="w-full h-full container mx-auto flex justify-center items-center">
        <div className="flex flex-col gap-4 w-[90vw] max-w-[900px] items-center">
          <h3
            className={cn(
              "text-3xl font-medium text-neutral-700 dark:text-neutral-200 text-center mb-4",
              libreBaskerville.className
            )}
          >
            Turn screenshot into a website and deploy in seconds
          </h3>
          <div className="w-full max-w-[600px]">
            <ImageUpload onUploadComplete={handleUploadComplete} />
          </div>
          {imageProps?.imageUrl && (
            <img
              src={imageProps.imageUrl}
              alt="screenshot"
              className="w-full border border-dashed border-neutral-200 dark:border-neutral-700 rounded-md max-w-[600px] max-h-[400px] object-contain"
            />
          )}
          <Button
            className="w-full max-w-[400px] font-medium py-3 select-none"
            disabled={!imageProps?.imageUrl}
            onClick={handleGenerateWebsite}
          >
            {buttonText}
          </Button>
          <Button
            className="w-full max-w-[400px] font-medium py-3 select-none"
            onClick={handleStartWithEmptyTemplate}
            variant="outline"
          >
            Start with empty template
          </Button>
          <div className="flex items-center gap-2 mt-6">
            <img
              src="https://images.sftcdn.net/images/t_app-icon-m/p/8b1ff6ff-a6f3-450c-bd38-d35751753533/1356033661/meta-llama-3-logo"
              alt="Meta Icon"
              className="w-4 h-4"
            />
            <p
              className={cn(
                "text-sm text-neutral-500 dark:text-neutral-400 font-medium",
                inconsolata.className
              )}
            >
              llama-4-maverick-17b-128e-instruct
            </p>
          </div>
        </div>
      </section>

      {/* socials */}
      <main className="flex items-center justify-center gap-4 absolute bottom-8 right-8">
        <Link href="https://github.com/dibkb/tesseract" className="group">
          <Githubsvg className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-500 dark:group-hover:text-neutral-400" />
        </Link>
        <Link href="https://www.linkedin.com/in/dibkb/" className="group">
          <LinkedinSvg className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-500 dark:group-hover:text-neutral-400" />
        </Link>
        <Link href="https://x.com/dkborborah" className="group">
          <Xsvg className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-500 dark:group-hover:text-neutral-400" />
        </Link>
      </main>
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
