// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type ScriptsStore,
  createScriptsStore,
  defaultInitState,
} from "@/stores/scripts";

export type ScriptsStoreApi = ReturnType<typeof createScriptsStore>;

export const ScriptsStoreContext = createContext<ScriptsStoreApi | undefined>(
  undefined
);

export interface ScriptsStoreProviderProps {
  children: ReactNode;
}

export const ScriptsStoreProvider = ({
  children,
}: ScriptsStoreProviderProps) => {
  const storeRef = useRef<ScriptsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createScriptsStore(defaultInitState);
  }

  return (
    <ScriptsStoreContext.Provider value={storeRef.current}>
      {children}
    </ScriptsStoreContext.Provider>
  );
};

export const useScriptsStore = <T,>(
  selector: (store: ScriptsStore) => T
): T => {
  const scriptsStoreContext = useContext(ScriptsStoreContext);

  if (!scriptsStoreContext) {
    throw new Error(`useScriptsStore must be used within ScriptsStoreProvider`);
  }

  return useStore(scriptsStoreContext, selector);
};
