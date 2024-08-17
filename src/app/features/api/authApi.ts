import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: `${backendUrl}/api/`}),
    tagTypes: ["Authentification"],
    endpoints: (builder) => ({})
})

export const {} = AuthApi;