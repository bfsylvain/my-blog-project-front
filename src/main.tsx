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
import ProtectedRoute from "./components/routeProtection/ProtectedRoute.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";

import { Provider } from "react-redux";
import  store, { persistor }  from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import Counter from "./pages/counter/Counter.tsx";

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
            <CardList />
        ),
      },
      {
        path: "/article/:id",
        element: (
            <Article />
        ),
      },
      {
        path: "/new-article",
        element: (
            <ProtectedRoute element={<NewArticle />} />
        ),
      },
      {
        path: "/connexion",
        element: <Connection />,
      },
      {
        path: "/counter",
        element: <Counter/>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
