import React from "react";
import Horizontalcards from "../common/horizontalcards";
import { getLatestArticles } from "@/services/actions";

const Latestblogs = async () => {
  const { data: latestBlogData, error } = await getLatestArticles();

  if (error) {
    return <p>something went wrong</p>;
  }

  if (
    latestBlogData.latestArticles &&
    latestBlogData.latestArticles?.length < 1
  ) {
    return <p>No latest blogs</p>;
  }

  return (
    <div className="pb-10  px-3">
      <h2 className="text-center font-raleway font-semibold text-4xl">
        {/* Latest blogs */}Hot Takes
      </h2>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-8 md:px-5 gap-5">
        {latestBlogData.latestArticles?.map((latestBlogCard) => (
          <div key={latestBlogCard._id}>
            <Horizontalcards cardData={latestBlogCard} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latestblogs;
