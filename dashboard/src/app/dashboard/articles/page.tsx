import SearchBar from "@/components/articles/searchBar";
import ArticleStatustab from "@/components/articles/tabArticle";
import TableWrapper from "@/components/articles/tableWrapper";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    search?: string;
    page?: string;
    status?: string;
  };
}

const Articles = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  const currentPage = Number(searchParams.page || 1);

  // redirection if no user login
  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col gap-4 w-full md:px-6 px-3 pt-4 pb-2 h-dvh">
      {/* header */}
      <div className="flex gap-4 flex-wrap">
        <div className="md:w-3/4 w-full">
          <SearchBar placeholder="search" />
        </div>
        <div>
          <Link href={"/dashboard/articles/create-new-article"}>
            <button className="px-3 py-1 text-darkRed border-2 border-darkRed/20 rounded-lg box-border hover:border-darkRed transition-colors">
              New Article
            </button>
          </Link>
        </div>
      </div>
      {/* cards */}
      <ArticleStatustab
        userRole={session.user.role}
        status={searchParams.status}
      >
        <TableWrapper
          currentPage={currentPage}
          search={searchParams.search}
          status={searchParams.status || "published"}
          token={session.user.token}
          authRole={session.user.role}
        />
      </ArticleStatustab>
    </div>
  );
};

export default Articles;
