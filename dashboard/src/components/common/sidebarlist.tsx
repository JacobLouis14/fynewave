"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoutBtn from "./logoutBtn";

interface SidebarMenuList {
  title: string;
  link: string;
  roles: string[];
}

interface Props {
  sidebarCloseHandler?: Function;
  userRole: string;
}

const Sidebarlist = ({ userRole }: Props) => {
  const pathname = usePathname();
  const menuListData: SidebarMenuList[] = [
    { title: "Dashboard", link: "/dashboard", roles: ["super_admin", "admin"] },
    {
      title: "Articles",
      link: "/dashboard/articles?status=published",
      roles: ["super_admin", "admin", "content_writer"],
    },
    {
      title: "Categories",
      link: "/dashboard/categories",
      roles: ["super_admin", "admin"],
    },
    {
      title: "Users",
      link: "/dashboard/users",
      roles: ["super_admin", "admin"],
    },
    { title: "Emails", link: "/dashboard/emails", roles: ["super_admin"] },
  ];

  const roleBasedMenu = menuListData.filter((menu) =>
    menu.roles.includes(userRole)
  );

  const isMenuSelected = (menu: string) => {
    const menuInSmallcase = menu.toLowerCase();
    const splitedPathname = pathname.split("/");

    const selectedMenu = splitedPathname[2] || splitedPathname[1];

    return menuInSmallcase === selectedMenu;
  };

  return (
    <div className="flex flex-col items-center h-full md:justify-between pt-6 pb-3 px-3 gap-5">
      <ul className="flex flex-col gap-3 w-2/3 md:w-full">
        {roleBasedMenu.map((list, index) => (
          <Link href={list.link} key={index}>
            <li
              className={`${
                isMenuSelected(list.title)
                  ? "bg-darkRed text-white"
                  : "bg-gray-200"
              } px-3 py-2 rounded-lg hover:bg-darkRed hover:text-white hover:cursor-pointer`}
            >
              {list.title}
            </li>
          </Link>
        ))}
      </ul>
      <LogoutBtn />
    </div>
  );
};

export default Sidebarlist;
