import { fetchArticles } from "@/actions/action";
import React from "react";
import LoadingArticles from "./loadingArticles";
import InfiniteSpinner from "../common/infiniteSpinner";

interface Props {
  search?: string;
}

const TableCards = async ({ search }: Props) => {
  const { articles, error, isLoading } = await fetchArticles(1, search);

  // is loading
  if (isLoading) {
    return (
      <div className="w-full">
        <InfiniteSpinner />
      </div>
    );
  }

  // is error
  if (error) {
    return (
      <div className="w-full">
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-rows-1 grid-cols-1 gap-2 pb-2 overflow-x-auto w-full ">
        {/* {articles} */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Image</th>
              <th>title</th>
              <th>songs of the week</th>
              <th>artist of the week</th>
              <th>Dj of the week</th>
              <th>Landing card</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>{articles}</tbody>
        </table>
      </div>
      {articles && articles.length >= 10 && <LoadingArticles />}
    </>
  );
};

export default TableCards;
