import PropTypes from "prop-types";
import CardComment from "../cardList/card/cardComment/CardComment";
import { useEffect, useState } from "react";
import { UseArticle } from "../../Contexts/ArticleContext";
import { v4 as uuidv4 } from 'uuid';

export default function CommentArea({ articleComments, userInfo }) {
  const { postComment } = UseArticle();
  const [commentList, setCommentList] = useState([]);
  const date = new Date();
  const [comment, setComment] = useState({
    // _id: uuidv4(),
    userId: userInfo?.id,
    userPseudo: userInfo?.pseudo,
    // userAvatar: userInfo?.avatar,
    text: "",
    // timestamp: date.getTime()
  });

  useEffect(() => setCommentList(articleComments), [articleComments]);

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  const handleComment = (e) => {
    e.preventDefault();
    if (comment.text) {
        console.log(comment);
        // setCommentList([...commentList, comment])
        postComment(userInfo.id, comment);
      setComment({
        _id: uuidv4(),
        userId: userInfo.id,
        userPseudo: userInfo.pseudo,
        text: "",
        createdAt: date.getTime()
      });
    }
  };

  return (
    <>
      {commentList.map((comment) => (
        <CardComment key={comment._id} comment={comment} />
      ))}
      <textarea
        type="text"
        name="text"
        id=""
        placeholder="Votre commentaire"
        value={comment.text}
        onChange={onChange}
      />
      <button
        className="send-comment-btn"
        type="submit"
        onClick={handleComment}
      >
        envoyer
      </button>
    </>
  );
}

CommentArea.propTypes = {
  articleComments: PropTypes.array.isRequired,
  userInfo: PropTypes.object,
};
