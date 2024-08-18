import { useState } from "react";
import SignIn from "../signIn/SignIn.tsx";
import SignUp from "../signUp/SignUp.tsx";
import { UseApp } from "../../../Contexts/AppContext.tsx";
import "./log.scss";

export default function Log() {
  // @ts-ignore
  const { setFormSubmit } = UseApp();
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);

  const handleForms = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    if (target.id === "connection") {
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
              className={signIn ? "active" : undefined}
              onClick={handleForms}
            >
              Connexion
            </li>
            <li
              id="inscription"
              className={signUp ? "active" : undefined}
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
