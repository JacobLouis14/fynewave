"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const SubscribeBarController = ({ children }: Props) => {
  const [isSubscribeBarVisible, setIsSubscribeBarVisible] = useState(false);
  const isVisibleRef = useRef(isSubscribeBarVisible);

  // scroll handler
  const scrollHandler = useCallback(() => {
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const shouldShow = scrollTop + clientHeight >= scrollHeight / 2;

    // console.log(shouldShow);
    if (shouldShow !== isVisibleRef.current) {
      setIsSubscribeBarVisible(shouldShow);
      isVisibleRef.current = shouldShow;
    }
  }, [isVisibleRef.current]);

  useEffect(() => {
    const throtleHandler = () => {
      requestAnimationFrame(scrollHandler);
    };

    window.addEventListener("scroll", throtleHandler);

    return () => {
      window.removeEventListener("scroll", throtleHandler);
    };
  }, []);

  return isSubscribeBarVisible && children;
};

export default SubscribeBarController;
