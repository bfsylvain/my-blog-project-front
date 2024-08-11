import { useState } from "react";
import "./newArticle.scss";
import { UseApp } from "../../Contexts/AppContext.tsx";
import { UseArticle } from "../../Contexts/ArticleContext.tsx";
import { useNavigate } from "react-router-dom";
const AddIcon = "../../assets/icons/add-round-icon.svg";

export default function NewArticle() {
  const { userInfo } = UseApp();
  const { postArticle } = UseArticle();
  const navigate = useNavigate();

  const [articleValue, setArticleValue] = useState({
    userId: userInfo.id,
    userPseudo: userInfo.pseudo,
    title: "",
    text: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const onChange = (e) => {
    setArticleValue({ ...articleValue, [e.target.name]: e.target.value });
  };

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const createArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", articleValue.userId);
    formData.append("userPseudo", articleValue.userPseudo);
    formData.append("title", articleValue.title);
    formData.append("text", articleValue.text);
    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    await postArticle(formData);
    navigate("/articles");
  };

  return (
    <div className="new-article">
      <h1>NOUVEL ARTICLE</h1>
      <form onSubmit={createArticle} className="article-form">
        <fieldset className="field">
          <label htmlFor="title" className="area-title">
            Titre
          </label>
          <textarea
            label="Votre texte"
            name="title"
            id="title"
            value={articleValue.title}
            onChange={onChange}
            className="title"
          ></textarea>
        </fieldset>
        <fieldset className="field">
          <label htmlFor="texte" className="area-title">
            Votre texte
          </label>
          <textarea
            label="Votre texte"
            name="text"
            id=""
            value={articleValue.text}
            rows={10}
            onChange={onChange}
            className="text"
          ></textarea>
        </fieldset>
        <fieldset className="file-upload field">
          <h3 className="area-title upload">Ajoutez une image</h3>
          <label htmlFor="file-upload" className="upload-label">
            <img className="add-button-img" src={AddIcon} />
          </label>
          <input
            id="file-upload"
            type="file"
            name="file"
            onChange={onChangePicture}
          />
        <img src={imagePreview} alt="" />
        </fieldset>

        <button type="submit" className="button">
          Envoyer
        </button>
      </form>
    </div>
  );
}
