"use client";
import Sidebarlist from "@/components/common/sidebarlist";
import {
  closeSideBar,
  openSideBar,
  sideBarCollapsed,
} from "@/store/fetures/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { userRoleExtractor } from "@/utils/roleExtractor";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();

  // redirection if no user login
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) redirect("/");
  }, [session, status]);

  const dispatch = useAppDispatch();
  const sideBarCollapsedValue = useAppSelector(sideBarCollapsed);

  //   sidebar open Handler
  const handlerSideBarOpen = () => {
    dispatch(openSideBar());
  };

  //   sidebar close handler
  const handlersidebarClose = () => {
    dispatch(closeSideBar());
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* side bar */}
      <div
        className={`w-screen h-screen border fixed top-0 ${
          sideBarCollapsedValue ? "-left-full" : "left-0"
        } md:left-0 md:w-[16rem]  bg-inherit flex flex-col p-3 z-50`}
      >
        {/* sidebar header */}
        <div className="flex">
          <p>Logo</p>
          <button onClick={handlersidebarClose} className="ms-auto md:hidden">
            close
          </button>
        </div>
        {/* sidebar content */}
        <Sidebarlist />
      </div>
      {/* Right side */}
      <div className="md:ms-[16rem] w-full">
        {/* appbar */}
        <div className="flex px-5 py-3 pt-5 bg-darkRed text-white">
          <div className="md:hidden">
            <button onClick={handlerSideBarOpen}>
              <svg
                className="w-8 h-fit fill-white"
                viewBox="0 0 30 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 20V16.6667H30V20H0ZM0 11.6667V8.33333H30V11.6667H0ZM0 3.33333V0H30V3.33333H0Z" />
              </svg>
            </button>
          </div>
          <div className="ms-auto">
            {session && userRoleExtractor(session?.user?.role)}
          </div>
        </div>
        {/* contents */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
