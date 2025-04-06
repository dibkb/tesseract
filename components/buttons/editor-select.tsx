/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import React from "react";
import {
  Csssvg,
  Htmlsvg,
  Javascriptsvg,
  Logsvg,
  Previewsvg,
} from "../svg/editor-buttons";

const EditorSelect = ({
  children,
  svg,
  isActive = false,
  onClick,
}: {
  children: React.ReactNode;
  svg: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md px-4 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
        {
          "bg-neutral-100 dark:bg-neutral-800": isActive,
        }
      )}
      onClick={onClick}
    >
      {svg}
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
    <EditorSelect svg={<Htmlsvg />} isActive={isActive} onClick={onClick}>
      index.html
    </EditorSelect>
  );
};
export const CssSelect = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <EditorSelect svg={<Csssvg />} isActive={isActive} onClick={onClick}>
      styles.css
    </EditorSelect>
  );
};
export const JavascriptSelect = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <EditorSelect svg={<Javascriptsvg />} isActive={isActive} onClick={onClick}>
      script.js
    </EditorSelect>
  );
};
export const PreviewSelect = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <EditorSelect svg={<Previewsvg />} isActive={isActive} onClick={onClick}>
      Preview
    </EditorSelect>
  );
};
export const LogsSelect = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <EditorSelect svg={<Logsvg />} isActive={isActive} onClick={onClick}>
      console
    </EditorSelect>
  );
};
