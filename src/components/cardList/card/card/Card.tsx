import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./card.scss";
import { UseApp } from "../../../../Contexts/AppContext.tsx";
import LikeArea from "../likeArea/LikeArea.tsx";
import { ArticleDetail } from "../../../../types/ArticleDetail.type.tsx";
import { useDeleteArticleMutation } from "../../../../app/features/api/articleApi.ts";
import useDateTransform from "../../../../hooks/useDateTransform.ts";

type CardProps = {
  article: ArticleDetail;
};

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL as string;

export default function Card({ article }: CardProps) {
  // @ts-ignore
  const { userInfo } = UseApp();

  const {frenchDateShort} = useDateTransform();

  const creationDate = article ? frenchDateShort(article.updatedAt) : "";

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDelete = async () => {
    try {
      await deleteArticle(article._id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article className="card">
        <Link to={`/article/${article._id}`}>
          <div className="card-img-area">
            <img
              className="card-img"
              src={`${BASE_URL}/public${article.pictures[0]}`}
              alt="image"
            />
          </div>
        </Link>
        <div className="description-area">
          <header className="description-header">
            <section className="creation-area">
              <div className="author-area">
                <img
                  className="author-img"
                  src={`${BASE_URL}/public${article.userAvatar}`}
                  alt="author-img"
                />
                <p className="author-name">{article.userPseudo}</p>
              </div>
              <p className="post-date">{creationDate}</p>
            </section>
          </header>
          <div className="card-title-area">
            <h4 className="card-title">{article.title}</h4>
          </div>
          <p className="content-preview">{article.text}</p>
          <LikeArea article={article} userInfo={userInfo} />
          <button onClick={handleDelete}>X</button>
        </div>
      </article>
    </>
  );
}

Card.propTypes = {
  article: PropTypes.object.isRequired,
};
