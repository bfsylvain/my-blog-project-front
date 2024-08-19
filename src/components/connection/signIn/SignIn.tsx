import { FormEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../app/features/api/authApi.ts";
import { setUser } from "../../../app/features/auth/authSlice.ts";
import { useAppDispatch } from "../../../app/hooks.ts";
import { SignUpForm } from "../../../types/SignUpForm.type.tsx";
import "./signIn.scss";
import { SignInCredentials } from "../../../types/SignInCredentials.type.tsx";

export default function SignIn() {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setUser(loginData));
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

  const {register: registerForm, handleSubmit, formState: {errors}} = useForm<SignInCredentials>();

  const onSubmit: SubmitHandler<SignInCredentials> = async (data) => {
    await login(data);
  };

  return (
    <div>
      <h1>Connection</h1>
      <div className="error-container">
        <p className={`error-message ${wrongId ? "active" : ""}`}>
          Identifiants incorrects !
        </p>
      </div>
      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="field email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="field-input"
            {...registerForm("email", {
              required: "email nécessaire"
            })}
            name="email"
          />
        </fieldset>
        {errors.email && <div>{errors.email.message}</div>}
        <fieldset className="field password">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            {...registerForm("password", {
              required: "Mot de passe écessaire"
            })}
            name="password"
            className="field-input"
          />
        </fieldset>
        {errors.password && <div>{errors.password.message}</div>}
        <div className="button-area">
          <input type="submit" value="Se connecter" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
