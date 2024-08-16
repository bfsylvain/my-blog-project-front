import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UseArticle } from "../../../../Contexts/ArticleContext.tsx";
import "./likeArea.scss";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { ArticleDetail } from "../../../../types/ArticleDetail.type.tsx";
import { UserInfo } from "../../../../types/UserInfo.type.tsx";
import { useLikeArticleMutation, useUnlikeArticleMutation } from "../../../../app/features/api/articleApi.ts";
const emptyHeart = "./icons/empty-heart-icon.svg";
const redHeart = "./icons/red-heart-icon.svg";

type LikeAreaProps = {
  article: ArticleDetail;
  userInfo: UserInfo;
};

export default function LikeArea({ article, userInfo }: LikeAreaProps) {
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const likedArticle = article.likers.includes(userInfo.id)

  const handleLike = async () => {
    try {
      await likeArticle({
        articleId: article._id,
        userId: userInfo.id,
      }).unwrap();
    } catch (error) {
      console.error("Failed to like article", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikeArticle({
        articleId: article._id,
        userId: userInfo.id,
      }).unwrap();
    } catch (error) {
      console.error("Failed to unlike article", error);
    }

  }

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
      {userInfo && !likedArticle && (
        <img className="like-img" src={emptyHeart} alt="like" onClick={handleLike} />
      )}
      {userInfo && likedArticle && (
        <img className="like-img" src={redHeart} alt="like" onClick={handleUnlike} />
      )}
    </section>
  );
}

LikeArea.propTypes = {
  article: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};
