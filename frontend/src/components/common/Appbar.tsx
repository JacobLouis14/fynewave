import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Link from "next/link";
import Subscribemodal from "../newsletter/subscribemodal";
import NewsSubscribebtn from "../newsletter/newsSubscribebtn";
import Image from "next/image";

const Appbar = () => {
  return (
    <nav className="flex items-center py-5 px-3 md:px-6 bg-gradient-to-r from-headerRedFrom to-headerRedTo text-white shadow-xl">
      {/* logo */}
      <a href="/" className="relative w-2/6 aspect-[1/0.3] md:w-52 md:h-10">
        <Image src="/logo.png" alt="logo" fill sizes="100%,100%" />
      </a>
      {/* search container */}
      <div className="ms-auto flex w-2/3">
        <input
          type="text"
          className="w-full outline-none bg-transparent py-3 ps-3 hover:bg-headerRedTo rounded-lg placeholder:text-white placeholder:opacity-55"
          placeholder="Search your songs by name, genere, artist etc..."
        />
        <button className="hover:bg-headerRedTo py-2 px-3 rounded-full">
          <SearchIcon />
        </button>
      </div>
      {/* menu */}
      <div className="ms-auto flex justify-between items-center lg:pe-5">
        <NewsSubscribebtn
          className="me-4 font-poppins bg-white py-3 px-4 rounded-full text-headerRedTo hidden lg:inline-block"
          title={
            <div>
              <SendOutlinedIcon className="me-3" />
              SUBSCRIBE NOW
            </div>
          }
        />
        {/* <button>
          <MenuIcon className="text-4xl" />
        </button> */}
      </div>
      {/* subscribe modal */}
      <Subscribemodal />
    </nav>
  );
};

export default Appbar;
