"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import {
  closeSideBar,
  openSideBar,
  sideBarCollapsed,
} from "@/store/fetures/uiSlice";
import useIdleLogout from "@/hooks/useIdleLogout";
import { Session } from "next-auth";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

const SidebarWrapper = ({ children, session }: Props) => {
  const dispatch = useAppDispatch();
  const sideBarCollapsedValue = useAppSelector(sideBarCollapsed);

  // logout when user is idle => hook
  useIdleLogout();

  //   sidebar close handler
  const handlersidebarClose = () => {
    dispatch(closeSideBar());
  };

  // sidebar open scroll disabled
  useEffect(() => {
    if (!sideBarCollapsedValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    () => {
      document.body.style.overflow = "auto";
    };
  }, [sideBarCollapsedValue]);

  return (
    <div
      className={`w-60 h-screen border-r fixed top-0 ${
        sideBarCollapsedValue ? "-left-full md:left-0" : "left-0"
      } md:w-[16rem]  bg-inherit flex flex-col z-50`}
    >
      {/* sidebar header */}
      <div className="flex gap-3 bg-darkRed px-4 py-[11px] lg:px-4 md:py-0">
        <div className="h-[8vh]">
          <Image src={"/logo_v1.png"} alt="logo" width={500} height={300} />
        </div>
        <button onClick={handlersidebarClose} className="ms-auto md:hidden">
          close
        </button>
      </div>
      {children}
    </div>
  );
};

export default SidebarWrapper;
