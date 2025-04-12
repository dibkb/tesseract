"use client";
import { toast } from "sonner";
import React, { useCallback, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { HtmlSelect, JavascriptSelect } from "../buttons/editor-select";
import { CssSelect } from "../buttons/editor-select";
import { useScriptsStore } from "@/stores/scripts-provider";
import { ContextSelected } from "@/stores/scripts";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outPutSchema } from "@/lib/ai-chat";
import getSelectedLines from "@/lib/selection";
import SelectedContext from "../editor/selected-context";
import AiChatContent from "./ai-chat-content";
// import pasteClipBoard from "@/utils/paste-clipboard";

const ChatComponent = () => {
  const { object, submit, isLoading } = useObject({
    api: "/api/ai-demo",
    schema: outPutSchema,
  });
  const [modal, setModal] = useState(false);
  const {
    htmlSelection,
    cssSelection,
    jsSelection,
    htmlEditorRef,
    cssEditorRef,
    jsEditorRef,
    contextSelected,
    setContextSelected,
    setHtmlSelection,
    setCssSelection,
    setJsSelection,
    setHtmlAiGenerated,
    setCssAiGenerated,
    setJsAiGenerated,
    htmlAiGenerated,
    cssAiGenerated,
    jsAiGenerated,
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

  useEffect(() => {
    if (object?.html) {
      setHtmlAiGenerated(object?.html);
    }
    if (object?.css) {
      setCssAiGenerated(object?.css);
    }
    if (object?.js) {
      setJsAiGenerated(object?.js);
    }
  }, [object, setHtmlAiGenerated, setCssAiGenerated, setJsAiGenerated]);
  const htmlDiffPresent = Boolean(htmlAiGenerated && htmlSelection.text);
  const cssDiffPresent = Boolean(cssAiGenerated && cssSelection.text);
  const jsDiffPresent = Boolean(jsAiGenerated && jsSelection.text);

  const [text, setText] = useState("");
  const modalContent = (
    <div className="w-[200px] p-2 rounded-md text-sm gap-1 flex flex-col">
      {/* <HtmlSelect
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
      /> */}
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

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isLoading) {
        toast("Please wait for the AI to generate the code", {
          description: "Please wait for the AI to generate the code",
        });
        return;
      }
      if (htmlDiffPresent) {
        toast("Please Accept or Reject the HTML code", {
          description:
            "Please Accept or Reject the AI generated code first in the html editor",
        });
        return;
      }
      if (cssDiffPresent) {
        toast("Please Accept or Reject the CSS code", {
          description:
            "Please Accept or Reject the AI generated code first in the css editor",
        });
        return;
      }
      if (jsDiffPresent) {
        toast("Please Accept or Reject the JS code", {
          description:
            "Please Accept or Reject the AI generated code first in the js editor",
        });
        return;
      }

      submit({
        html: contextSelected.includes("selectedHtml")
          ? htmlSelection.text
          : "",
        css: contextSelected.includes("selectedCss") ? cssSelection.text : "",
        js: contextSelected.includes("selectedJs") ? jsSelection.text : "",
        userRequest: text.trim(),
      });
      setText("");
    },
    [
      submit,
      isLoading,
      htmlDiffPresent,
      cssDiffPresent,
      jsDiffPresent,
      cssSelection,
      jsSelection,
      htmlSelection,
      contextSelected,
      text,
    ]
  );
  return (
    <div className="h-full relative p-2 flex flex-col">
      <main className="flex-1 overflow-y-auto mb-[300px]">
        {/* AI content */}
        <AiChatContent object={object} />
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
          <SelectedContext
            contextSelected={contextSelected}
            selectionHandler={selectionHandler}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-2 items-center justify-center rounded-lg"
        >
          <Textarea
            className="w-full h-full max-h-44 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none font-semibold"
            placeholder="Plan search and build anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={
              isLoading || htmlDiffPresent || cssDiffPresent || jsDiffPresent
            }
            onPaste={(e) => {
              e.preventDefault();
              toast("Pasting not allowed", {
                description: "Please select the code and add it to the context",
              });
            }}
          />
          <Button
            type="submit"
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
