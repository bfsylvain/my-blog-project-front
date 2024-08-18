import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rootApi } from "./rootApi.ts";
import { SignInCredentials } from "../../../types/SignInCredentials.type.tsx";

export const AuthApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, SignInCredentials>({
      query: (credentials) => ({
        url: "signIn",
        method: "POST",
        body: credentials
      })
    }),
    logout: builder.query<void, void>({
      query: () => "logOut"
    }),
    register: builder.mutation<void, void>({
      query: (credentials) => ({
        url: "",
        method: "POST",
        body: credentials
      })
    })
  }),
});

export const {useLoginMutation, useLogoutQuery} = AuthApi;
