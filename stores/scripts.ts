// src/stores/counter-store.ts
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { Selection } from "../constants/types/selection";
import type { editor } from "monaco-types";

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
  images: string[];

  fontSize: number;
  htmlEditorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
  cssEditorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
  jsEditorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
};

export type ContextSelected =
  | "html"
  | "css"
  | "js"
  | "selectedHtml"
  | "selectedCss"
  | "selectedJs";

const defaultSekection: Selection = {
  startLine: 0,
  endLine: 0,
  text: "",
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

  // selection
  htmlSelection: Selection;
  cssSelection: Selection;
  jsSelection: Selection;

  // context
  setHtmlSelection: (selection: Selection) => void;
  setCssSelection: (selection: Selection) => void;
  setJsSelection: (selection: Selection) => void;

  contextSelected: ContextSelected[];
  setContextSelected: (contextSelected: ContextSelected[]) => void;

  // images
  setImages: (images: string[]) => void;
  addImage: (image: string) => void;

  setHtmlEditorRef: (editor: editor.IStandaloneCodeEditor) => void;
  setCssEditorRef: (editor: editor.IStandaloneCodeEditor) => void;
  setJsEditorRef: (editor: editor.IStandaloneCodeEditor) => void;
};

export type ScriptsStore = ScriptsState & ScriptsActions;

export const defaultInitState: ScriptsState = {
  html: "",
  css: "",
  js: "",
  logs: [],
  images: [],
  fontSize: 14,
  htmlEditorRef: { current: null },
  cssEditorRef: { current: null },
  jsEditorRef: { current: null },
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
        htmlSelection: defaultSekection,
        cssSelection: defaultSekection,
        jsSelection: defaultSekection,
        setHtmlSelection: (selection: Selection) =>
          set({ htmlSelection: selection }),
        setCssSelection: (selection: Selection) =>
          set({ cssSelection: selection }),
        setJsSelection: (selection: Selection) =>
          set({ jsSelection: selection }),
        contextSelected: [],
        setContextSelected: (contextSelected: ContextSelected[]) =>
          set({ contextSelected }),
        // images
        images: [],
        setImages: (images: string[]) => set({ images }),
        addImage: (image: string) =>
          set((state) => ({ images: [...state.images, image] })),

        setHtmlEditorRef: (editor: editor.IStandaloneCodeEditor) =>
          set((state) => ({ ...state, htmlEditorRef: { current: editor } })),
        setCssEditorRef: (editor: editor.IStandaloneCodeEditor) =>
          set((state) => ({ ...state, cssEditorRef: { current: editor } })),
        setJsEditorRef: (editor: editor.IStandaloneCodeEditor) =>
          set((state) => ({ ...state, jsEditorRef: { current: editor } })),
      }),
      {
        name: "tesseract-scripts",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          html: state.html,
          css: state.css,
          js: state.js,
          logs: state.logs,
          images: state.images,
        }),
      }
    )
  );
};
