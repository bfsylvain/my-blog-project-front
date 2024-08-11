import {
  MDBAccordion,
  MDBAccordionItem,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import "./article.scss";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { UseArticle } from "../../Contexts/ArticleContext.tsx";
import { useState } from "react";
import CommentArea from "../../components/article/CommentArea.tsx";
import { UserInfo } from "../../types/UserInfo.type.tsx";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";

function Article() {
  const { id } = useParams();
  const userInfo: UserInfo = useOutletContext();
  const articleData: ArticleDetail = useLoaderData();
  const { backendUrl, createFrenchDate, postComment } = UseArticle();
  const headerBackgroudImage = `
  linear-gradient(to bottom, rgba(11, 32, 47, 1) 0%, rgba(11, 32, 47, 0) 66%),
  url(${backendUrl}/public${articleData.pictures[0]})
  `;

  const [comment, setComment] = useState({
    userId: userInfo?.id,
    userPseudo: userInfo?.pseudo,
    text: "",
  });
  const creationDate = createFrenchDate(articleData.createdAt);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.text) {
      postComment(id, comment);
      setComment({
        userId: userInfo?.id,
        userPseudo: userInfo?.pseudo,
        text: "",
      });
    }
  };
  return (
    <>
      <article className="blog-article">
        <header
          className="article-header"
          style={{ backgroundImage: headerBackgroudImage }}
        >
          <h1>{articleData.title}</h1>
          <p>{`Le ${creationDate}`}</p>
        </header>
        <section className="article-text-area">
          <p className="article-text">{articleData.text}</p>
        </section>
        <section className="carousel-area">
          <section className="carousel">
            <MDBCarousel showControls>
              <MDBCarouselItem itemId={1}>
                <img
                  src={`${backendUrl}/public${articleData.pictures[0]}`}
                  className="d-block w-100"
                  alt="..."
                />
              </MDBCarouselItem>
              <MDBCarouselItem itemId={2}>
                <img
                  src="https://mdbootstrap.com/img/new/slides/042.jpg"
                  className="d-block w-100 "
                  alt="..."
                />
              </MDBCarouselItem>
              <MDBCarouselItem itemId={3}>
                <img
                  src="https://mdbootstrap.com/img/new/slides/043.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </MDBCarouselItem>
            </MDBCarousel>
          </section>
        </section>
        <section className="comments-section">
          <MDBAccordion alwaysOpen initialActive={2}>
            <MDBAccordionItem
              collapseId={1}
              headerTitle="Commentaires de visiteurs"
            >
              <CommentArea
                articleComments={articleData.comments}
                userInfo={userInfo}
              />
            </MDBAccordionItem>
          </MDBAccordion>
        </section>
        <section className="comments-area">
          <textarea
            type="text"
            rows={5}
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
        </section>
      </article>
    </>
  );
}

export default Article;
