import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UseArticle } from "../../../../Contexts/ArticleContext.tsx";
import "./likeArea.scss";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { ArticleDetail } from "../../../../types/ArticleDetail.type.tsx";
import { UserInfo } from "../../../../types/UserInfo.type.tsx";
const emptyHeart = "./icons/empty-heart-icon.svg";
const redHeart = "./icons/red-heart-icon.svg";

type LikeAreaProps = {
  article: ArticleDetail;
  userInfo: UserInfo;
};

export default function LikeArea({ article, userInfo }: LikeAreaProps) {
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
      {!userInfo && (
        <Popup
          trigger={<img className="like-img" src={emptyHeart} alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>connectez vous pour liker un post !</div>
        </Popup>
      )}
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
