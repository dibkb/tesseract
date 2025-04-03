/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import React from "react";

const EditorSelect = ({
  children,
  src,
  isActive = false,
  onClick,
}: {
  children: React.ReactNode;
  src: string;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 border rounded-md px-4 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
        {
          "bg-neutral-100 dark:bg-neutral-800": isActive,
        }
      )}
      onClick={onClick}
    >
      <img src={src} alt="editor-select" className="w-4 h-4" />
      <span className="text-xs font-medium dark:text-neutral-400 text-neutral-600">
        {children}
      </span>
    </button>
  );
};

export const HtmlSelect = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <EditorSelect
      src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
      isActive={isActive}
      onClick={onClick}
    >
      index.html
    </EditorSelect>
  );
};
