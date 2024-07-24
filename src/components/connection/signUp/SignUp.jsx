// import axios from "axios";
import { UseApp } from "../../../Contexts/AppContext";
import SignIn from "../signIn/SignIn";
import "./signUp.scss";

export default function SignUp() {
  const {
    errorMessage,
    formSubmit,
    signUpForm,
    setSignUpForm,
    passwordMatch,
    passWordVerification,
    setPasswordVerification,
    signUp,
    wrongId,
    setWrongId,
  } = UseApp();

  const handleFormValue = (e) => {
    setWrongId(false);
    setSignUpForm({ ...signUpForm, [e.target.id]: e.target.value });
  };
  const handlePasswordVerification = (e) => {
    setPasswordVerification(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signUp(signUpForm);
  };

  return (
    <div>
      {formSubmit ? (
        <>
          <h4 className="success-c-creation">
            Enregistrement réussi, veuillez vous connecter
          </h4>
          <SignIn />
        </>
      ) : (
        <div>
          <h1>Inscription</h1>
          <div className="error-container">
            <p className={`error-message ${wrongId ? "active" : ""}`}>
              {errorMessage}
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              value={signUpForm.pseudo}
              onChange={handleFormValue}
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={signUpForm.email}
              onChange={handleFormValue}
            />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={signUpForm.password}
              onChange={handleFormValue}
            />
            <br />
            <label htmlFor="verification">Vérification</label>
            <input
              type="password"
              id="verification"
              name="verification"
              value={passWordVerification}
              onChange={handlePasswordVerification}
            />
            <br />
            <div className="error-container">
              <p className={`error-message ${!passwordMatch ? "active" : ""}`}>
                Mot de passe différent
              </p>
            </div>
            <input type="submit" value="Se connecter" />
          </form>
        </div>
      )}
    </div>
  );
}
