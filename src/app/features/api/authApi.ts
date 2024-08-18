import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rootApi } from "./rootApi.ts";
import { SignInCredentials } from "../../../types/SignInCredentials.type.tsx";
import { SignUpCredentials } from "../../../types/SignUpCredentials.type.tsx";

export const AuthApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, SignInCredentials>({
      query: (credentials) => ({
        url: "signIn",
        method: "POST",
        body: credentials
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logOut",
        method: "GET"
      })
    }),
    register: builder.mutation<void, SignUpCredentials>({
      query: (credentials) => ({
        url: "signUp",
        method: "POST",
        body: credentials
      })
    })
  }),
});

export const {useLoginMutation, useLogoutMutation} = AuthApi;
