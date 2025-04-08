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
import { Upload } from "lucide-react";

const EditorSelect = ({
  children,
  svg,
  isActive = false,
  onClick,
  logo = true,
  className,
}: {
  children: React.ReactNode;
  svg: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
  logo?: boolean;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md px-4 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
        {
          "bg-neutral-100 dark:bg-neutral-800": isActive,
        },
        className
      )}
      onClick={onClick}
    >
      {logo && svg}
      <span className="text-xs font-medium dark:text-neutral-400 text-neutral-600">
        {children}
      </span>
    </button>
  );
};

export const HtmlSelect = ({
  isActive,
  onClick,
  text = "index.html",
  logo = true,
  className,
}: {
  isActive: boolean;
  onClick: () => void;
  text?: string;
  logo?: boolean;
  className?: string;
}) => {
  return (
    <EditorSelect
      logo={logo}
      svg={<Htmlsvg />}
      isActive={isActive}
      onClick={onClick}
      className={className}
    >
      {text}
    </EditorSelect>
  );
};
export const CssSelect = ({
  isActive,
  onClick,
  text = "styles.css",
  logo = true,
  className,
}: {
  isActive: boolean;
  onClick: () => void;
  text?: string;
  logo?: boolean;
  className?: string;
}) => {
  return (
    <EditorSelect
      logo={logo}
      svg={<Csssvg />}
      isActive={isActive}
      onClick={onClick}
      className={className}
    >
      {text}
    </EditorSelect>
  );
};
export const JavascriptSelect = ({
  isActive,
  onClick,
  text = "script.js",
  logo = true,
  className,
}: {
  isActive: boolean;
  onClick: () => void;
  text?: string;
  logo?: boolean;
  className?: string;
}) => {
  return (
    <EditorSelect
      logo={logo}
      svg={<Javascriptsvg />}
      isActive={isActive}
      onClick={onClick}
      className={className}
    >
      {text}
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
export const Imageupload = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <EditorSelect
      svg={<Upload className="w-3 h-3" />}
      isActive={isActive}
      onClick={onClick}
    >
      Images
    </EditorSelect>
  );
};
