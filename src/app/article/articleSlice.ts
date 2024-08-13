import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserComment } from "../../types/UserComment.type.tsx";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";
import axios from "axios";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

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

const initialState : ArticleDetail[] = []

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getAllArticlesAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
});

export const getAllArticlesAsync = createAsyncThunk(
    'articles/fetchAllArticles',
    async () => {
          const response = await axios.get(`${backendUrl}/api/articles`);
            return response.data
        }
)

export default articleSlice.reducer;