// src/stores/counter-store.ts
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type LogLevel =
  | "tesseract-log-log"
  | "tesseract-log-error"
  | "tesseract-log-warn"
  | "tesseract-log-info"
  | "tesseract-log-debug";
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
  fontSize: number;
};

export type ScriptsActions = {
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setJs: (js: string) => void;
  updateLogs: (logs: Log[]) => void;
  clearLogs: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

export type ScriptsStore = ScriptsState & ScriptsActions;

export const defaultInitState: ScriptsState = {
  html: "",
  css: "",
  js: "",
  logs: [],
  fontSize: 14,
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
        fontSize: 14,
        increaseFontSize: () =>
          set((state) => ({ fontSize: state.fontSize + 1 })),
        decreaseFontSize: () =>
          set((state) => ({ fontSize: state.fontSize - 1 })),
      }),
      {
        name: "tesseract-scripts",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          html: state.html,
          css: state.css,
          js: state.js,
          logs: state.logs,
        }),
      }
    )
  );
};
