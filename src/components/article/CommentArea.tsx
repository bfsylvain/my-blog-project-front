import PropTypes from "prop-types";
import CardComment from "../cardList/card/cardComment/CardComment.tsx";
import { useEffect, useState } from "react";

export default function CommentArea({ articleComments }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => setCommentList(articleComments), [articleComments]);

  return (
    <>
      {commentList.map((comment) => (
        <CardComment key={comment._id} comment={comment} />
      ))}
    </>
  );
}

CommentArea.propTypes = {
  articleComments: PropTypes.array.isRequired,
};
