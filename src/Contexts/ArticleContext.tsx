import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ArticleToPost } from "../types/ArticleToPost.type.tsx";
import { CommentToPost } from "../types/CommentToPost.tsx";
// @ts-ignore
const ArticleContext = createContext();

export function ArticleContextProvider({ children }: { children: React.ReactNode }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cardList, setCardList] = useState([]);

  const createFrenchDate = useCallback((dateToChange: string) => {
    const date = new Date(dateToChange);
    const adjustedDate = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
    }).format(date);
    return adjustedDate;
  }, []);
  const createShortFrenchDate = useCallback((dateToChange: string) => {
    const date = new Date(dateToChange);
    const adjustedDate = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
    }).format(date);
    return adjustedDate;
  },[])

  //Récupère tous les articles
  const fetchArticles = useCallback(async () => {
    try {
      const result = await axios.get(`${backendUrl}/api/articles`);
      setCardList(result.data);
    } catch (err) {
      console.error("error fetching data");
    }
  }, [backendUrl]);

  // Récupération d'un article par son id
  const fetchArticleById = useCallback(
    async (id: number) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/articles/${id}`
      );
      if (response) {
        return response.data
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [backendUrl]);

  //Like d'un article
  const likePost = useCallback(
    async (articleId: number, userId: number) => {
      try {
        await axios.patch(
          `${backendUrl}/api/articles/${articleId}/add-liker`,
          { userId: userId },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("error fetching data");
      }
    },
    [backendUrl]
  );
  // Unlike d'un article
  const unlikePost = useCallback(
    async (articleId: number, userId: number) => {
      try {
        await axios.patch(
          `${backendUrl}/api/articles/${articleId}/remove-liker`,
          { userId: userId },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("error fetching data");
      }
    },
    [backendUrl]
  );

  //Post d'un article
  const postArticle = useCallback(
    async (articleData: ArticleToPost) => {
      try {
        await axios.post(`${backendUrl}/api/articles`, articleData, {
          withCredentials: true,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [backendUrl]
  );

  const postComment = useCallback(
    async (articleId: number, commentData: CommentToPost) => {
      try {
        await axios.patch(
          `${backendUrl}/api/articles/${articleId}/comments`,
          commentData,
          { withCredentials: true }
        );
      } catch (err) {
        console.error(err);
      }
    },
    [backendUrl]
  );

  //   !!! que la page d'accueil s'actualise !!!
  const contextValues = useMemo(
    () => ({
      backendUrl,
      cardList,
      createFrenchDate,
      createShortFrenchDate,
      fetchArticles,
      fetchArticleById,
      likePost,
      postArticle,
      postComment,
      setCardList,
      unlikePost,
    }),
    [
      backendUrl,
      cardList,
      createFrenchDate,
      createShortFrenchDate,
      fetchArticles,
      fetchArticleById,
      likePost,
      postArticle,
      postComment,
      setCardList,
      unlikePost,
    ]
  );
  return (
    <ArticleContext.Provider value={contextValues}>
      {children}
    </ArticleContext.Provider>
  );
}

ArticleContextProvider.propTypes = {
  children: PropTypes.node,
};

export const UseArticle = () => useContext(ArticleContext);
