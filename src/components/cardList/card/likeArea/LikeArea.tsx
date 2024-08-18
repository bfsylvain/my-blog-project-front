import PropTypes from "prop-types";
import "./likeArea.scss";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { ArticleDetail } from "../../../../types/ArticleDetail.type.tsx";
import { useLikeArticleMutation, useUnlikeArticleMutation } from "../../../../app/features/api/articleApi.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
const emptyHeart = "./icons/empty-heart-icon.svg";
const redHeart = "./icons/red-heart-icon.svg";

type LikeAreaProps = {
  article: ArticleDetail;
};

export default function LikeArea({ article }: LikeAreaProps) {
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const userRTK = useAppSelector((state) => state.auth);
  const likedArticle = article.likers.includes(userRTK.id)

  const handleLike = async () => {
    try {
      await likeArticle({
        articleId: article._id,
        userId: userRTK.id,
      }).unwrap();
    } catch (error) {
      console.error("Failed to like article", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikeArticle({
        articleId: article._id,
        userId: userRTK.id,
      }).unwrap();
    } catch (error) {
      console.error("Failed to unlike article", error);
    }

  }

  return (
    <section className="action-area">
      {!userRTK.id && (
        <Popup
          trigger={<img className="like-img" src={emptyHeart} alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>connectez vous pour liker un post !</div>
        </Popup>
      )}
      {userRTK.id && !likedArticle && (
        <img className="like-img" src={emptyHeart} alt="like" onClick={handleLike} />
      )}
      {userRTK.id && likedArticle && (
        <img className="like-img" src={redHeart} alt="like" onClick={handleUnlike} />
      )}
    </section>
  );
}

LikeArea.propTypes = {
  article: PropTypes.object.isRequired,
};
