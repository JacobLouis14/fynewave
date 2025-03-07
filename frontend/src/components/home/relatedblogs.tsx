import React from "react";
import Horizontalsmallcard from "../common/h_smallcard";
import { getOtherArticles } from "@/services/actions";

const Relatedblogs = async () => {
  const { data: otherBlogData, error } = await getOtherArticles();

  if (error) {
    return <p>something went wrong</p>;
  }

  if (
    otherBlogData.otherBlogsData &&
    otherBlogData.otherBlogsData?.length < 1
  ) {
    return <p>No latest blogs</p>;
  }

  return (
    <div className="pb-10  px-3">
      <h2 className="text-center font-raleway font-medium text-4xl">
        {/* Other Blogs */}More For You
      </h2>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 pt-8 md:px-5 gap-5">
        {otherBlogData.otherBlogsData?.map((otherArticle) => (
          <Horizontalsmallcard
            key={otherArticle._id}
            articleData={otherArticle}
          />
        ))}
      </div>
    </div>
  );
};

export default Relatedblogs;
