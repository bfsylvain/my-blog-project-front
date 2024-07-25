import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardList from "./pages/cardList/CardList.jsx";
import Article from "./pages/article/Article.jsx";
import NewArticle from "./pages/newArticle/NewArticle.jsx";
import Connection from "./pages/connection/Connection.jsx";
import { AppContextProvider } from "./Contexts/AppContext.jsx";
import { ArticleContextProvider } from "./Contexts/ArticleContext.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import ProtectedRoute from "./components/routeProtection/ProtectedRoute.jsx";
import articleLoader from "./loaders/article.loader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <App />
      </AppContextProvider>
    ),
    children: [
      {
        path: "/articles",
        element: (
          <ArticleContextProvider>
            <CardList />
          </ArticleContextProvider>
        ),
      },
      {
        path: "/article/:id",
        errorElement: <ErrorPage/>,
        loader: articleLoader,
        element: (
          <ArticleContextProvider>
            <Article />
          </ArticleContextProvider>
        )
      },
      {
        path: "/new-article",
        element: (
          <ArticleContextProvider>
            <ProtectedRoute element={<NewArticle />}/>
          </ArticleContextProvider>
        ),
      },
      {
        path: "/connexion",
        element: <Connection />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
