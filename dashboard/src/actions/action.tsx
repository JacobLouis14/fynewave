"use server";

import axios from "axios";
import HorizontalCards from "@/components/articles/horizontalCards";
import { Article, ArticleModel } from "@/models/article";

export const fetchArticles = async (
  token: string,
  pageNumber: number,
  status: string,
  searchValue?: string | null
): Promise<{
  articles: Article[];
  error: { message: string; err: unknown } | null;
}> => {
  let searchQuery = searchValue ? `search=${searchValue}&` : "";
  let error: { message: string; err: unknown } | null = null;
  let articles: Article[] = [];

  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_BASE_URL
      }/api/article/get-articles?${searchQuery}page=${pageNumber}&articlesPerPage=${10}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;

    articles = data.articles;
  } catch (err) {
    error = { message: "Something went wrong", err };
  }

  return { articles, error };
};
