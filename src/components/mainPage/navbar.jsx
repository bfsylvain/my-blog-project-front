import { Link } from "react-router-dom";
import "./navbar.scss"

export default function Navbar() {

  return (
    <div className="navigation">
    <Link to="/">
    <h1>BLOG</h1>
    </Link>
    <ul>
        <Link to="/">
        <li>Accueil</li>
        </Link>
        <Link to="/articles">
        <li>Articles</li>
        </Link>
        <Link to="/connexion">
        <li>Connexion</li>
        </Link>
    </ul>
    <input type="search" name="" id="" />
    </div>
  );
}