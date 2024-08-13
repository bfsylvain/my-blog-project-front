import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fetchTokenData from "../utils/FetchTokenData.tsx";
import { SignInCredentials } from "../types/SignInCredentials.type.tsx";
import { SignUpCredentials } from "../types/SignUpCredentials.type.tsx";
const AppContext = createContext([() => {}]);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    pseudo: "",
    email: "",
    password: "",
  });
  const [passWordVerification, setPasswordVerification] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [wrongId, setWrongId] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //remplace le formulaire de création par le formulaire d'inscription après création de compte
  const [formSubmit, setFormSubmit] = useState(false);
  const [onHoldNavigate, setOnHoldNavigate] = useState(false);

  //J'attends que le userInfo soit chargé avant de naviguer vers la page articles
  //pour avoir le bouton ajouter articles visible
  useEffect(() => {
    if (onHoldNavigate && userInfo) {
      navigate("/articles");
      setOnHoldNavigate(false);
    }
  }, [onHoldNavigate, userInfo, navigate]);

  //Récupération du token
  const fetchToken = useCallback(async () => {
    const userToken = await fetchTokenData(backendUrl);
    setUserInfo(userToken);
  }, [backendUrl]);

  // connexion
  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/signIn`,
          credentials,
          { withCredentials: true }
        );
        if (response.data.error) {
          setSignInForm({ email: "", password: "" });
          setWrongId(true);
        } else {
          setUserInfo(response.data);
          setSignInForm({ email: "", password: "" });
          setOnHoldNavigate(true);
        }
      } catch (err) {
        console.error({ error: err });
      }
    },
    [backendUrl]
  );

  // création de compte
  const signUp = useCallback(
    async (credentials: SignUpCredentials) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/signUp`,
          credentials,
          { withCredentials: true }
        );
        const errors = response.data.errors;
        if (errors) {
          setWrongId(true);
          if (errors.pseudo) setErrorMessage(errors.pseudo);
          if (errors.email) setErrorMessage(errors.email);
          if (errors.password) setErrorMessage(errors.password);
        } else {
          setSignUpForm({
            pseudo: "",
            email: "",
            password: "",
          });
          setPasswordVerification("");
          setFormSubmit(true);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [backendUrl]
  );

  // verification de concordance des mots de passe
  useEffect(() => {
    if (
      passWordVerification !== signUpForm.password &&
      passWordVerification !== ""
    ) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [passWordVerification, signUpForm.password]);

  const contextValues = useMemo(
    () => ({
      errorMessage,
      setErrorMessage,
      formSubmit,
      fetchToken,
      setFormSubmit,
      passwordMatch,
      passWordVerification,
      setPasswordVerification,
      signIn,
      signUp,
      signInForm,
      setSignInForm,
      signUpForm,
      setSignUpForm,
      userInfo,
      setUserInfo,
      wrongId,
      setWrongId,
    }),
    [
      errorMessage,
      setErrorMessage,
      formSubmit,
      fetchToken,
      setFormSubmit,
      passwordMatch,
      passWordVerification,
      setPasswordVerification,
      signIn,
      signUp,
      signInForm,
      setSignInForm,
      signUpForm,
      setSignUpForm,
      userInfo,
      setUserInfo,
      wrongId,
      setWrongId,
    ]
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

export const UseApp = () => useContext(AppContext);
