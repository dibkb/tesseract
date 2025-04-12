import { selectedComponentsDisplay } from "@/constants/selected-components";
import React from "react";
import { ContextSelected } from "@/stores/scripts";
import { X } from "lucide-react";
import { useScriptsStore } from "@/stores/scripts-provider";

const SelectedContext = ({
  contextSelected,
  selectionHandler,
}: {
  contextSelected: ContextSelected[];
  selectionHandler: (ele: ContextSelected) => void;
}) => {
  const { htmlSelection, cssSelection, jsSelection } = useScriptsStore(
    (state) => state
  );
  return (
    <>
      {contextSelected.map((ele) => {
        let content = selectedComponentsDisplay[ele];
        if (ele === "selectedHtml") {
          content = `index.html : (${htmlSelection.startLine} - ${htmlSelection.endLine} lines)`;
        } else if (ele === "selectedCss") {
          content = `style.css : (${cssSelection.startLine} - ${cssSelection.endLine} lines)`;
        } else if (ele === "selectedJs") {
          content = `script.js : (${jsSelection.startLine} - ${jsSelection.endLine} lines)`;
        }
        return (
          <button
            key={ele}
            className="text-xs font-semibold border text-neutral-500 px-4 py-[2px] rounded-sm transition-all duration-300 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center gap-1 group"
            onClick={() => selectionHandler(ele)}
          >
            <X className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            {content}
          </button>
        );
      })}
    </>
  );
};

export default SelectedContext;
