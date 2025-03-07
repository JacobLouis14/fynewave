import { getCategories } from "@/actions/sActions";
import ArticleForm from "@/components/articles/articleForm";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const NewArticle = async () => {
  const session = await getServerSession(authOptions);

  // redirection if no user login
  if (!session?.user) redirect("/");

  // reading categories
  const { data, isLoading, error } = await getCategories();

  return (
    <ArticleForm
      categoriesData={{ categories: data, categoriesError: error }}
    />
  );
};

export default NewArticle;
