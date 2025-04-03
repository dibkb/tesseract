// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

export type ScriptsState = {
  html: string;
  css: string;
  js: string;
};

export type ScriptsActions = {
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setJs: (js: string) => void;
};

export type ScriptsStore = ScriptsState & ScriptsActions;

export const defaultInitState: ScriptsState = {
  html: "",
  css: "",
  js: "",
};

export const createScriptsStore = (
  initState: ScriptsState = defaultInitState
) => {
  return createStore<ScriptsStore>()((set) => ({
    ...initState,
    setHtml: (html: string) => set({ html }),
    setCss: (css: string) => set({ css }),
    setJs: (js: string) => set({ js }),
  }));
};
