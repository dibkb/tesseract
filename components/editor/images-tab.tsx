"use client";

import React from "react";
import ImageUpload from "../image-uplaod";
import { useScriptsStore } from "@/stores/scripts-provider";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { AspectRatio } from "../ui/aspect-ratio";
import { Code, Copy } from "lucide-react";
const ImagesTab = () => {
  const { images, addImage } = useScriptsStore((state) => state);
  const handleUploadComplete = (url: string) => {
    addImage(url);
  };
  const imagesList = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ].map((image, id) => (
    <div
      key={image + id}
      className="w-full rounded-md bg-neutral-100 dark:bg-neutral-800"
    >
      <AspectRatio ratio={1} className="bg-muted">
        <Image
          src={image}
          alt="Photo by Drew Beamer"
          fill
          className="h-full w-full object-cover"
        />
      </AspectRatio>

      <div className="flex items-center justify-between p-3">
        <button className="text-xs flex items-center gap-1 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md">
          <Code className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
          HTML
        </button>
        <button className="text-xs flex items-center gap-1 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md">
          <Copy className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
          Copy
        </button>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="w-full h-[200px]">
        <ImageUpload onUploadComplete={handleUploadComplete} />
      </div>

      <div className="mt-6">
        <h3 className="mb-3">Your Images</h3>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {imagesList}
          </section>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ImagesTab;
