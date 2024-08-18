import { UseApp } from "../../../Contexts/AppContext.tsx";
import "./signIn.scss";
import { useLoginMutation } from "../../../app/features/api/authApi.ts";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import {setUser} from "../../../app/features/auth/authSlice.ts";
export default function SignIn() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  
  const [wrongId, setWrongId] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrongId(false);
    setSignInForm({ ...signInForm, [e.target.id]: e.target.value });
  };

  const [
    login,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  const handleLoginRTK = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(signInForm);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setUser(loginData))
      navigate("/articles");
    }
    if (isLoginError) {
      setWrongId(true);
      setSignInForm({
        email: "",
        password: "",
      });
    }
  }, [isLoginSuccess, isLoginError]);

  return (
    <div>
      <h1>Connection</h1>
      <div className="error-container">
        <p className={`error-message ${wrongId ? "active" : ""}`}>
          Identifiants incorrects !
        </p>
      </div>
      <form className="signin-form" onSubmit={handleLoginRTK}>
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
