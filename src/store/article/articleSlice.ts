import { createSlice } from "@reduxjs/toolkit";
// import { UserComment } from "../../types/UserComment.type.tsx";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";

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
});

export default articleSlice.reducer;