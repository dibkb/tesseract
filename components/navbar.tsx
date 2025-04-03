"use client";
import { inconsolata } from "@/constants/fonts";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <section className="flex items-center justify-between border-b border-dashed border-border">
      <div className="flex items-center justify-between gap-2 py-2 container mx-auto">
        <Link
          href="/"
          className={cn(
            inconsolata.className,
            "font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
          )}
        >
          tesseract
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-accent transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
