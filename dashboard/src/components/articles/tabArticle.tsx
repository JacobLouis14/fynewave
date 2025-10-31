"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  userRole: string;
  status?: string;
}

const ArticleStatustab = ({ children, status, userRole }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const isAdmin = userRole === "super_admin" || userRole === "admin";

  const tabs = ["published", "draft", "pending"];
  const adminTabs = ["scheduled", "deleted"];

  // handle tab select
  const handleTabSelect = (selectedTab: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedTab) {
      params.set("status", selectedTab);
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabSelect(tab)}
            className={`px-3 py-1 border text-xs rounded-md bg-white ${
              status === tab && "border-darkRed text-darkRed bg-darkRed/5"
            }`}
          >
            {tab}
          </button>
        ))}
        {/* role based buttons */}
        {isAdmin &&
          adminTabs.map((adminTab, index) => (
            <button
              key={index}
              onClick={() => handleTabSelect(adminTab)}
              className={`px-3 py-1 border text-xs rounded-md bg-white ${
                status === adminTab &&
                "border-darkRed text-darkRed bg-darkRed/5"
              }`}
            >
              {adminTab}
            </button>
          ))}
      </div>
      {children}
    </div>
  );
};

export default ArticleStatustab;
