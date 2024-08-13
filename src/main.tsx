import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardList from "./pages/cardList/CardList.tsx";
import Article from "./pages/article/Article.tsx";
import NewArticle from "./pages/newArticle/NewArticle.tsx";
import Connection from "./pages/connection/Connection.tsx";
import { AppContextProvider } from "./Contexts/AppContext.tsx";
import { ArticleContextProvider } from "./Contexts/ArticleContext.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import ProtectedRoute from "./components/routeProtection/ProtectedRoute.tsx";
import articleLoader from "./loaders/article.loader.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";

import { Provider } from "react-redux";
import  store  from "./store/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        {/* <AppContextProvider> */}
          <App />
        {/* </AppContextProvider> */}
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
        errorElement: <ErrorPage />,
        loader: articleLoader,
        element: (
          <ArticleContextProvider>
            <Article />
          </ArticleContextProvider>
        ),
      },
      {
        path: "/new-article",
        element: (
          <ArticleContextProvider>
            <ProtectedRoute element={<NewArticle />} />
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
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
