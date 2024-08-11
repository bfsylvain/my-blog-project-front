import { UserComment } from "./UserComment.type.tsx"

export type ArticleDetail = {
    __v: number,
    _id: string,
    comments: UserComment[],
    createdAt: string,
    likers: string[],
    pictures: string[],
    text: string,
    title: string,
    updatedAt: string,
    userAvatar: string,
    userId: string,
    userPseudo: string,
}