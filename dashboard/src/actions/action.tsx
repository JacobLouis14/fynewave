"use server";

import axios from "axios";
import HorizontalCards from "@/components/articles/horizontalCards";
import { ArticleModel } from "@/models/article";
import ArticlesRow from "@/components/articles/articlesRow";

export const fetchArticles = async (
  pageNumber: number,
  searchValue?: string | null
): Promise<{
  articles: React.JSX.Element[] | null;
  isLoading: boolean;
  error: { message: string; err: unknown } | null;
}> => {
  let searchQuery = searchValue ? `search=${searchValue}&` : "";
  let loading: boolean = true;
  let error: { message: string; err: unknown } | null = null;
  let articles: React.JSX.Element[] | null = null;

  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_BASE_URL
      }/api/article/get-articles?${searchQuery}page=${pageNumber}&articlesPerPage=${10}`
    );

    const { data } = response;

    articles = data.map((article: Partial<ArticleModel>, index: number) => (
      <ArticlesRow key={index} articleData={article} />
    ));
  } catch (err) {
    error = { message: "Something went wrong", err };
  } finally {
    loading = false;
  }

  return { articles, isLoading: loading, error };
};
