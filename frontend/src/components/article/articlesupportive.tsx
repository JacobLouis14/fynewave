import React, { ReactNode } from "react";
import Horizontalsmallcard from "../common/h_smallcard";
import { ArticleModel } from "@/models/article";

interface Props {
  songsIframe: string[];
  videosIframe: string[];
  relatedPosts: ArticleModel[];
}

const Articlesupportive = ({
  songsIframe,
  videosIframe,
  relatedPosts,
}: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Sound & Music */}
      <div>
        <h2 className="font-raleway text-3xl font-medium lg:font-normal">
          Sound and Music
        </h2>
        {/* iframe container */}
        <div className="flex flex-col pt-3 gap-2">
          {songsIframe.map((frames, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: frames }} />
            </div>
          ))}
        </div>
      </div>
      {/* Video */}
      <div>
        <h2 className="font-raleway text-3xl font-medium lg:font-normal">
          Videos
        </h2>
        {/* iframe video container */}
        <div className="flex flex-col relative pt-3 gap-2 ">
          {videosIframe.map((vFrames, index) => (
            <div
              className="aspect-video"
              dangerouslySetInnerHTML={{ __html: vFrames }}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* Related Post */}
      <div className="flex flex-col gap-3">
        <h2 className="font-raleway text-3xl font-medium lg:font-normal">
          Related Post
        </h2>
        {/* cards */}
        {relatedPosts && relatedPosts.length > 0 ? (
          <div className="flex flex-col gap-2">
            {relatedPosts.map((relatedpost) => (
              <Horizontalsmallcard
                key={relatedpost._id}
                articleData={relatedpost}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">no related posts</p>
        )}
      </div>
    </div>
  );
};

export default Articlesupportive;
