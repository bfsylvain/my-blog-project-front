import { useRouteError } from "react-router-dom";
import "./errorPage.scss";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oups!</h1>
      <p>Une erreur est survenue 😬</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
