import fetchArticleData from "../utils/articles/FetchArticleData";

const articleLoader = async ({params}) => {
   const response = await fetchArticleData({params})
   return response
}

export default articleLoader;
