"use client";
import React from "react";

type Props = {
  className: string;
  placeholder: string;
  type: string;
};

const Modalinputfield = ({ className, placeholder, type }: Props) => {
  return <input type={type} className={className} placeholder={placeholder} />;
};

export default Modalinputfield;
