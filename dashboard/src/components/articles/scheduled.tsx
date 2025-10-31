import { Article } from "@/models/article";
import {
  toReadableDate,
  toReadableDateTimeString,
} from "@/utils/toReadableDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReScheduledBtn from "./buttons/reScheduleBtn";
import DeleteArticleBtn from "./buttons/deleteArticleBtn";

interface Props {
  articles: Article[];
}

const ScheduledArticles = ({ articles }: Props) => {
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
            <div className="flex flex-col gap-3 py-2">
              <div className="flex flex-col gap-1">
                <h6 className="w-[23rem] overflow-hidden whitespace-nowrap text-ellipsis">
                  {article.title}
                </h6>
                <div className="flex gap-3 ">
                  <div className="flex gap-3 text-sm">
                    <p>Author:</p>
                    <p className="">{article.author.name}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p>Scheduled at:</p>
                    <p className="">
                      {toReadableDateTimeString(article.scheduledDate || "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={{
                  pathname: `/dashboard/articles/view/${article._id}`,
                }}
                className="px-3 py-1 border rounded-md bg-green-600 text-white text-center"
              >
                View
              </Link>
              <ReScheduledBtn articleId={article._id} />
              <DeleteArticleBtn articleId={article._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduledArticles;
