"use client";
import React, { useRef } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  children: React.ReactNode;
}

const CardCorousel = ({ children }: Props) => {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // prev Button card Handler
  const prevButtonHandler = (): void => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: -270, behavior: "smooth" });
    }
  };

  // next Button card Handler
  const nextButtonHandler = (): void => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: +270, behavior: "smooth" });
    }
  };
  return (
    <div className="flex relative">
      <button
        className="absolute z-20 top-1/2 left-0 lg:left-12 -translate-y-1/2 p-3 bg-[#D9D9D999] rounded-md shadow-md"
        onClick={prevButtonHandler}
      >
        <ArrowBackIosNewIcon />
      </button>
      <button
        className="absolute z-20 top-1/2 right-0 lg:right-12 -translate-y-1/2 p-3 bg-[#D9D9D999] rounded-md shadow-md"
        onClick={nextButtonHandler}
      >
        <ArrowForwardIosIcon />
      </button>
      <div
        ref={cardContainerRef}
        className="flex lg:px-16 overflow-x-scroll md:overflow-x-hidden overflow-hidden gap-4 pt-8"
      >
        {children}
      </div>
    </div>
  );
};

export default CardCorousel;
