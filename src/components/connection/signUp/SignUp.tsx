// import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import {SubmitHandler, useForm} from 'react-hook-form';
import { useLoginMutation, useNewRegisterMutation } from "../../../app/features/api/authApi.ts";
import { UseApp } from "../../../Contexts/AppContext.tsx";
import SignIn from "../signIn/SignIn.tsx";
import "./signUp.scss";
import { SignUpForm } from "../../../types/SignUpForm.type.tsx";

export default function SignUp() {

  const {
    errorMessage,
    formSubmit,
    passwordMatch,
    signUp,
    wrongId,
    setWrongId,
  } = UseApp();


  const [signUpForm, setSignUpForm] = useState({
    pseudo: "",
    email: "",
    password: "",
  });
  const [passWordVerification, setPasswordVerification] = useState("");

  
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

  // const [register, {data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError} ] = useNewRegisterMutation();
  // const handleRegisterRTK = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await register(signUpForm)
  // }

  // le handleSubmit de react-hook-form a le preventDefault inclus !
  const {register: registerForm, handleSubmit, formState: {errors}} = useForm<SignUpForm>();
  
  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    console.log(data)
    
  }

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
                {...registerForm("pseudo", {
                  required: true
                })}
                id="pseudo"
                name="pseudo"
                className="field-input"
              />
            </fieldset>
            <fieldset className="field email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...registerForm("email", {
                  required: true,
                  // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a_z]{2-4}$/
                }
                )}
                id="email"
                name="email"
                className="field-input"
              />
            </fieldset>
            <fieldset className="field password">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                {...registerForm("password", {
                  required: true,
                  minLength: 8,
                  // definir ce que cela doit contenir
                  validate: (value) => value.includes("@")
                })}
                id="password"
                name="password"
                className="field-input"
              />
            </fieldset>
            <fieldset className="field verification">
              <label htmlFor="verification">Vérification</label>
              <input
                type="password"
                {...registerForm("checkPassword", {
                  required: true
                })}
                id="checkPassword"
                name="checkPassword"
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
