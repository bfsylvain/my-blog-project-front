import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import "./navbar.scss";
import axios from "axios";

export default function Navbar({ userInfo }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const disconnect = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/logOut`);
      if (response) {
        Cookies.remove("jwt");
        window.location.reload();
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <div className="navigation">
      <Link to="/">
        <h1>BLOG</h1>
      </Link>
      <ul>
        <Link to="/">
          <li >Accueil</li>
        </Link>
        <Link to="/articles">
          <li>Articles</li>
        </Link>
        {userInfo ? (
          <li onClick={disconnect}>Déconnexion</li>
        ) : (
          <Link to="/connexion">
            <li>Connexion</li>
          </Link>
        )}
      </ul>
      <input type="search" name="" id="" />
    </div>
  );
}

Navbar.propTypes = {
  userInfo: PropTypes.object,
};
