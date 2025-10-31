import { Article } from "@/models/article";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteArticleBtn from "./buttons/deleteArticleBtn";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { toReadableDate } from "@/utils/toReadableDate";

interface Props {
  articles: Article[];
}

const PendingArticles = async ({ articles }: Props) => {
  const session = await getServerSession(authOptions);
  const isAdmin =
    session?.user.role === "super_admin" || session?.user.role === "admin";
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
            {isAdmin && (
              <div className="flex gap-2">
                <Link
                  href={{
                    pathname: `/dashboard/articles/${article._id}`,
                  }}
                  className="px-3 py-1 border rounded-md bg-green-600 text-white text-center"
                >
                  View
                </Link>
                <Link
                  href={{
                    pathname: "/dashboard/articles/edit-article",
                    query: { query: article._id },
                  }}
                  className="px-4 py-1 bg-blue-600 text-white rounded-md text-center"
                >
                  Edit
                </Link>
                <DeleteArticleBtn articleId={article._id} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingArticles;
