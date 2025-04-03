import React, { useEffect, useRef } from "react";
import { useScriptsStore } from "@/stores/scripts-provider";
import { createDocument } from "@/utils/create-preview";

const Preview = () => {
  const { html, css, js, updateLogs } = useScriptsStore((state) => state);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "CONSOLE") {
        updateLogs([
          {
            level: event.data.level,
            data: event.data.data,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [updateLogs]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-none rounded-md"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
      title="Website Preview"
      referrerPolicy="no-referrer"
      srcDoc={createDocument({ html, css, js })}
    />
  );
};

export default Preview;
