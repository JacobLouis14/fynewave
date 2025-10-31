"use client";
import { Article, ArticleModel } from "@/models/article";
import { CategoryModel } from "@/models/category";
import { fileToUrl } from "@/utils/fileToUrl";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ArticleFormLeftSide from "./articleFormLeftSide";
import ArticleFormRightSide from "./articleFormRightSide";
import ArticleButtonWrapper from "./buttons/buttonWrapper";

interface Props {
  articleToUpdate?: Article | null;
  categoriesData: {
    categories: CategoryModel[] | null;
    categoriesError: { message: string } | null;
  };
  authorName?: string;
}

const ArticleForm = ({
  articleToUpdate,
  categoriesData,
  authorName,
}: Props) => {
  const session = useSession();
  const [articleData, setArticleData] = useState<ArticleModel>({
    _id: articleToUpdate?._id || "",
    title: articleToUpdate?.title || "",
    banner: articleToUpdate?.banner || null,
    thumbnail: articleToUpdate?.thumbnail || null,
    desc: articleToUpdate?.desc || "",
    articleContentOne: articleToUpdate?.articleContentOne || "",
    articleContentTwo: articleToUpdate?.articleContentTwo || "",
    articleContentThree: articleToUpdate?.articleContentThree || "",
    tags: articleToUpdate?.tags || [],
    author: articleToUpdate?.author.name || authorName || "",
    category: articleToUpdate?.category || "",
    songsIframes: articleToUpdate?.songsIframes || [],
    videoIframes: articleToUpdate?.videoIframes || [],
    alternativeTitle: articleToUpdate?.alternativeTitle || "",
    articleContentImage: articleToUpdate?.articleContentImage || null,
    articleContentInstagram: articleToUpdate?.articleContentInstagram || "",
    status: articleToUpdate?.status || "",
    group: articleToUpdate?.group || "",
  });
  const [uploadImagesToDisplay, setUploadImagesToDisplay] = useState<{
    imageUrl: string;
    bannerUrl: string;
    articleContentImageUrl: string;
  }>({
    imageUrl:
      typeof articleToUpdate?.thumbnailUrl === "string"
        ? articleToUpdate?.thumbnailUrl
        : "",
    bannerUrl:
      typeof articleToUpdate?.bannerUrl === "string"
        ? articleToUpdate?.bannerUrl
        : "",
    articleContentImageUrl:
      typeof articleToUpdate?.articleContentImageUrl === "string"
        ? articleToUpdate?.articleContentImageUrl
        : "",
  });
  const [songsIframeInputValue, setSongsIframeInputValue] = useState("");
  const [videoIframeInputValue, setVideoIframeInputValue] = useState("");

  // handle Image uploads
  const handleUploads = (
    e: React.ChangeEvent<HTMLInputElement>,
    destination: keyof ArticleModel,
    urlDes: keyof {
      imageUrl: string;
      bannerUrl: string;
      articleContentImageUrl: string;
    }
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = fileToUrl(file);
      setArticleData((prevData) => ({
        ...prevData,
        [destination]: file,
      }));
      setUploadImagesToDisplay((prevDisplay) => ({
        ...prevDisplay,
        [urlDes]: url,
      }));
    }
  };

  // remove uploads
  const handleRemoveUploads = (
    dataFile: keyof ArticleModel,
    urlData: keyof {
      imageUrl: string;
      bannerUrl: string;
      articleContentImageUrl: string;
    },
    reference: React.RefObject<HTMLInputElement>
  ) => {
    setUploadImagesToDisplay((prevData) => ({
      ...prevData,
      [urlData]: "",
    }));
    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      [dataFile]: null,
    }));
    if (reference.current) {
      reference.current.value = "";
    }
  };

  // songs iframe keydown handler
  const songsIframeEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && songsIframeInputValue.trim() !== "") {
      setArticleData({
        ...articleData,
        songsIframes: [
          ...(articleData.songsIframes || []),
          songsIframeInputValue,
        ],
      });
      setSongsIframeInputValue("");
    }
  };

  // songs i frame delete handler
  const handleIframeDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedIframes = articleData.songsIframes?.filter(
      (_, i) => i != index
    );
    setArticleData({
      ...articleData,
      songsIframes: updatedIframes,
    });
  };

  // songs iframe keydown handler
  const videoIframeEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && videoIframeInputValue.trim() !== "") {
      setArticleData({
        ...articleData,
        videoIframes: [
          ...(articleData.videoIframes || []),
          videoIframeInputValue,
        ],
      });
      setVideoIframeInputValue("");
    }
  };

  // songs i frame delete handler
  const handlevideoIframeDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedIframes = articleData.videoIframes?.filter(
      (_, i) => i != index
    );
    setArticleData({
      ...articleData,
      videoIframes: updatedIframes,
    });
  };

  // appending the instagram embedding script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="px-4 py-8 grid grid-rows-1 grid-cols-1 md:grid-cols-7 gap-3 h-[88vh] overflow-auto">
      <ArticleFormLeftSide
        articleData={articleData}
        setArticleData={setArticleData}
        handleRemoveUploads={handleRemoveUploads}
        handleUploads={handleUploads}
        uploadImagesToDisplay={uploadImagesToDisplay}
      />
      <div className="md:col-span-2 flex flex-col gap-8">
        <ArticleFormRightSide
          articleData={articleData}
          categoriesData={categoriesData}
          handleIframeDelete={handleIframeDelete}
          handleRemoveUploads={handleRemoveUploads}
          handleUploads={handleUploads}
          handlevideoIframeDelete={handlevideoIframeDelete}
          setArticleData={setArticleData}
          setSongsIframeInputValue={setSongsIframeInputValue}
          setVideoIframeInputValue={setVideoIframeInputValue}
          songsIframeEnterHandler={songsIframeEnterHandler}
          songsIframeInputValue={songsIframeInputValue}
          uploadImagesToDisplay={uploadImagesToDisplay}
          videoIframeEnterHandler={videoIframeEnterHandler}
          videoIframeInputValue={videoIframeInputValue}
          author={articleData.author}
        />
        <ArticleButtonWrapper
          articleData={articleData}
          articleToUpdate={articleToUpdate}
        />
      </div>
    </div>
  );
};

export default ArticleForm;
