"use client";
import React, { useCallback, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { HtmlSelect, JavascriptSelect } from "../buttons/editor-select";
import { CssSelect } from "../buttons/editor-select";
import { useScriptsStore } from "@/stores/scripts-provider";
import { ContextSelected } from "@/stores/scripts";
import { selectedComponentsDisplay } from "@/constants/selected-components";
import { X } from "lucide-react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outPutSchema } from "@/lib/ai-chat";
import getSelectedLines from "@/lib/selection";

const ChatComponent = () => {
  const { object, submit, isLoading } = useObject({
    api: "/api/ai-demo",
    schema: outPutSchema,
  });
  const [modal, setModal] = useState(false);
  const {
    htmlEditorRef,
    cssEditorRef,
    jsEditorRef,
    contextSelected,
    setContextSelected,
    setHtmlSelection,
    setCssSelection,
    setJsSelection,
  } = useScriptsStore((state) => state);

  const selectionHandler = useCallback(
    (key: ContextSelected) => {
      if (contextSelected.includes(key)) {
        setContextSelected(contextSelected.filter((item) => item !== key));
      } else {
        setContextSelected([...contextSelected, key]);
      }
    },
    [contextSelected, setContextSelected]
  );
  const onClickHtmlSelection = () => {
    const htmlSelection = getSelectedLines(htmlEditorRef);
    if (htmlSelection) {
      setHtmlSelection(htmlSelection);
      selectionHandler("selectedHtml");
    }
  };
  const onClickCssSelection = () => {
    const cssSelection = getSelectedLines(cssEditorRef);
    if (cssSelection) {
      setCssSelection(cssSelection);
      selectionHandler("selectedCss");
    }
  };
  const onClickJsSelection = () => {
    const jsSelection = getSelectedLines(jsEditorRef);
    if (jsSelection) {
      setJsSelection(jsSelection);
      selectionHandler("selectedJs");
    }
  };

  // selections

  const [text, setText] = useState("");
  const modalContent = (
    <div className="w-[200px] p-2 rounded-md text-sm gap-1 flex flex-col">
      <HtmlSelect
        isActive={contextSelected.includes("html")}
        onClick={() => selectionHandler("html")}
        text={"index.html (all)"}
      />
      <CssSelect
        isActive={contextSelected.includes("css")}
        onClick={() => selectionHandler("css")}
        text={"style.css (all)"}
      />
      <JavascriptSelect
        isActive={contextSelected.includes("js")}
        onClick={() => selectionHandler("js")}
        text={"script.js (all)"}
      />
      {htmlEditorRef.current && (
        <HtmlSelect
          isActive={contextSelected.includes("selectedHtml")}
          onClick={onClickHtmlSelection}
          text={`index.html (selected)`}
        />
      )}
      {cssEditorRef.current && (
        <CssSelect
          isActive={contextSelected.includes("selectedCss")}
          onClick={onClickCssSelection}
          text={"style.css (selected)"}
        />
      )}
      {jsEditorRef.current && (
        <JavascriptSelect
          isActive={contextSelected.includes("selectedJs")}
          onClick={onClickJsSelection}
          text={"script.js (selected)"}
        />
      )}
    </div>
  );

  return (
    <div className="h-full relative p-2 flex flex-col">
      <main className="flex-1 overflow-y-auto mb-[180px]">
        <div className="space-y-4 p-1"></div>
      </main>

      <div className="absolute bottom-0 left-0 w-full p-2 bg-background/80 backdrop-blur-sm">
        {modal && modalContent}
        <div className="py-2">
          <button
            onClick={() => setModal((prev) => !prev)}
            className="text-xs border px-4 py-[2px] rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 cursor-pointer"
          >
            @ Add context
          </button>
        </div>
        <div className="py-2 flex items-center gap-2 flex-wrap">
          {contextSelected.map((ele) => (
            <button
              key={ele}
              className="text-xs border text-neutral-500 px-4 py-[2px] rounded-sm transition-all duration-300 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center gap-1"
              onClick={() => selectionHandler(ele)}
            >
              {selectedComponentsDisplay[ele]}
              <X className="w-4 h-4" />
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit({
              html: text,
              userRequest: "Fix this code",
            });
          }}
          className="w-full h-full flex flex-col gap-2 items-center justify-center rounded-lg"
        >
          <Textarea
            className="w-full h-full max-h-44 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            placeholder="Plan search and build anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            // disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!text.trim()}
            className="w-full m-1 rounded-md dark:bg-white/80 hover:dark:bg-white transition-all duration-300 dark:text-black cursor-pointer bg-neutral-800 hover:bg-neutral-900 border"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
