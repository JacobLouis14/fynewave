import { ArticleModel } from "@/models/article";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteArticleBtn from "./deleteArticleBtn";
import ArticleToggleBtn from "./articleToggleBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

interface Props {
  articleData: Partial<ArticleModel>;
}

const ArticlesRow = async ({ articleData }: Props) => {
  const session = await getServerSession(authOptions);
  const editAllotedArticle = session?.user.editAllotedArticle;

  return (
    <tr>
      <td className="w-32 bg-gray-200">
        <div className="w-32 aspect-square relative">
          <Image
            src={
              articleData.thumbnailUrl &&
              typeof articleData.thumbnailUrl === "string"
                ? articleData.thumbnailUrl
                : "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
            }
            alt="Article Image"
            fill
            sizes="100%,100%"
            className="object-cover"
          />
        </div>
      </td>
      <td className="flex flex-wrap w-60 pl-2 max-h-32 overflow-y-scroll">
        <p className="w-full">{articleData?.title}</p>
      </td>
      <td className="text-center">
        <ArticleToggleBtn
          articleId={articleData._id || ""}
          isSongOfTheWeek={articleData?.isSongOfTheWeek}
          name="song-of-the-week"
        />
      </td>
      <td className="text-center">
        <ArticleToggleBtn
          articleId={articleData._id || ""}
          isArtistOfTheWeek={articleData.isArtistOfTheWeek}
          name="artist-of-the-week"
        />
      </td>
      <td className="text-center">
        <ArticleToggleBtn
          articleId={articleData._id || ""}
          isDjOfTheWeek={articleData.isDjOfTheWeek}
          name="dj-of-the-week"
        />
      </td>
      <td className="text-center">
        <ArticleToggleBtn
          articleId={articleData._id || ""}
          isLandingCard={articleData.isLandingCard}
          name="landing-card"
        />
      </td>
      <td className="flex flex-col gap-3 px-4">
        {session?.user.role === 1 ? (
          editAllotedArticle &&
          editAllotedArticle.includes(articleData._id || "") ? (
            <Link
              href={{
                pathname: "/dashboard/articles/edit-article",
                query: { query: articleData._id },
              }}
            >
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg">
                Edit
              </button>
            </Link>
          ) : (
            <p className="text-center">No permission to edit</p>
          )
        ) : (
          <Link
            href={{
              pathname: "/dashboard/articles/edit-article",
              query: { query: articleData._id },
            }}
          >
            <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg">
              Edit
            </button>
          </Link>
        )}
        <DeleteArticleBtn articleId={articleData?._id} />
      </td>
    </tr>
  );
};

export default ArticlesRow;
