import { UseApp } from "../../../Contexts/AppContext";
import "./signIn.scss";
export default function SignIn() {
  const { signIn, signInForm, setSignInForm, wrongId, setWrongId } = UseApp();

  const handleFormValue = (e) => {
    setWrongId(false);
    setSignInForm({ ...signInForm, [e.target.id]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(signInForm);
  };

  return (
    <div>
      <h1>Connection</h1>
      <div className="error-container">
        <p className={`error-message ${wrongId ? "active" : ""}`}>
          Identifiants incorrects !
        </p>
      </div>
      <form className="signin-form" onSubmit={handleLogin}>
        <fieldset className="field email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="field-input"
            value={signInForm.email}
            onChange={handleFormValue}
          />
        </fieldset>
        <fieldset className="field password">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            className="field-input"
            value={signInForm.password}
            onChange={handleFormValue}
          />
        </fieldset>
        <div className="button-area">
          <input type="submit" value="Se connecter" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
