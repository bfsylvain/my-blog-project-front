import { useState } from "react";
import "./newArticle.scss";
import { useNavigate } from "react-router-dom";
import { useCreateNewArticleMutation } from "../../app/features/api/articleApi.ts";
import { useAppSelector } from "../../app/hooks.ts";
const AddIcon = "./icons/add-round-icon.svg";

export default function NewArticle() {
  const userRTK = useAppSelector((state) => state.auth);
  const [createNewArticle] = useCreateNewArticleMutation();
  const navigate = useNavigate();

  const [articleValue, setArticleValue] = useState({
    userId: userRTK.id,
    userPseudo: userRTK.pseudo,
    title: "",
    text: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleValue({ ...articleValue, [e.target.name]: e.target.value });
  };

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userId", articleValue.userId);
      formData.append("userPseudo", articleValue.userPseudo);
      formData.append("title", articleValue.title);
      formData.append("text", articleValue.text);
      if (selectedImage) {
        formData.append("file", selectedImage);
      }
      await createNewArticle(formData).unwrap();
      navigate("/articles");
    } catch(error) {
      console.error("failed to create article: ", error)
    }
  }

  return (
    <div className="new-article">
      <h1>NOUVEL ARTICLE</h1>
      <form onSubmit={handleSubmit} className="article-form">
        <fieldset className="field">
          <label htmlFor="title" className="area-title">
            Titre
          </label>
          <textarea
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
