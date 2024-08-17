import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserComment } from "../../types/UserComment.type.tsx";
import { ArticleDetail } from "../../../types/ArticleDetail.type.tsx";
import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

// interface ArticleState {
//     __v: number,
//     _id: string,
//     comments: UserComment[],
//     createdAt: string,
//     likers: string[],
//     pictures: string[],
//     text: string,
//     title: string,
//     updatedAt: string,
//     userAvatar: string,
//     userId: string,
//     userPseudo: string,
// };


//Interface pour inclure une valeur d'état et mettre un spinner si status = loading
interface ArticleState {
  value: ArticleDetail[];
  status: "idle" | "loading" | "failed";
}
// initaialState pour inclure une valeur d'état et mettre un spinner si status = loading
// const initialState: ArticleState = {
//   value: [],
//   status: "idle",
// };
const initialState: ArticleDetail[] = [];

export const getAllArticlesAsync = createAsyncThunk(
  "articles/fetchAllArticles",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/articles`);
    return response.data;
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllArticlesAsync.fulfilled, (state, action) => {
    //   state.status = "idle";
      return action.payload;
    });
  },
});

export default articleSlice.reducer;
