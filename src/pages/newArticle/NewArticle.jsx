import { useState } from "react";
import "./newArticle.scss";
import { UseApp } from "../../Contexts/AppContext";
import { UseArticle } from "../../Contexts/ArticleContext";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets/icons/add-round-icon.svg";
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

  const [imagePreview, setImagePreview] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const onChange = (e) => {
    setArticleValue({ ...articleValue, [e.target.name]: e.target.value });
  };

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImage(file);
  }
}

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
      <h1>NEW ARTICLE</h1>
      <form onSubmit={createArticle}>
        <h4>Titre</h4>
        <textarea
          label="Votre texte"
          name="title"
          id="title"
          value={articleValue.title}
          onChange={onChange}
        ></textarea>
        <h4>Votre texte</h4>
        <textarea
          label="Votre texte"
          name="text"
          id=""
          value={articleValue.text}
          onChange={onChange}
        ></textarea>
        <div className="file-upload">
          <label htmlFor="file-upload" className="upload-label">
            <img className="add-button-img" src={AddIcon} />
          </label>
          <input id="file-upload" type="file" name="file" onChange={onChangePicture} />
        </div>
        <img src={imagePreview} alt="" />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
