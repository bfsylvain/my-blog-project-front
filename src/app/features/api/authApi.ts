import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rootApi } from "./rootApi.ts";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL as string;

export const AuthApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({}),
});

export const {} = AuthApi;
