"use client";
import { AppStore, makeStore } from "@/lib/states/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
