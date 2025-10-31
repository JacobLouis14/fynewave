"use client";
import React, { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

const IDLE_TIMEOUT = 20 * 60 * 1000;

const useIdleLogout = () => {
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      signOut({ redirect: true, callbackUrl: "/" });
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];

    const handleUserActivity = () => resetTimer();

    activityEvents.forEach((event) =>
      window.addEventListener(event, handleUserActivity)
    );

    resetTimer();

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleUserActivity)
      );
    };
  }, []);
};

export default useIdleLogout;
