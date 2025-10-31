import { Article } from "@/models/article";
import React from "react";
import Image from "next/image";
import { toReadableDate } from "@/utils/toReadableDate";
import PublishTableMoreButton from "./buttons/publishTableMoreBtn";
import Link from "next/link";

interface Props {
  articles: Article[];
}

const PublishedArticle = ({ articles }: Props) => {
  return (
    <div className="h-[65vh] grid grid-cols-2 gap-2 overflow-auto">
      {articles.map((article) => (
        <div
          key={article._id}
          className="relative bg-slate-100 h-32 rounded-sm"
        >
          <Link
            href={`/dashboard/articles/view/${article._id}`}
            className="relative h-32 flex gap-3 w-full"
          >
            <div className="relative h-full aspect-square">
              <Image
                alt="tumbnail"
                src={article.thumbnailUrl || ""}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex flex-col gap-1">
                <h6 className="w-[23rem] overflow-hidden whitespace-nowrap text-ellipsis">
                  {article.title}
                </h6>
                <div className="flex gap-3">
                  <div className="flex gap-3 text-sm">
                    <p>Author:</p>
                    <p className="">{article.author.name}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p>Date:</p>
                    <p className="">
                      {toReadableDate(article.createdAt || "")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 text-sm">
                {article.isLandingCard && (
                  <p className="px-1 py-0.5 w-fit rounded-sm bg-white text-darkRed">
                    landing card
                  </p>
                )}
                {article.isSongOfTheWeek && (
                  <p className="px-1 py-0.5 w-fit rounded-sm bg-white text-darkRed">
                    Featured songs
                  </p>
                )}
                {article.isArtistOfTheWeek && (
                  <p className="px-1 py-0.5 w-fit rounded-sm bg-white text-darkRed">
                    Check them out
                  </p>
                )}
                {article.isDjOfTheWeek && (
                  <p className="px-1 py-0.5 w-fit rounded-sm bg-white text-darkRed">
                    On the spotlight
                  </p>
                )}
              </div>
            </div>
          </Link>
          <div className="absolute top-0 right-2">
            <PublishTableMoreButton
              articleId={article._id}
              isArtistOfTheWeek={article.isArtistOfTheWeek}
              isDjOfTheWeek={article.isDjOfTheWeek}
              isSongOfTheWeek={article.isSongOfTheWeek}
              isLandingCard={article.isLandingCard}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublishedArticle;
