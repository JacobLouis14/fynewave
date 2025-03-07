"use client";
import { deleteArticle } from "@/actions/sActions";
import React from "react";
import { toast } from "react-toastify";

interface Props {
  articleId: string | null | undefined;
}

const DeleteArticleBtn = ({ articleId }: Props) => {
  // delete Handler
  const handlerDeleteArticle = async () => {
    if (articleId) {
      const { data, error, isLoading } = await deleteArticle(articleId);
      if (isLoading) {
        toast.loading("please wait");
      }
      if (error) {
        toast.dismiss();
        toast.error("Error in deleteing Article");
      }
      if (data) {
        toast.dismiss();
        toast.success("Article Deleted");
      }
    }
  };

  return (
    <button
      className="px-3 py-2 bg-red-600 text-white rounded-lg"
      onClick={handlerDeleteArticle}
    >
      Delete
    </button>
  );
};

export default DeleteArticleBtn;
