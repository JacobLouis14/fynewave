import { fetchArticles } from "@/actions/action";
import React from "react";
import Link from "next/link";
import PublishedArticle from "./published";
import DraftArticles from "./draft";
import PendingArticles from "./pending";
import ScheduledArticles from "./scheduled";
import DeletedArticles from "./deleted";
import UserPublisedView from "./userPublished";

interface Props {
  search?: string;
  currentPage: number;
  status: string;
  token: string;
  authRole: string;
}

const TableWrapper = async ({
  search,
  currentPage,
  status,
  token,
  authRole,
}: Props) => {
  const { articles, error } = await fetchArticles(
    token,
    currentPage,
    status,
    search
  );
  const isAdmin = authRole === "super_admin" || authRole === "admin";

  // is error
  if (error) {
    console.log(`error in fetching articles: ${error}`);

    return (
      <div className="w-full">
        <p>Something went wrong</p>
      </div>
    );
  }

  const tableBasedStatus = () => {
    switch (status) {
      case "published":
        return isAdmin ? (
          <PublishedArticle articles={articles} />
        ) : (
          <UserPublisedView articles={articles} />
        );
      case "draft":
        return <DraftArticles articles={articles} />;
      case "pending":
        return <PendingArticles articles={articles} />;
      case "scheduled":
        return <ScheduledArticles articles={articles} />;
      case "deleted":
        return <DeletedArticles articles={articles} />;

      default:
        return <PublishedArticle articles={articles} />;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Table */}
      {tableBasedStatus()}

      {/* pagination */}
      <div className="flex justify-end items-center flex-grow gap-3">
        <Link href={`?page=${Math.max(currentPage - 1, 1)}`}>
          <button
            disabled={currentPage === 1}
            className="px-5 py-1 rounded-md bg-darkRed text-white"
          >
            prev
          </button>
        </Link>
        <Link href={`?page=${Math.max(currentPage + 1)}`}>
          <button
            disabled={articles.length < 10}
            className="px-5 py-1 rounded-md bg-darkRed text-white"
          >
            next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TableWrapper;
