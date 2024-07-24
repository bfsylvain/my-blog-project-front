import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UseArticle } from "../../../../Contexts/ArticleContext";
import "./likeArea.scss";
import emptyHeart from "../../../../assets/icons/empty-heart-icon.svg";
import redHeart from "../../../../assets/icons/red-heart-icon.svg";

export default function LikeArea({ article, userInfo }) {
  const [liked, setLiked] = useState(false);
  const { likePost, unlikePost } = UseArticle();

  useEffect(() => {
    if (userInfo && article.likers.includes(userInfo.id)) setLiked(true);
  }, [article.likers, userInfo]);

  const like = () => {
    likePost(article._id, userInfo.id);
    setLiked(true);
  };
  const unlike = () => {
    unlikePost(article._id, userInfo.id);
    setLiked(false);
  };

  return (
    <section className="action-area">
      {!userInfo && <img className="like-img" src={emptyHeart} alt="like" />}
      {userInfo && !liked && (
        <img className="like-img" src={emptyHeart} alt="like" onClick={like} />
      )}
      {userInfo && liked && (
        <img className="like-img" src={redHeart} alt="like" onClick={unlike} />
      )}
    </section>
  );
}

LikeArea.propTypes = {
  article: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};
