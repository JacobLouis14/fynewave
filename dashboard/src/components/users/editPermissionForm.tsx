"use client";
import {
  searchArticleOrWriter,
  userEditPermissionForSpecificArticleAction,
} from "@/actions/sActions";
import { ArticleForUserEditPermission } from "@/models/article";
import { UserForUserEditPermission } from "@/models/auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

const EditPermissionForm = () => {
  const [contentWriterEmail, setContentWriterEmail] = useState<string>("");
  const [contentWriterData, setContentWriterData] = useState<
    UserForUserEditPermission[]
  >([]);
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [articleData, setArticleData] = useState<
    ArticleForUserEditPermission[]
  >([]);
  const [allotedEditData, setAllotedEditData] = useState<{
    userId: string;
    articleId: string;
  }>({
    userId: "",
    articleId: "",
  });
  const [isOptionsClose, setIsOptionClose] = useState<{
    writerOption: boolean;
    articleOption: boolean;
  }>({
    writerOption: true,
    articleOption: true,
  });
  const { data: sessionData } = useSession();

  //   handleApi
  const handleApi = useDebouncedCallback(async () => {
    const { data: searchData, error: searchError } =
      await searchArticleOrWriter(
        articleTitle,
        contentWriterEmail,
        sessionData?.user.token || ""
      );
    if (searchError) {
      return toast.error("error in search");
    }
    if (searchData.allArticles) {
      setArticleData([...searchData.allArticles]);
    }
    if (searchData.allContentWriterEmail) {
      setContentWriterData([...searchData.allContentWriterEmail]);
    }
  }, 800);

  // edit submit handler
  const handleEditSubmit = async () => {
    try {
      if (!allotedEditData.userId || !allotedEditData.articleId) {
        return toast.warning("fill form completly");
      }

      const { data, error } = await userEditPermissionForSpecificArticleAction(
        sessionData?.user.token || "",
        allotedEditData.userId,
        allotedEditData.articleId
      );

      if (error) {
        return toast.error(error.message);
      }

      toast.success(data.message);
      setContentWriterEmail("");
      setArticleTitle("");
      setContentWriterData([]);
      setArticleData([]);
      setAllotedEditData({ userId: "", articleId: "" });
    } catch (error) {
      console.log(
        `error in giving permission to edit specific article error: ${error}`
      );
    }
  };

  useEffect(() => {
    if (contentWriterEmail || articleTitle) {
      handleApi();
    }
  }, [contentWriterEmail, articleTitle]);

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="outline-none rounded-md px-4 py-3 w-full"
          placeholder="Enter content writer email"
          name="email"
          value={contentWriterEmail}
          onChange={(e) => {
            setContentWriterEmail(e.target.value);
            setIsOptionClose((prevState) => ({
              ...prevState,
              writerOption: false,
            }));
          }}
        />
        {contentWriterEmail && !isOptionsClose.writerOption && (
          <div
            className="absolute bg-white w-full py-2 z-20 flex flex-col gap-3"
            role="listbox"
          >
            {contentWriterData.map((writer) => (
              <p
                key={writer._id}
                className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                onClick={() => {
                  setAllotedEditData({
                    ...allotedEditData,
                    userId: writer._id,
                  });
                  setContentWriterEmail(writer.email);
                  setIsOptionClose((prevState) => ({
                    ...prevState,
                    writerOption: true,
                  }));
                }}
              >
                {writer.email}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          className="outline-none rounded-md px-4 py-3 w-full"
          placeholder="Enter article title"
          name="email"
          value={articleTitle}
          onChange={(e) => {
            setArticleTitle(e.target.value);
            setIsOptionClose((prevData) => ({
              ...prevData,
              articleOption: false,
            }));
          }}
        />
        {articleTitle && !isOptionsClose.articleOption && (
          <div
            className="absolute bg-white w-full py-2 z-20 flex flex-col gap-3"
            role="listbox"
          >
            {articleData.map((article) => (
              <p
                key={article._id}
                className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                onClick={() => {
                  setAllotedEditData({
                    ...allotedEditData,
                    articleId: article._id,
                  });
                  setArticleTitle(article.title);
                  setIsOptionClose((prevData) => ({
                    ...prevData,
                    articleOption: true,
                  }));
                }}
              >
                {article.title}
              </p>
            ))}
          </div>
        )}
      </div>
      <button
        className="bg-darkRed text-white py-2 rounded-md"
        onClick={handleEditSubmit}
      >
        Allow Edit
      </button>
    </>
  );
};

export default EditPermissionForm;
