import {
  MDBAccordion,
  MDBAccordionItem,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import "./article.scss";
import CardComment from "../../components/cardList/card/cardComment/CardComment";
import { useOutletContext, useParams } from "react-router-dom";
import { UseArticle } from "../../Contexts/ArticleContext";
import { useEffect, useState } from "react";

function Article() {
  const { id } = useParams();
  const userInfo = useOutletContext();
  const { backendUrl, createFrenchDate, fetchArticleById, postComment } =
    UseArticle();
  const [article, setArticle] = useState();
  const headerBackgroudImage = `
  linear-gradient(to bottom, rgba(11, 32, 47, 1) 0%, rgba(11, 32, 47, 0) 66%),
  url(${backendUrl}/public${article?.pictures[0]})
  `;

  const [comment, setComment] = useState({
    userId: userInfo?.id,
    userPseudo: userInfo?.pseudo,
    text: "",
  });
  const creationDate = article ? createFrenchDate(article.createdAt) : "";

  useEffect(() => {
    const loadArticle = async () => {
      const articleData = await fetchArticleById(id);
      setArticle(articleData);
    };
    loadArticle();
  }, [fetchArticleById, id, createFrenchDate, article?.updatedAt]);

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleComment = (e) => {
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
      {article && (
        <article className="blog-article">
          <header
            className="article-header"
            style={{ backgroundImage: headerBackgroudImage }}
          >
            <h1>{article?.title}</h1>
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
                    src={`${backendUrl}/public${article.pictures[0]}`}
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
                {article.comments.map((comment) => (
                  <CardComment key={comment._id} comment={comment} />
                ))}
              </MDBAccordionItem>
              {userInfo && (
                <MDBAccordionItem
                  collapseId={2}
                  headerTitle="Laisser un commentaire"
                >
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
                </MDBAccordionItem>
              )}
            </MDBAccordion>
          </section>
        </article>
      )}
    </>
  );
}

export default Article;
