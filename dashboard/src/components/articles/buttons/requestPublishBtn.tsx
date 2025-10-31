import { updateArticle } from "@/actions/sActions";
import { Article, ArticleModel } from "@/models/article";
import { useAddNewArticleApiMutation } from "@/store/api";
import extractErrMsgFromRtk from "@/utils/extractErrorMsg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  articleData: ArticleModel;
  articleToUpdate?: Article | null;
}

const RequestPublishBtn = ({ articleData, articleToUpdate }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isDraft = articleData.status === "draft";
  const [addNewArticle, { isLoading: newArticleLoading }] =
    useAddNewArticleApiMutation();

  // update Handler
  const handleUpdate = async (statusValue: string) => {
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
      group,
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
      !category ||
      !group
    ) {
      toast.warning("fill the forms completly");
      return;
    }

    // loading for updation
    setIsLoading(true);

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
    articleFormData.append("status", statusValue);
    articleFormData.append("group", articleData.group);

    // update
    const { data, error } = await updateArticle(
      articleData._id || "",
      session.data?.user.token || "",
      articleFormData
    );

    if (error) {
      toast.error(`Error in submitting Article`);
      setIsLoading(false);
      return;
    }
    if (data) {
      toast.success("sucessfully submited article");
      setIsLoading(false);
      return;
    }
  };

  // publish Handler
  const handlePublish = async (statusValue: string) => {
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
      !banner ||
      !thumbnail ||
      !author ||
      tags.length === 0 ||
      !category ||
      !statusValue ||
      !group
    ) {
      toast.warning("fill the forms completly");
      return;
    }

    // if data available
    const articleFormData = new FormData();
    articleFormData.append("title", title);
    articleFormData.append("desc", desc);
    articleFormData.append("articleContentOne", articleContentOne);
    articleFormData.append("articleContentTwo", articleContentTwo);
    articleFormData.append("articleContentThree", articleContentThree);
    articleFormData.append("author", session.data?.user.id || "");
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
    articleFormData.append("status", statusValue);
    articleFormData.append("group", group);
    articleFormData.append("publishedAt", `${new Date()}`);

    // for publish
    const { error, data } = await addNewArticle({
      articleFormData: articleFormData,
      accessToken: session.data?.user.token || "",
    });

    if (error) {
      const errMsg = extractErrMsgFromRtk(error);
      console.log(error);
      toast.error(`Error in submitting Article.`);
      return;
    }
    if (data) {
      toast.success("sucessfully submitted article");
      router.replace("/dashboard/articles?status=published");
      return;
    }
  };

  return (
    <button
      className={`${
        isLoading || newArticleLoading ? "" : "py-2"
      } bg-darkRed text-white rounded-lg flex items-center justify-center hover:cursor-pointer`}
      onClick={() =>
        isDraft ? handleUpdate("pending") : handlePublish("pending")
      }
      disabled={isLoading || newArticleLoading}
    >
      <h1 className="text-sm">Submit To Admin</h1>

      {isLoading ||
        (newArticleLoading && (
          <iframe
            className="h-10 aspect-square"
            src="https://lottie.host/embed/a2a62e65-0443-4831-a1df-6106a3f938d1/LTiEdzxULh.json"
          ></iframe>
        ))}
    </button>
  );
};

export default RequestPublishBtn;
