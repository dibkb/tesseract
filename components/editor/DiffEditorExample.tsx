"use client";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { killIndent } from "@/utils/kill-indent";
import DiffEditor from "./DiffEditor";

interface DiffEditorWrapperProps {
  original: string;
  improved: string;
  language: string;
  className?: string;
}

export default function DiffEditorWrapper({
  original,
  improved,
  language,
  className,
}: DiffEditorWrapperProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400">
          AI Code Changes
        </h1>

        <section className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 dark:text-neutral-400 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-500 font-semibold flex items-center group"
          >
            <Check className="w-4 h-4 invisible group-hover:visible" />
            Accept changes
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 dark:text-neutral-400 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-500 font-semibold flex items-center group"
          >
            <X className="w-4 h-4 invisible group-hover:visible" />
            Reject changes
          </Button>
        </section>
      </div>
      <div className="flex-1 overflow-hidden">
        <DiffEditor
          original={killIndent(original)}
          improved={killIndent(improved)}
          language={language}
        />
      </div>
    </div>
  );
}
