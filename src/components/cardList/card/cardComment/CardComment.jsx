import PropTypes from "prop-types";
import "./cardComment.scss";
import { UseArticle } from "../../../../Contexts/ArticleContext";

export default function CardComment({comment}) {
  const {createShortFrenchDate, backendUrl} = UseArticle();
  
  return (
    <div className="card-comment">
      <section className="img-area">
        <img className="author-img" src={`${backendUrl}/public${comment.userAvatar}`} alt="user" />
      </section>
      <section className="comment-area">
        <header className="comment-header">
          <p className="commenter-name">{comment?.userPseudo}</p>
          <p className="comment-date">{createShortFrenchDate(comment.timestamp)}</p>
        </header>
        <div className="comment-text-area">
          <p className="comment-text">
            {comment?.text}
          </p>
        </div>
      </section>
    </div>
  );
}

CardComment.propTypes = {
  comment: PropTypes.object.isRequired,
}
