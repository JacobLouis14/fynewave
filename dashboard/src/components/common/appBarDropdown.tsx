"use client";
import { userRoleExtractor } from "@/utils/roleExtractor";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  sessionData: Session | null;
}

const AppBarDropdown = ({ sessionData }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  return (
    <div className="relative h-[30px]">
      <button
        className="w-full bg-white rounded-full"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#ba091d"
        >
          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="w-64 h-64 overflow-auto absolute top-8 right-0 border rounded-md bg-white z-20 flex flex-col gap-3 px-3 py-2 text-black">
          <div className="flex gap-2 items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col gap-1">
              <h6 className="text-sm break-words w-[140px]">
                {sessionData?.user.name}
              </h6>
              <h6 className="text-sm break-words w-[140px]">
                {sessionData?.user.email}
              </h6>
              <p className="text-sm break-words w-[140px]">
                {userRoleExtractor(sessionData?.user.role)}
              </p>
            </div>
          </div>
          <div className="border border-b w-full"></div>
          <div className="flex flex-col gap-2 items-start text-sm py-2">
            <Link
              href={"/dashboard/settings/update_profile"}
              className="border px-2 py-1 rounded-md bg-darkRed text-white"
            >
              Update profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppBarDropdown;
