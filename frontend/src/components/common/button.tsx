"use client";
import React from "react";

type Props = {
  title: String | React.ReactNode;
  clickHandler: Function;
  className?: string;
};

const Button = ({ title, clickHandler, className }: Props) => {
  return (
    <button className={className} onClick={() => clickHandler()}>
      {title}
    </button>
  );
};

export default Button;
