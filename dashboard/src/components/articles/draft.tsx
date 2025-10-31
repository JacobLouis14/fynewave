import { Article } from "@/models/article";
import React from "react";
import Image from "next/image";
import { toReadableDate } from "@/utils/toReadableDate";
import Link from "next/link";

interface Props {
  articles: Article[];
}

const DraftArticles = ({ articles }: Props) => {
  return (
    <div className="h-[65vh] grid grid-cols-2 gap-2 overflow-auto">
      {articles.map((article) => (
        <div
          key={article._id}
          className="relative flex gap-3 w-full bg-slate-100 h-32 rounded-sm"
        >
          <div className="relative h-full aspect-square">
            <Image
              alt="tumbnail"
              src={article.thumbnailUrl || ""}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-evenly gap-3 py-2">
            <div className="flex flex-col gap-1">
              <h6 className="w-[23rem] overflow-hidden whitespace-nowrap text-ellipsis">
                {article.title}
              </h6>
              <div className="flex gap-3">
                <div className="flex gap-3 text-sm">
                  <p>Date:</p>
                  <p className="">{toReadableDate(article.createdAt || "")}</p>
                </div>
              </div>
            </div>
            <Link
              href={`/dashboard/articles/edit-article?query=${article._id}`}
              className="px-2 py-1 bg-blue-700 text-white rounded-md w-fit"
            >
              Continue
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraftArticles;
