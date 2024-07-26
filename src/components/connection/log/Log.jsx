import { useState } from "react";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import { UseApp } from "../../../Contexts/AppContext";
import "./log.scss";

export default function Log() {
  const { setFormSubmit } = UseApp();
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);

  const handleForms = (e) => {
    if (e.target.id === "connection") {
      setFormSubmit(false);
      setSignIn(true);
      setSignUp(false);
    } else {
      setSignIn(false);
      setSignUp(true);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <div className="sidebar">
          <ul className="sidebar-list">
            <li
              id="connection"
              className={signIn ? "active" : null}
              onClick={handleForms}
            >
              Connexion
            </li>
            <li
              id="inscription"
              className={signUp ? "active" : null}
              onClick={handleForms}
            >
              Inscription
            </li>
          </ul>
        </div>
        <div className="form">
          {signIn && <SignIn />}
          {signUp && <SignUp />}
        </div>
      </div>
    </div>
  );
}
