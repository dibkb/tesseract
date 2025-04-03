// src/stores/counter-store.ts
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

type LogLevel = "log" | "error" | "warn" | "info" | "debug";
type Log = {
  level: LogLevel;
  data: string[];
  timestamp: string;
};

export type ScriptsState = {
  html: string;
  css: string;
  js: string;
  logs: Log[];
};

export type ScriptsActions = {
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setJs: (js: string) => void;
  updateLogs: (logs: Log[]) => void;
  clearLogs: () => void;
};

export type ScriptsStore = ScriptsState & ScriptsActions;

export const defaultInitState: ScriptsState = {
  html: "",
  css: "",
  js: "",
  logs: [],
};

export const createScriptsStore = (
  initState: ScriptsState = defaultInitState
) => {
  return createStore<ScriptsStore>()(
    persist(
      (set) => ({
        ...initState,
        setHtml: (html: string) => set({ html }),
        setCss: (css: string) => set({ css }),
        setJs: (js: string) => set({ js }),
        updateLogs: (logs: Log[]) =>
          set((state) => ({ logs: [...state.logs, ...logs] })),
        clearLogs: () => set({ logs: [] }),
      }),
      {
        name: "tesseract-scripts",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
