import fetchArticleData from "../utils/articles/FetchArticleData.tsx";

const articleLoader = async ({params}) => {
   const article = await fetchArticleData({params})
   return article
}

export default articleLoader;
