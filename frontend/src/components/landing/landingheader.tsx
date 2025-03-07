"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Landingheader = () => {
  return (
    <nav className="flex items-center px-3 md:px-10 py-5 lg:pt-10 text-white">
      <a
        href={"/"}
        className="hover:cursor-pointer relative w-2/6 aspect-[1/0.3] md:w-64 md:h-16"
      >
        <Image src="/logo_v1.png" alt="logo" fill sizes="100%,100%" />
      </a>
      <div className="ms-auto flex items-center gap-3 md:gap-10">
        {/* home svg */}
        <Link href={"/home"} className="cursor-pointer">
          <button className="hidden md:inline-block">
            <svg
              width="28"
              height="30"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 28.3334V15H18V28.3334M2 11L14 1.66669L26 11V25.6667C26 26.3739 25.719 27.0522 25.219 27.5523C24.7189 28.0524 24.0406 28.3334 23.3333 28.3334H4.66667C3.95942 28.3334 3.28115 28.0524 2.78105 27.5523C2.28095 27.0522 2 26.3739 2 25.6667V11Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
        {/* search svg */}
        {/* <button>
          <svg
            className="w-8 h-8 md:w-[40px] md:h-[40px]"
            viewBox="0 0 35 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.625 31.125L24.2812 24.7812M27.7083 16.5417C27.7083 22.985 22.485 28.2083 16.0417 28.2083C9.59834 28.2083 4.375 22.985 4.375 16.5417C4.375 10.0983 9.59834 4.875 16.0417 4.875C22.485 4.875 27.7083 10.0983 27.7083 16.5417Z"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
        {/* menu svg */}
        {/* <button>
          <svg
            className="w-8 h-8 md:w-[50px] md:h-[50px]"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 37.5V33.3333H43.75V37.5H6.25ZM6.25 27.0833V22.9167H43.75V27.0833H6.25ZM6.25 16.6667V12.5H43.75V16.6667H6.25Z"
              fill="white"
            />
          </svg>
        </button> */}
      </div>
    </nav>
  );
};

export default Landingheader;
