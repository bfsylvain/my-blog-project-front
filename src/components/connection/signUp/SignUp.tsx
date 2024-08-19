// import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseApp } from "../../../Contexts/AppContext.tsx";
import { SignUpForm, signUpSchema } from "../../../types/SignUpForm.type.tsx";
import SignIn from "../signIn/SignIn.tsx";
import "./signUp.scss";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const {
    errorMessage,
    formSubmit,
    passwordMatch,
    signUp,
    wrongId,
    setWrongId,
  } = UseApp();

  // const [signUpForm, setSignUpForm] = useState({
  //   pseudo: "",
  //   email: "",
  //   password: "",
  // });
  const [passWordVerification, setPasswordVerification] = useState("");

  // const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setWrongId(false);
  //   setSignUpForm({ ...signUpForm, [e.target.id]: e.target.value });
  // };
  const handlePasswordVerification = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordVerification(e.target.value);
  };

  // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   signUp(signUpForm);
  // };

  // const [register, {data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError} ] = useNewRegisterMutation();
  // const handleRegisterRTK = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await register(signUpForm)
  // }

  // le handleSubmit de react-hook-form a le preventDefault inclus !
  const {
    register: registerForm,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      await signUp(data);
    } catch (error) {
      setError("root", {
        message: "Identifiants incorrects",
      });
    }
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

          {/* <form className="signup-form" onSubmit={handleLogin}> */}
          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="field pseudo">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                {...registerForm("pseudo")}
                id="pseudo"
                name="pseudo"
                className="field-input"
              />
            </fieldset>
            {errors.pseudo && <div>{errors.pseudo.message}</div>}
            <fieldset className="field email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                {...registerForm("email")}
                id="email"
                name="email"
                className="field-input"
              />
            </fieldset>
            {errors.email && <div>{errors.email.message}</div>}
            <fieldset className="field password">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                {...registerForm("password")}
                id="password"
                name="password"
                className="field-input"
              />
            </fieldset>
            {errors.password && <div>{errors.password.message}</div>}

            <fieldset className="field verification">
              <label htmlFor="verification">Vérification</label>
              <input
                type="password"
                {...registerForm("checkPassword")}
                id="checkPassword"
                name="checkPassword"
                onChange={handlePasswordVerification}
                className="field-input"
              />
            </fieldset>
            {errors.checkPassword && <div>{errors.checkPassword.message}</div>}
            <div className="error-container">
              <p className={`error-message ${!passwordMatch ? "active" : ""}`}>
                Mot de passe différent
              </p>
            </div>
            <div className="button-area">
              <input
                type="submit"
                value={isSubmitting ? "En attente" : "Se connecter"}
                className="submit-btn"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
