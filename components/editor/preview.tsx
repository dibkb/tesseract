import React, { useEffect, useRef } from "react";
import { useScriptsStore } from "@/stores/scripts-provider";
import { createDocument } from "@/utils/create-preview";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import { ResizablePanelGroup } from "../ui/resizable";
import { LogLevel } from "@/stores/scripts";
import Console from "./console";
const Preview = ({ console }: { console?: boolean }) => {
  const { html, css, js, updateLogs } = useScriptsStore((state) => state);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "CONSOLE") {
        updateLogs([
          {
            level: ("tesseract-log-" + event.data.level) as LogLevel,
            data: event.data.data,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [updateLogs]);
  if (console) {
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <iframe
            ref={iframeRef}
            className="w-full h-[calc(100vh-110px)] border-none rounded-md"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
            title="Website Preview"
            referrerPolicy="no-referrer"
            srcDoc={createDocument({ html, css, js })}
          />{" "}
          a
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} className="px-6 pt-2">
          <Console />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  } else {
    return (
      <iframe
        ref={iframeRef}
        className="w-full h-[calc(100vh-110px)] border-none rounded-md"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation allow-modals"
        title="Website Preview"
        referrerPolicy="no-referrer"
        srcDoc={createDocument({ html, css, js })}
      />
    );
  }
};

export default Preview;
