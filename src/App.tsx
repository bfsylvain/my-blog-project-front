import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Navbar from "./components/mainPage/navbar.tsx";
import { Outlet } from "react-router-dom";
import { UseApp } from "./Contexts/AppContext.tsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "./app/hooks.ts";
import {setUser, logoutUser} from "./app/features/auth/authSlice.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwtValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    if (jwtValue) {
      const decodedToken = jwtDecode(jwtValue);
      dispatch(setUser(decodedToken))
      
    } else {
      dispatch(logoutUser())
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
