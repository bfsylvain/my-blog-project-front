import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL as string;

export const rootApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        credentials: 'include'
    }),
    endpoints: () => ({}),
    tagTypes: ['Article', 'Auth']
})
