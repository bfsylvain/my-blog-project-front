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
      <h1>Se connecter</h1>
      <div className="error-container">
        <p className={`error-message ${wrongId ? "active" : ""}`}>
          Identifiants incorrects !
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={signInForm.email}
          onChange={handleFormValue}
        />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={signInForm.password}
          onChange={handleFormValue}
        />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
}
