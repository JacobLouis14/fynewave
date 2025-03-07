"use client";

import { newsletterSubscribeModalOpenHandler } from "@/lib/states/features/appUiSlice";
import { useAppDispatch } from "@/lib/states/statehooks";
import React from "react";

type Props = {
  title: String | React.ReactNode;
  className?: string;
};

const NewsSubscribebtn = ({ title, className }: Props) => {
  const dispatch = useAppDispatch();

  // click Handler
  const btnClickHandler = () => {
    dispatch(newsletterSubscribeModalOpenHandler());
    document.body.style.overflow = "hidden";
  };

  return (
    <button className={className} onClick={btnClickHandler}>
      {title}
    </button>
  );
};

export default NewsSubscribebtn;
