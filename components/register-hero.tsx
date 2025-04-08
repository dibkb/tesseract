"use client";
import { useTheme } from "next-themes";
import React from "react";
import { cn } from "@/lib/utils";
import { useIsClient } from "./hooks/use-is-client";
// import { unsplashImages } from "@/constants/unsplash-images";
const RegisterHero = () => {
  const isClient = useIsClient();
  const theme = useTheme();
  const image = (
    <div
      //   src={unsplashImages.abstractWhite}
      //   alt="Register"
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[95%] w-[95%] object-cover rounded-lg",
        theme.theme === "dark"
          ? "bg-gradient-to-br from-neutral-200 to-neutral-400"
          : "bg-gradient-to-br from-neutral-700 to-neutral-900"
      )}
    />
  );
  if (!isClient) return null;
  return image;
};

export default RegisterHero;

export const RgisterOverlay = () => {
  const isClient = useIsClient();
  const { theme } = useTheme();
  if (!isClient) return null;
  return (
    <div className="inset-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[95%] w-[95%] object-cover rounded-lg z-50 p-8 flex items-center justify-center">
      <div className="flex flex-col">
        <h3
          className={cn(
            "text-5xl font-semibold",
            theme === "dark" ? "text-background" : "text-white"
          )}
        >
          Welcome to Tesseract
        </h3>

        <h4
          className={cn(
            "text-2xl font-medium",
            theme === "dark" ? "text-neutral-700" : "text-neutral-300"
          )}
        >
          Frontend, meet AI.
        </h4>
        <p className="text-neutral-500 text-lg font-medium mt-5">
          Craft stunning HTML, CSS, and JavaScript websites — with just a
          prompt. No setup. No boilerplate. Just ideas → live websites in
          seconds.⏳
        </p>

        <main className="flex flex-col gap-4 font-medium text-neutral-500 mt-4">
          <p>✨ Powered by AI.</p>
          <p>⚡ Deployed instantly.</p>
          <p>🎯 Yours to tweak, style, and ship.</p>
        </main>
      </div>
    </div>
  );
};
