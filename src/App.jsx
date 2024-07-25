import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Navbar from "./components/mainPage/navbar";
import { Outlet } from "react-router-dom";
import { UseApp } from "./Contexts/AppContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const { userInfo, setUserInfo } = UseApp();

  useEffect(() => {
    const jwtValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    if (jwtValue) {
      const decodedToken = jwtDecode(jwtValue);
      setUserInfo({
        id: decodedToken.id.id,
        pseudo: decodedToken.id.pseudo,
        avatar: decodedToken.id.avatar,
      });
    }
  }, [setUserInfo]);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <main>
        <Outlet context={userInfo} />
      </main>
    </>
  );
}

export default App;
