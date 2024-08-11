import { useOutletContext } from "react-router-dom";
import "./welcomeSection.scss";

export default function WelcomeSection() {
  const userInfo = useOutletContext();
  return (
    <div className="welcome-section">
      <div className="text-section">
      <h1>Bienvenue sur Taste & Travel</h1>
      <div className="text">
      <p>Parce que nous ne voyageons pas seulement avec notre corps mais également avec nos papilles !</p>
      </div>
      </div>
      {userInfo ?
      <a href="/articles" className="subscribe-button">Commencer la visite</a> :
      <a href="/connexion" className="subscribe-button">Me connecter</a>
    }

    </div>
  )
}
