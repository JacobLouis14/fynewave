import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  reducerPath: "api",
  tagTypes: ["Article"],
  endpoints: (build) => ({
    setUserLogin: build.mutation({
      query: (loginData) => ({
        url: "/api/auth/post",
        method: "POST",
        body: loginData,
      }),
    }),
    addNewArticleApi: build.mutation({
      query: ({
        articleFormData,
        accessToken,
      }: {
        articleFormData: FormData;
        accessToken: string;
      }) => {
        return {
          url: "/api/article/add-new-article",
          method: "POST",
          body: articleFormData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["Article"],
    }),
    saveArticleAsDraft: build.mutation({
      query: ({
        articleFormData,
        accessToken,
      }: {
        articleFormData: FormData;
        accessToken: string;
      }) => {
        return {
          url: "/api/article/save-article-as-draft",
          method: "POST",
          body: articleFormData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useSetUserLoginMutation,
  useAddNewArticleApiMutation,
  useSaveArticleAsDraftMutation,
} = api;
