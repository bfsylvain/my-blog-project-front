import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./card.scss";
import { UseArticle } from "../../../../Contexts/ArticleContext";
import { UseApp } from "../../../../Contexts/AppContext";
import LikeArea from "../likeArea/LikeArea";

export default function Card({ article }) {
  const { userInfo } = UseApp();
  const { backendUrl, createShortFrenchDate } = UseArticle();
  const creationDate = article ? createShortFrenchDate(article.updatedAt): "";
  console.log(article)
  
  console.log(article);
    return (
      <>
        <article className="card">
          <Link to={`/article/${article._id}`}>
            <div className="card-img-area">
              <img
                className="card-img"
                src={`${backendUrl}/public${article.pictures[0]}`}
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
                    src={`${backendUrl}/public${article.userAvatar}`}
                    alt="author-img"
                  />
                  <p className="author-name">{article.userPseudo}</p>
                </div>
                <p className="post-date">{creationDate}</p>
              </section>
            </header>
            <div className="card-title-area">
              <h2 className="card-title">{article.title}</h2>
            </div>
            <p className="content-preview">{article.text}</p>
            <LikeArea article={article} userInfo={userInfo}/>
          </div>
        </article>
      </>
    );
}

Card.propTypes = {
  article: PropTypes.object.isRequired,
};
