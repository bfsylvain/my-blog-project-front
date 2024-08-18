import {
  MDBAccordion,
  MDBAccordionItem,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import "./article.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CommentArea from "../../components/article/CommentArea.tsx";
import Loader from "../../loaders/spinnerLoader/SpinnerLoader.jsx";
import { useCommentArticleMutation, useGetArticleByIdQuery } from "../../app/features/api/articleApi.ts";
import useDateTransform from "../../hooks/useDateTransform.ts";
import { useAppSelector } from "../../app/hooks.ts";

function Article() {
  const { id } = useParams();
  const BASE_URL: string = import.meta.env.VITE_BACKEND_URL as string;
  const userRTK = useAppSelector((state) => state.auth)

  const { data: article, error, isLoading } = useGetArticleByIdQuery(id as string);
  const [commentArticle] = useCommentArticleMutation();

  const {frenchDateLong} = useDateTransform();

  const headerBackgroudImage = `
  linear-gradient(to bottom, rgba(11, 32, 47, 1) 0%, rgba(11, 32, 47, 0) 66%),
  url(${BASE_URL}/public${article?.pictures[0]})
  `;

  const [comment, setComment] = useState({
    userId: userRTK.id,
    userPseudo: userRTK.pseudo,
    text: "",
  });

  const creationDate = article?.createdAt
  ? frenchDateLong(article.createdAt)
  : "Date non disponible";

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentRTK = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(comment.text) {
      try {
        await commentArticle({articleId: id as string, commentData: comment}).unwrap();
        setComment({
          userId: userRTK.id,
          userPseudo: userRTK.pseudo,
          text: "",
        });  
      } catch(error) {
        console.error("Failed to create comment", error)
      }
    }
  }

  return (
    <div className="element">
      {error ? (
        <>An error occured...</>
      ) : isLoading ? (
        <Loader/>     
      ) : article ? (
        <article className="blog-article">
          <header
            className="article-header"
            style={{ backgroundImage: headerBackgroudImage }}
          >
            <h1>{article.title}</h1>
            <p>{`Le ${creationDate}`}</p>
          </header>
          <section className="article-text-area">
            <p className="article-text">{article.text}</p>
          </section>
          <section className="carousel-area">
            <section className="carousel">
              <MDBCarousel showControls>
                <MDBCarouselItem itemId={1}>
                  <img
                    src={`${BASE_URL}/public${article.pictures[0]}`}
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
                <CommentArea articleComments={article.comments} />
              </MDBAccordionItem>
            </MDBAccordion>
          </section>
          <form onSubmit={handleCommentRTK}>
            <section className="comments-area">
              <textarea
                rows={5}
                name="text"
                id=""
                placeholder="Votre commentaire"
                value={comment.text}
                onChange={onChange}
              />
              <button className="send-comment-btn" type="submit">
                envoyer
              </button>
            </section>
          </form>
        </article>
      ) : null}
    </div>
  );
}

export default Article;
