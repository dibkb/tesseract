import { useScriptsStore } from "@/stores/scripts-provider";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  Logs,
  Trash2,
} from "lucide-react";

const Console = () => {
  const { logs, clearLogs } = useScriptsStore((state) => state);

  return (
    <div>
      <button
        onClick={() => {
          clearLogs();
        }}
        className="flex items-end border px-2 py-1 rounded-md mb-2 cursor-pointer gap-2 text-xs text-neutral-500 ml-auto hover:text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-colors duration-200"
      >
        <Trash2 className="w-4 h-4" />
        Clear
      </button>
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-2">
          {logs
            .filter((log) => log.level.includes("tesseract-log-"))
            .map((log) => (
              <div
                key={log.timestamp}
                className="flex items-center justify-between gap-2 border-b pb-2"
              >
                <LogLevel level={log.level} />
                <span className="text-xs text-neutral-500 flex-1">
                  {log.data}
                </span>
                <span className="text-xs text-neutral-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Console;

const LogLevel = ({ level }: { level: string }) => {
  let content;
  switch (level) {
    case "tesseract-log-log":
      content = (
        <span className="text-xs text-blue-500 flex items-center gap-1">
          <Logs className="w-4 h-4" />
          [log]
        </span>
      );
      break;
    case "tesseract-log-error":
      content = (
        <span className="text-xs text-red-500 flex items-center gap-1">
          <CircleX className="w-4 h-4" />
          [error]
        </span>
      );
      break;
    case "tesseract-log-warn":
      content = (
        <span className="text-xs text-yellow-500 flex items-center gap-1">
          <CircleAlert className="w-4 h-4" />
          [warn]
        </span>
      );
      break;
    case "tesseract-log-info":
      content = (
        <span className="text-xs text-green-500 flex items-center gap-1">
          <CircleCheck className="w-4 h-4" />
          [info]
        </span>
      );
      break;
    case "tesseract-log-debug":
      content = (
        <span className="text-xs text-neutral-500 flex items-center gap-1">
          <CircleHelp className="w-4 h-4" />
          [debug]
        </span>
      );
      break;
  }
  return content;
};
