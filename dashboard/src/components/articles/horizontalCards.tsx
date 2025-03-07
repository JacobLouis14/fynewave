import { ArticleModel } from "@/models/article";
import { toReadableDate } from "@/utils/toReadableDate";
import Image from "next/image";
import Link from "next/link";
import DeleteArticleBtn from "./deleteArticleBtn";

interface Props {
  articleData: Partial<ArticleModel>;
}

const HorizontalCards = ({ articleData }: Props) => {
  return (
    <div className="border flex min-h-40">
      {/* imges */}
      <div className="relative w-1/3 aspect-square">
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
      {/* content */}
      <div className="py-4 flex flex-col justify-between w-2/3 px-2">
        <div className="max-w-full">
          <h1 className="text-2xl font-medium line-clamp-2 md:line-clamp-3 break-words">
            {articleData?.title}
          </h1>
        </div>
        {/* footer */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between flex-wrap">
            <div>{articleData.author ? articleData.author : "Author Name"}</div>
            <div>
              {articleData.createdAt
                ? toReadableDate(articleData.createdAt)
                : "Date"}
            </div>
          </div>
          {/* buttons */}
          <div className="flex gap-2 justify-between flex-wrap">
            <Link
              href={{
                pathname: "/dashboard/articles/edit-article",
                query: { query: articleData._id },
              }}
            >
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">
                Edit
              </button>
            </Link>
            <DeleteArticleBtn articleId={articleData?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;
