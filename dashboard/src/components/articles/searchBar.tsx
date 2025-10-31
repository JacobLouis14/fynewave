"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
}

const SearchBar = ({ placeholder }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search")?.toString() || ""
  );

  // handle Search
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <form className="flex gap-5 w-full flex-wrap sm:flex-nowrap">
      <input
        type="text"
        className="px-4 py-1 outline-none w-full rounded-lg border"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-1 bg-darkRed text-white rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
