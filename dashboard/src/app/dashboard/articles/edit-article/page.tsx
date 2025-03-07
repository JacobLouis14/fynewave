import { getArticleById, getCategories } from "@/actions/sActions";
import ArticleForm from "@/components/articles/articleForm";
import InfiniteSpinner from "@/components/common/infiniteSpinner";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const EditArticles = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const session = await getServerSession(authOptions);

  // redirection if no user login
  if (!session?.user) redirect("/");

  // if user
  const { data, error, isLoading } = await getArticleById(searchParams.query);

  if (isLoading) {
    return (
      <div className="w-full">
        <InfiniteSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  // reading categories
  const {
    data: categoryData,
    isLoading: categoryIsLoading,
    error: categoryError,
  } = await getCategories();

  return (
    <ArticleForm
      articleToUpdate={data}
      categoriesData={{
        categories: categoryData,
        categoriesError: categoryError,
      }}
    />
  );
};

export default EditArticles;
