import PropTypes from "prop-types";
import "./cardComment.scss";
import { UserComment } from "../../../../types/UserComment.type.tsx";
import useDateTransform from "../../../../hooks/useDateTransform.ts";

type cardCommentProps = {
  comment: UserComment;
};

export default function CardComment({ comment }: cardCommentProps) {

  const BASE_URL: string = import.meta.env.VITE_BACKEND_URL as string;

  const { frenchDateShort } = useDateTransform();

  return (
    <div className="card-comment">
      <section className="img-area">
        <img
          className="author-img"
          src={`${BASE_URL}/public${comment.userAvatar}`}
          alt="user"
        />
      </section>
      <section className="comment-area">
        <header className="comment-header">
          <p className="commenter-name">{comment?.userPseudo}</p>
          <p className="comment-date">{frenchDateShort(comment.timestamp)}</p>
        </header>
        <div className="comment-text-area">
          <p className="comment-text">{comment?.text}</p>
        </div>
      </section>
    </div>
  );
}

CardComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
