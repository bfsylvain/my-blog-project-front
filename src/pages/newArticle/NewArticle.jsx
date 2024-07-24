import { useState } from "react";
import "./newArticle.scss";
import { UseApp } from "../../Contexts/AppContext";
import { UseArticle } from "../../Contexts/ArticleContext";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const { userInfo } = UseApp();
  const { postArticle } = UseArticle();
  const navigate = useNavigate();

  const [articleValue, setArticleValue] = useState({
    userId: userInfo.id,
    userPseudo: userInfo.pseudo,
    title: "",
    text: "",
    // pictures:[]
  });

  const onChange = (e) => {
    setArticleValue({ ...articleValue, [e.target.name]: e.target.value });
  };

  const createArticle = async (e) => {
    e.preventDefault();
    await postArticle(articleValue);
    navigate("/articles");
  };

  return (
    <div className="new-article">
      <h1>NEW ARTICLE</h1>
      <form onSubmit={createArticle}>
        <h4>Titre</h4>
        <input
          type="text"
          name="title"
          id=""
          value={articleValue.title}
          onChange={onChange}
        />
        <h4>Votre texte</h4>
        <textarea
          label="Votre texte"
          name="text"
          id=""
          value={articleValue.text}
          onChange={onChange}
        ></textarea>
        <h4>Selectionnez une image</h4>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
