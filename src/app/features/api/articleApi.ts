import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleDetail } from "../../../types/ArticleDetail.type.tsx";
import { CommentToPost } from "../../../types/CommentToPost.tsx";
import { rootApi } from "./rootApi.ts";

// import & export du type à faire si le type se trouve dans la slice :
// import type { Post } from '@/features/posts/postsSlice'
// export type { Post }
const ARTICLE_ENPOINT = "articles"

export const articleApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleDetail[], void>({
      query: () => `${ARTICLE_ENPOINT}`,
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "Article", id: _id })) : [],
    }),
    getArticleById: builder.query<ArticleDetail, string>({
      query: (id) => `${ARTICLE_ENPOINT}/${id}`,
      providesTags: (result, error, id) => [{type: "Article", id}]
    }),
    createNewArticle: builder.mutation<void, FormData>({
      query: (newArticle) => ({
        url: `${ARTICLE_ENPOINT}`,
        method: "POST",
        body: newArticle,
      }),
      invalidatesTags: ["Article"],
    }),
    // void pour le type de l'action elle ne retourne rien et string pour le type du parametre
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ARTICLE_ENPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Article", id }],
    }),

    likeArticle: builder.mutation<void, { articleId: string; userId: string }>({
      query: ({ articleId, userId }) => ({
        url: `${ARTICLE_ENPOINT}/${articleId}/add-liker`,
        method: "PATCH",
        body: { userId },
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
        url: `${ARTICLE_ENPOINT}/${articleId}/remove-liker`,
        method: "PATCH",
        body: { userId },
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
        url: `${ARTICLE_ENPOINT}/${articleId}/comments`,
        method: "PATCH",
        body: commentData,
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
