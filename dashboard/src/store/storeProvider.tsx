"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
