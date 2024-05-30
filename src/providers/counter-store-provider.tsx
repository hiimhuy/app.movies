"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import { type CounterStore, createCounterStore } from "../stores/counter-store";

// Tạo context cho store
export const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(null);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

// Tạo Provider cho store
export const CounterStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CounterStore>>();
  if (!storeRef.current) {
    storeRef.current = createCounterStore();
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

// Hook để sử dụng store trong component
export const useCounterStore = <T,>(selector: (store: CounterStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
