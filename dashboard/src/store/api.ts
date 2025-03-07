import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    setUserLogin: build.mutation({
      query: (loginData) => ({
        url: "/api/auth/post",
        method: "POST",
        body: loginData,
      }),
    }),
    addNewArticleApi: build.mutation({
      query: (articleFormData: FormData) => {
        return {
          url: "/api/article/add-new-article",
          method: "POST",
          body: articleFormData,
        };
      },
    }),
  }),
});

export const { useSetUserLoginMutation, useAddNewArticleApiMutation } = api;
