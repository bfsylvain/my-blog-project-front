import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { UserInfo } from "../../../types/UserInfo.type.tsx";
import { SignInCredentials } from "../../../types/SignInCredentials.type.tsx";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

const initialState: UserInfo = {
  avatar: "",
  id: "",
  pseudo: "",
  email: ""
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      state.avatar = action.payload.avatar,
      state.id = action.payload.id,
      state.pseudo = action.payload.pseudo
      state.email = action.payload.email
    },
    logoutUser(state) {
      state.avatar = ""
      state.id = ""
      state.pseudo = ""
      state.email = ""
    },
  },
});

export const {setUser, logoutUser} = authSlice.actions
export default authSlice.reducer;
