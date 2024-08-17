import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL as string;

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/api/`}),
    tagTypes: ["Authentification"],
    endpoints: (builder) => ({})
})

export const {} = AuthApi;