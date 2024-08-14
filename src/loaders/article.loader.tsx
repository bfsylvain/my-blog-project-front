import { ArticleDetail } from "../types/ArticleDetail.type.tsx";
import fetchArticleData from "../utils/articles/FetchArticleData.tsx";

interface CardProps {
   params: number
};

const articleLoader = async ({params}: CardProps) => {
   const article: ArticleDetail = await fetchArticleData({params})
   return article
}

export default articleLoader;
