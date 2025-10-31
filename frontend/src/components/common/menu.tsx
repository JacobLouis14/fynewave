import { ChevronRight, Close, MusicNote } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

interface Props {
  closeHandler: () => void;
  show: boolean;
}

const Menu = ({ closeHandler, show }: Props) => {
  const menus = [
    {
      label: "Artists",
      link: "",
      icon: <MusicNote />,
    },
    {
      label: "DJs",
      link: "",
      icon: <MusicNote />,
    },
    {
      label: "Songs",
      link: "",
      icon: <MusicNote />,
    },
    {
      label: "Events",
      link: "",
      icon: <MusicNote />,
    },
    {
      label: "Blogs",
      link: "",
      icon: <MusicNote />,
    },
    {
      label: "About us",
      link: "/about",
      icon: <MusicNote />,
    },
    {
      label: "Contact us",
      link: "/contact",
      icon: <MusicNote />,
    },
  ];

  return (
    <div
      className={`fixed right-0 top-0 z-30 h-full w-52 lg:w-2/12 bg-black/80 flex flex-col gap-3 px-3 py-5 
    transform transition-transform duration-300 ease-in-out
     ${show ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex">
        <button onClick={closeHandler}>
          <Close />
        </button>
      </div>
      <div className="flex flex-col gap-3 text-white py-5 overflow-y-scroll">
        {menus.map((menu, index) => (
          <Link
            href={menu.link}
            key={index}
            className="text-xl flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              {menu.icon}
              {menu.label}
            </div>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
