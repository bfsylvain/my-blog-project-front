import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { UserInfo } from "../../../types/UserInfo.type.tsx";
import { SignInCredentials } from "../../../types/SignInCredentials.type.tsx";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

const initialState: UserInfo = {
  avatar: "",
  id: "1",
  pseudo: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: SignInCredentials) => {
    const response = await axios.post(`${BASE_URL}/api/signIn`, credentials, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.get(`${BASE_URL}/api/logOut`);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(logout.fulfilled, () => {
        return {
            avatar: "",
            id: "",
            pseudo: "",
          };;
      });
  },
});

export default authSlice.reducer;
