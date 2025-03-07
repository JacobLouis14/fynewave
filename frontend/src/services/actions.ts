"use server";

import { ArticleModel } from "@/models/article";
import {
  ArtistOfTheWeekModal,
  DjsOfTheWeekModal,
  landingCardsModel,
  SongOfTheWeekModal,
} from "@/models/showcase";
import axios, { AxiosResponse } from "axios";
import { unstable_cache } from "next/cache";

// get latest articles
export const getLatestArticles = async (): Promise<{
  isLoading: boolean;
  data: { message: string; latestArticles: ArticleModel[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/get-latest-article`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

// get other blog articles
export const getOtherArticles = async (): Promise<{
  isLoading: boolean;
  data: { message: string; otherBlogsData: ArticleModel[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/get-other-articles`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

// for songs of the week
export const getSongsOfTheWeek = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allSongsOfTheWeek: SongOfTheWeekModal[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/get-songs-of-the-week`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

// for artist of the week
export const getArtistOfTheWeek = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allArtistsOfTheWeek: ArtistOfTheWeekModal[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/get-artists-of-the-week`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

// for dj of the week
export const getDjOfTheWeek = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allDjsOfTheWeek: DjsOfTheWeekModal[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/get-djs-of-the-week`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

// blog post by slug & related blogs
export const getBlogPostBySlug = async (
  articleSlug: string
): Promise<{
  isLoading: boolean;
  data: {
    message: string;
    articleDataBySlug: ArticleModel | null;
    relatedArticles: [ArticleModel] | null;
  };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/get-article-post-data-by-slug/${articleSlug}`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

// for landing cards
export const getLandingCards = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allLandingCards: landingCardsModel } | null;
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/get-landing-cards-details`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};

////////////////////////////Newsletter
export const subscribeToNewsletterAction = async (): Promise<{
  isLoading: boolean;
  data: { message: string; status: number | undefined } | null;
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/newsletter/add-email-to-newsletter`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return {
    isLoading,
    data: { message: response?.data.message, status: response?.status },
    error,
  };
};

/////////////////////////////Metadata

export const getArticlesForSitemap = async (): Promise<{
  isLoading: boolean;
  data: { message: string; articleData: ArticleModel[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/get-article-for-sitemap`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data, error };
};
