import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleDetail } from "../../../types/ArticleDetail.type.tsx";
import { CommentToPost } from "../../../types/CommentToPost.tsx";
import { error } from "console";

// import & export du type à faire si le type se trouve dans la slice
// import type { Post } from '@/features/posts/postsSlice'
// export type { Post }
const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/api/` }),
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleDetail[], void>({
      query: () => "articles",
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "Article", id: _id })) : [],
    }),
    getArticleById: builder.query<ArticleDetail, string>({
      query: (id) => `articles/${id}`,
      providesTags: (result, error, id) => [{type: "Article", id}]
    }),
    createNewArticle: builder.mutation<void, FormData>({
      query: (newArticle) => ({
        url: "articles",
        method: "POST",
        body: newArticle,
        credentials: "include",
      }),
      invalidatesTags: ["Article"],
    }),
    // void pour le type de l'action elle ne retourne rien et string pour le type du parametre
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Article", id }],
    }),

    likeArticle: builder.mutation<void, { articleId: string; userId: string }>({
      query: ({ articleId, userId }) => ({
        url: `/articles/${articleId}/add-liker`,
        method: "PATCH",
        body: { userId },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: "Article", id: articleId },
      ],
    }),
    unlikeArticle: builder.mutation<
      void,
      { articleId: string; userId: string }
    >({
      query: ({ articleId, userId }) => ({
        url: `/articles/${articleId}/remove-liker`,
        method: "PATCH",
        body: { userId },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: "Article", id: articleId },
      ],
    }),
    commentArticle: builder.mutation<
      void,
      { articleId: string; commentData: CommentToPost }
    >({
      query: ({ articleId, commentData }) => ({
        url: `articles/${articleId}/comments`,
        method: "PATCH",
        body: commentData,
        credentials: "include",
      }),
      invalidatesTags: (result, error, {articleId} ) => [
        { type: "Article", articleId },
      ],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useCreateNewArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
  useCommentArticleMutation
} = articleApi;
