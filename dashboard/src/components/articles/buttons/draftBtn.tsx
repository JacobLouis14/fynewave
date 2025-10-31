import { updateArticle } from "@/actions/sActions";
import { ArticleModel } from "@/models/article";
import { useSaveArticleAsDraftMutation } from "@/store/api";
import extractErrMsgFromRtk from "@/utils/extractErrorMsg";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  articleData: ArticleModel;
}

const DraftBtn = ({ articleData }: Props) => {
  const session = useSession();
  const [saveAsDraft, { isLoading }] = useSaveArticleAsDraftMutation();

  // draftHandler
  const handleDraft = async () => {
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
      group,
    } = articleData;
    if (
      !title ||
      !desc ||
      !articleContentOne ||
      !articleContentTwo ||
      !articleContentThree ||
      !group
    ) {
      toast.warning(
        "Title, description, article content 1,2,3 and group are required"
      );
      return;
    }

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
      banner && articleFormData.append("banner", banner);
    }
    if (typeof thumbnail === "string") {
      articleFormData.append("thumbnailUrl", thumbnail);
    } else {
      thumbnail && articleFormData.append("thumbnail", thumbnail);
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
    articleFormData.append("group", group);

    const { error, data } = await saveAsDraft({
      articleFormData: articleFormData,
      accessToken: session.data?.user.token || "",
    });

    if (error) {
      const errMsg = extractErrMsgFromRtk(error);
      console.log(error);
      toast.error(`Error in adding Article.${errMsg}`);
      return;
    }
    if (data) {
      toast.success("sucessfully added new article");
      return;
    }
  };

  return (
    <button
      className={`py-2 border-2 border-darkRed text-darkRed rounded-lg flex items-center justify-center hover:cursor-pointer disabled:border-gray-400`}
      onClick={handleDraft}
      disabled={isLoading}
    >
      <h1 className="text-sm">Save Draft</h1>
    </button>
  );
};

export default DraftBtn;
