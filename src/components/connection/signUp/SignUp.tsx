// import axios from "axios";
import { UseApp } from "../../../Contexts/AppContext.tsx";
import SignIn from "../signIn/SignIn.tsx";
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

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrongId(false);
    setSignUpForm({ ...signUpForm, [e.target.id]: e.target.value });
  };
  const handlePasswordVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVerification(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(signUpForm);
  };

  return (
    <div>
      {formSubmit ? (
        <>
          <h4 className="success-creation">
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

          <form className="signup-form" onSubmit={handleLogin}>
            <fieldset className="field pseudo">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                value={signUpForm.pseudo}
                onChange={handleFormValue}
                className="field-input"
              />
            </fieldset>
            <fieldset className="field email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={signUpForm.email}
                onChange={handleFormValue}
                className="field-input"
              />
            </fieldset>
            <fieldset className="field password">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={signUpForm.password}
                onChange={handleFormValue}
                className="field-input"
              />
            </fieldset>
            <fieldset className="field verification">
              <label htmlFor="verification">Vérification</label>
              <input
                type="password"
                id="verification"
                name="verification"
                value={passWordVerification}
                onChange={handlePasswordVerification}
                className="field-input"
              />
            </fieldset>
            <div className="error-container">
              <p className={`error-message ${!passwordMatch ? "active" : ""}`}>
                Mot de passe différent
              </p>
            </div>
            <div className="button-area">
              <input
                type="submit"
                value="Se connecter"
                className="submit-btn"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
