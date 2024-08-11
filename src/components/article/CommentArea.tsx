import PropTypes from "prop-types";
import CardComment from "../cardList/card/cardComment/CardComment.tsx";
import { useEffect, useState } from "react";
import { UserComment } from "../../types/UserComment.type.tsx";

type CommentAreaProps = {
  articleComments: UserComment[];
};

export default function CommentArea({ articleComments }: CommentAreaProps) {
  const [commentList, setCommentList] = useState<UserComment[]>([]);

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
