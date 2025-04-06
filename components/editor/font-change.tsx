import { Minus, Plus } from "lucide-react";
import React from "react";
import { useScriptsStore } from "@/stores/scripts-provider";

const FontChange = () => {
  const { fontSize, decreaseFontSize, increaseFontSize } = useScriptsStore(
    (state) => state
  );
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 rounded-full p-1"
          onClick={decreaseFontSize}
          disabled={fontSize <= 8}
          aria-label="Decrease font size"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="font-medium text-sm text-neutral-500 w-8 select-none">
          {fontSize}px
        </span>

        <button
          className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-700 rounded-full p-1"
          onClick={increaseFontSize}
          disabled={fontSize >= 32}
          aria-label="Increase font size"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FontChange;
