"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
}

const SearchBar = ({ placeholder }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // handle Search
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <form className="flex gap-5 w-full flex-wrap sm:flex-nowrap">
      <input
        type="text"
        className="px-4 py-2 outline-none w-full rounded-lg border"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <button className="px-4 py-2 bg-darkRed text-white rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
