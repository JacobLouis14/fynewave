"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarMenuList {
  title: string;
  link: string;
}

interface Props {
  sidebarCloseHandler?: Function;
}

const Sidebarlist = ({ sidebarCloseHandler }: Props) => {
  const pathname = usePathname();
  const menuListData: SidebarMenuList[] = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Articles", link: "/dashboard/articles" },
    { title: "Categories", link: "/dashboard/categories" },
    { title: "Users", link: "/dashboard/users" },
    { title: "Emails", link: "/dashboard/emails" },
  ];

  const selectedMenuIndex = menuListData.findIndex(
    (menu) => menu.link === pathname
  );

  // logout handler
  const handlerLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center h-full md:justify-between pt-20 gap-5">
      <ul className="flex flex-col gap-3 w-2/3 md:w-full">
        {menuListData.map((list, index) => (
          <Link href={list.link} key={index}>
            <li
              className={`${
                selectedMenuIndex === index
                  ? "bg-darkRed text-white"
                  : "bg-gray-200"
              } px-3 py-2 rounded-lg hover:bg-darkRed hover:text-white hover:cursor-pointer`}
            >
              {list.title}
            </li>
          </Link>
        ))}
      </ul>
      <button
        onClick={handlerLogout}
        className="px-3 py-2 mt-16 md:mt-0 bg-gray-200 rounded-lg w-2/3 md:w-full hover:bg-darkRed hover:text-white text-start"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebarlist;
