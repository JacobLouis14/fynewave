"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Link from "next/link";
import Subscribemodal from "../newsletter/subscribemodal";
import NewsSubscribebtn from "../newsletter/newsSubscribebtn";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Menu from "./menu";

const Appbar = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query")?.toString() || ""
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // menu open handler
  const handleMenuOpen = () => setIsMenuOpen(true);

  // menu close handler
  const handleMenuClose = () => setIsMenuOpen(false);

  // taking search values
  const searchValueHandler = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      const params = new URLSearchParams(searchParams);
      params.delete("query");
    }
  };

  // search handler
  const handleSearch = () => {
    const term = searchTerm;
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    push(`/search?${params.toString()}`);
  };

  return (
    <nav className="flex items-center gap-5 md:py-5 px-3 md:px-6 bg-gradient-to-r from-headerRedFrom to-headerRedTo text-white shadow-xl">
      {/* logo */}
      <a href="/" className="relative w-2/6 aspect-[1/0.3] md:w-52 md:h-10">
        <Image src="/logo.png" alt="logo" fill sizes="100%,100%" />
      </a>
      {/* search container */}
      <div className="ms-auto flex gap-3 w-2/3">
        <input
          type="text"
          className="w-full outline-none bg-transparent py-3 ps-3 hover:bg-headerRedTo rounded-lg placeholder:text-white placeholder:opacity-55"
          placeholder="Search your songs by name, genere, artist etc..."
          value={searchTerm}
          onChange={(e) => searchValueHandler(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="hover:bg-headerRedTo py-2 px-3 rounded-full"
        >
          <SearchIcon />
        </button>
      </div>
      {/* menu */}
      <div className="ms-auto flex justify-between items-center lg:pe-5">
        <NewsSubscribebtn
          className="me-4 font-poppins bg-white py-3 px-4 rounded-full text-headerRedTo hidden lg:inline-block"
          title={
            <div className="flex items-center gap-2">
              <SendOutlinedIcon />
              <p className="text-sm inline-block whitespace-nowrap">
                SUBSCRIBE NOW
              </p>
            </div>
          }
        />
        <button onClick={handleMenuOpen}>
          <MenuIcon className="text-4xl" />
        </button>
      </div>
      <Menu closeHandler={handleMenuClose} show={isMenuOpen} />
      {/* subscribe modal */}
      <Subscribemodal />
    </nav>
  );
};

export default Appbar;
