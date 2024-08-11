import { Article } from "../types/ArticleDetail.type.tsx";
import fetchArticleData from "../utils/articles/FetchArticleData.tsx";

const articleLoader = async ({params}) => {
   const article: Article = await fetchArticleData({params})
   return article
}

export default articleLoader;
