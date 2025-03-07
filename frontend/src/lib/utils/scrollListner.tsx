"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { scrolledToHomeInLandingPage } from "../states/features/appUiSlice";

function ScrollListner({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(false);
  const landingRef = useRef<HTMLDivElement>(null);

  // scroll handler for locking and navigation
  const handleScroll = () => {
    if (landingRef.current && !isLocked) {
      const landingHeight = landingRef.current.offsetHeight;
      if (window.scrollY >= landingHeight) {
        setIsLocked(true);
        dispatch(scrolledToHomeInLandingPage());
        window.history.pushState(window.history.state, "", "/home");
      }
    }
  };

  useEffect(() => {
    if (!isLocked) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLocked]);

  return (
    <div
      ref={landingRef}
      className={`${
        isLocked ? "hidden" : ""
      } relative text-white bg-gradient-to-b from-headerRedFrom to-headerRedTo min-h-screen lg:max-h-screen lg:h-full transition-opacity ease-in-out duration-1000`}
      // style={{
      //   backgroundImage: "linear-gradient(to bottom, #FC1736, #BA091D)",
      // }}
    >
      {children}
    </div>
  );
}

export default ScrollListner;
