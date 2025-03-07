"use server";

import { ArticleForUserEditPermission, ArticleModel } from "@/models/article";
import { UserDataModel, UserForUserEditPermission } from "@/models/auth";
import { CategoryModel } from "@/models/category";
import { MailData } from "@/models/emails";
import {
  ArtistOfTheWeekModal,
  DjsOfTheWeekModal,
  SongOfTheWeekModal,
} from "@/models/showcase";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";

//////////////////////////////////////////// for articles

export const getArticleById = async (
  id: string
): Promise<{
  isLoading: boolean;
  error: { message: string; err: unknown } | null;
  data: ArticleModel | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string; err: unknown } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/get-articleById/${id}`
    );
  } catch (err) {
    error = { message: "something went wrong", err };
  } finally {
    isLoading = false;
  }

  return { isLoading, error, data: response?.data };
};

export const updateArticle = async (
  existingFormData: FormData
): Promise<{
  isLoading: boolean;
  error: { message: string; err: unknown } | null;
  data: ArticleModel | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string; err: any } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/update-article`,
      existingFormData,
      {
        headers: {},
        method: "PUT",
      }
    );
  } catch (err: any) {
    error = { message: "something went wrong", err: err.response.data.message };
  } finally {
    isLoading = false;
  }

  revalidatePath("/dashboard/articles");

  return { isLoading, error, data: response?.data };
};

export const deleteArticle = async (
  id: string
): Promise<{
  isLoading: boolean;
  error: { message: string; err: unknown } | null;
  data: ArticleModel | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string; err: unknown } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/article/delete-article/${id}`
    );
  } catch (err) {
    error = { message: "something went wrong", err };
  } finally {
    isLoading = false;
  }

  revalidatePath("/dashboard/articles");

  return { isLoading, error, data: response?.data };
};

//////////////////////////////////////////// for categories

// *need to optimize error handling

export const getCategories = async (): Promise<{
  isLoading: boolean;
  error: { message: string } | null;
  data: CategoryModel[] | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/category/get-categories`
    );
  } catch (err: any) {
    error = { message: err?.response?.data?.message || "something went wrong" };
  } finally {
    isLoading = false;
  }

  return { isLoading, error, data: response?.data?.categories };
};

export const deleteCategory = async (
  id: string
): Promise<{
  isLoading: boolean;
  error: { message: string } | null;
  data: CategoryModel | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/category/delete-category/${id}`
    );
  } catch (err: any) {
    error = {
      message: err?.response?.data?.message || "something went wrong",
    };
  } finally {
    isLoading = false;
  }

  revalidatePath("/dashboard/categories");

  return { isLoading, error, data: response?.data };
};

export const createCategory = async (
  formData: FormData
): Promise<{
  isLoading: boolean;
  error: { message: string | null } | null;
  data: CategoryModel | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/category/create-category`,
      formData
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  } finally {
    isLoading = false;
  }

  revalidatePath("/dashboard/categories");

  return { isLoading, error, data: response?.data };
};

///////////////////////////////////////for users

export const createUserForAdmin = async (
  newUserFormData: FormData,
  accessTokenForServer: string
): Promise<{
  isLoading: boolean;
  data: UserDataModel | null;
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/auth/sign-up`,
      newUserFormData,
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/users");

  return { isLoading, data: response?.data, error };
};

export const getAllUserData = async (
  accessTokenToServer: string
): Promise<{
  isLoading: boolean;
  data: UserDataModel[] | null;
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let response: AxiosResponse<any, any> | null = null;
  let error: { message: string | null } | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/users/get-all-users`,
      { headers: { Authorization: `Bearer ${accessTokenToServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  return { isLoading, data: response?.data.allUserData, error };
};

export const userSuspendUpdateAction = async (
  accessTokenForServer: string,
  userId: string
): Promise<{
  isLoading: boolean;
  data: { message: string; updatedUser: UserDataModel | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/users/supend-user/${userId}`,
      "",
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/users");

  return { isLoading, data: response?.data, error };
};

export const userArticleEditPermissionAction = async (
  accessTokenForServer: string,
  userId: string
): Promise<{
  isLoading: boolean;
  data: { message: string; updatedUser: UserDataModel | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/users/allow-edit-permission/${userId}`,
      "",
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/users");

  return { isLoading, data: response?.data, error };
};

export const userEditPermissionForSpecificArticleAction = async (
  accessTokenForServer: string,
  userId: string,
  articleId: string
): Promise<{
  isLoading: boolean;
  data: { message: string; updatedUser: UserDataModel | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/users/create-edit-permission-for-article`,
      { articleId, userId },
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/users");

  return { isLoading, data: response?.data, error };
};

export const removeUserEditPermissionForSpecificArticleAction = async (
  accessTokenForServer: string,
  userId: string,
  articleId: string
): Promise<{
  isLoading: boolean;
  data: { message: string; updatedUser: UserDataModel | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/users/remove-article-edit-premission/${articleId}/${userId}`,
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/users");

  return { isLoading, data: response?.data, error };
};

////////////////////////////////////FOR SHOWCASES

export const addSongOfTheWeekAction = async (
  articleId: string,
  accessTokenForServer: string
): Promise<{
  isLoading: boolean;
  data: { message: string; newSongOfTheWeek: SongOfTheWeekModal | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/add-songs-of-the-week/${articleId}`,
      "",
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  revalidatePath("/dashboard/articles");

  return { isLoading, data: response?.data, error };
};

export const addArtistOfTheWeekAction = async (
  articleId: string,
  accessTokenForServer: string
): Promise<{
  isLoading: boolean;
  data: { message: string; newArtistOfTheWeek: ArtistOfTheWeekModal | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/add-artist-of-the-week/${articleId}`,
      "",
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  revalidatePath("/dashboard/articles");

  return { isLoading, data: response?.data, error };
};

export const addDjsOfTheWeekAction = async (
  articleId: string,
  accessTokenForServer: string,
  djPositioningNumber: number | null
): Promise<{
  isLoading: boolean;
  data: { message: string; newDjsOfTheWeek: DjsOfTheWeekModal | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/add-dj-of-the-week/${articleId}/${djPositioningNumber}`,
      "",
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/articles");

  return { isLoading, data: response?.data, error };
};

export const getSongsoFTheWeek = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allSongsOfTheWeek: SongOfTheWeekModal[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

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

export const getArtistsoFTheWeek = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allArtistsOfTheWeek: ArtistOfTheWeekModal[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

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

export const getDjsoFTheWeek = async (): Promise<{
  isLoading: boolean;
  data: { message: string; allDjsOfTheWeek: DjsOfTheWeekModal[] | null };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

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

export const deleteDjsoFTheWeek = async (
  articleId: string,
  tokenToTheServer: string
): Promise<{
  isLoading: boolean;
  data: { message: string };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/delete-dj-of-the-week/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenToTheServer}`,
        },
      }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  revalidatePath("/dashboard/showcases");
  return { isLoading, data: response?.data, error };
};

export const deleteArtistsoFTheWeek = async (
  articleId: string,
  tokenToTheServer: string
): Promise<{
  isLoading: boolean;
  data: { message: string };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/delete-artist-of-the-week/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenToTheServer}`,
        },
      }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  revalidatePath("/dashboard/showcases");
  return { isLoading, data: response?.data, error };
};

export const deleteSongssoFTheWeek = async (
  articleId: string,
  tokenToTheServer: string
): Promise<{
  isLoading: boolean;
  data: { message: string };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/delete-add-songs-of-the-week/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenToTheServer}`,
        },
      }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  revalidatePath("/dashboard/showcases");
  return { isLoading, data: response?.data, error };
};

export const updateLandingCards = async (
  articleId: string,
  accessTokenForServer: string,
  title: string,
  categoryTitle: string
): Promise<{
  isLoading: boolean;
  data: { message: string; status: number | undefined };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/showcases/update-landing-cards`,
      { articleId, title, categoryTitle },
      { headers: { Authorization: `Bearer ${accessTokenForServer}` } }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }

  revalidatePath("/dashboard/articles");

  return {
    isLoading,
    data: { message: response?.data.message, status: response?.status },
    error,
  };
};

////////////////////////search content writer and article
export const searchArticleOrWriter = async (
  articleName: string,
  writerEmail: string,
  tokenToTheServer: string
): Promise<{
  isLoading: boolean;
  data: {
    allContentWriterEmail: UserForUserEditPermission[];
    allArticles: ArticleForUserEditPermission[];
  };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/users/get-article-and-user-by-name?contentWriterEmail=${writerEmail}&articleTitle=${articleName}`,
      {
        headers: {
          Authorization: `Bearer ${tokenToTheServer}`,
        },
      }
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  return { isLoading, data: response?.data, error };
};

//////////////////////////// DASHBOARD MATRICES

export const getShowCasesMatrics = async (): Promise<{
  isLoading: boolean;
  data: {
    message: string;
    allShowCasesMatrics: { _id: string; showcasesCount: number }[] | null;
  };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/dash-metrics/get-showcases-metrics`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  return { isLoading, data: response?.data, error };
};

export const getCategoryMatrics = async (): Promise<{
  isLoading: boolean;
  data: {
    message: string;
    categoryMetrics: {
      totalCategoryCount: number;
      articleCountByCategory: { _id: string; number: number }[];
    } | null;
  };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/dash-metrics/get-category-metrics`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  return { isLoading, data: response?.data, error };
};

export const getUsersMatrics = async (): Promise<{
  isLoading: boolean;
  data: {
    message: string;
    allUserMatrics:
      | {
          _id: number;
          number: number;
        }[]
      | null;
  };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/dash-metrics/get-user-metrics`
    );
  } catch (err: any) {
    error = {
      message: err.response?.data?.message || "something went wrong",
    };
  }
  return { isLoading, data: response?.data, error };
};

//////////////////////////////////sending email action

export const sendEmailAction = async (
  emailDatas: MailData
): Promise<{
  isLoading: boolean;
  data: {
    message: string;
    status: number | undefined;
  };
  error: { message: string | null } | null;
}> => {
  let isLoading: boolean = true;
  let error: { message: string | null } | null = null;
  let response: AxiosResponse<any, any> | null = null;

  try {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/newsletter/send-email-to-newsletter-subscribers`,
      emailDatas
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
