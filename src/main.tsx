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
import ProtectedRoute from "./components/routeProtection/ProtectedRoute.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";

import { Provider } from "react-redux";
import  store, { persistor }  from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
        </PersistGate>
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
