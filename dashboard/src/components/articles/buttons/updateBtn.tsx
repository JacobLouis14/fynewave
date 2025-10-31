import { updateArticle } from "@/actions/sActions";
import { Article, ArticleModel } from "@/models/article";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  articleData: ArticleModel;
  articleToUpdate?: Article | null;
}

const UpdateBtn = ({ articleData, articleToUpdate }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [updationLoading, setUpdationLoading] = useState(false);

  // update Handler
  const handleUpdate = async () => {
    if (!articleToUpdate) return;

    const {
      title,
      desc,
      articleContentOne,
      articleContentTwo,
      articleContentThree,
      banner,
      thumbnail,
      tags,
      author,
      category,
      songsIframes,
      videoIframes,
      alternativeTitle,
      articleContentImage,
      articleContentInstagram,
    } = articleData;
    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !banner ||
      !thumbnail ||
      !author ||
      !category
    ) {
      toast.warning("fill the forms completly");
      return;
    }

    // loading for updation
    setUpdationLoading(true);

    // if data available
    const articleFormData = new FormData();
    articleFormData.append("title", title);
    articleFormData.append("desc", desc);
    articleFormData.append("articleContentOne", articleContentOne);
    articleFormData.append("articleContentTwo", articleContentTwo);
    articleFormData.append("articleContentThree", articleContentThree);
    articleFormData.append("author", author);
    articleFormData.append("category", category);
    articleContentInstagram &&
      articleFormData.append(
        "articleContentInstagram",
        articleContentInstagram
      );
    articleContentImage &&
      articleFormData.append("articleContentImage", articleContentImage);
    alternativeTitle &&
      articleFormData.append("alternativeTitle", alternativeTitle);
    if (typeof banner === "string") {
      articleFormData.append("bannerUrl", banner);
    } else {
      articleFormData.append("banner", banner);
    }
    if (typeof thumbnail === "string") {
      articleFormData.append("thumbnailUrl", thumbnail);
    } else {
      articleFormData.append("thumbnail", thumbnail);
    }
    songsIframes?.map((sFrame) => {
      articleFormData.append("songsIframes", sFrame);
    });
    videoIframes?.map((vFrame) => {
      articleFormData.append("videoIframes", vFrame);
    });
    articleData?.tags.forEach((tag) => {
      articleFormData.append("tags", tag);
    });
    articleFormData.append("status", articleToUpdate.status);
    articleFormData.append("group", articleToUpdate.group);

    // update
    const { data, error } = await updateArticle(
      articleData._id || "",
      session.data?.user.token || "",
      articleFormData
    );

    if (error) {
      toast.error(`Error in updating Article`);
      setUpdationLoading(false);
      return;
    }
    if (data) {
      toast.success("sucessfully update article");
      setUpdationLoading(false);
      router.back();
      return;
    }
  };

  return (
    <button
      className={`py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:cursor-pointer disabled:bg-gray-400`}
      onClick={handleUpdate}
      disabled={updationLoading}
    >
      <h1 className="text-sm">Update</h1>
    </button>
  );
};

export default UpdateBtn;
