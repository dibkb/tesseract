"use client";
import { useTheme } from "next-themes";
import React from "react";
import { cn } from "@/lib/utils";
// import { unsplashImages } from "@/constants/unsplash-images";
const RegisterHero = () => {
  const theme = useTheme();
  const image = (
    <div
      //   src={unsplashImages.abstractWhite}
      //   alt="Register"
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[95%] w-[95%] object-cover rounded-lg",
        theme.theme === "dark" ? "bg-neutral-300" : "bg-neutral-800"
      )}
    />
  );
  return image;
};

export default RegisterHero;
