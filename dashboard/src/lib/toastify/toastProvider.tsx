"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ToastProvider;
