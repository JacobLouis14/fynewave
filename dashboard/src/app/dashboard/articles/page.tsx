import SearchBar from "@/components/articles/searchBar";
import TableCards from "@/components/articles/tableCards";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    search?: string;
  };
}

const Articles = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  // redirection if no user login
  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col min-h-screen w-full md:px-6 px-3 py-8">
      {/* header */}
      <div className="flex gap-4 flex-wrap pb-10">
        <div className="md:w-3/4 w-full">
          <SearchBar placeholder="search" />
        </div>
        <div>
          <Link href={"/dashboard/articles/create-new-article"}>
            <button className="px-3 py-2 text-darkRed border rounded-lg border-darkRed hover:border-2">
              New Article
            </button>
          </Link>
        </div>
      </div>
      {/* cards */}
      <TableCards search={searchParams.search} />
    </div>
  );
};

export default Articles;
