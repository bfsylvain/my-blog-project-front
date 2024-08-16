import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleDetail } from "../../../types/ArticleDetail.type.tsx";

// import & export du type à faire si le type se trouve dans la slice
// import type { Post } from '@/features/posts/postsSlice'
// export type { Post }
const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/api/` }),
  endpoints: (builder) => ({
    getPosts: builder.query<ArticleDetail[], void>({
      query: () => "articles",
    }),
    getPostById: builder.query<ArticleDetail, string>({
        query: (id) => `articles/${id}`
    })
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = apiSlice;
