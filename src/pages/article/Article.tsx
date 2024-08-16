import {
  MDBAccordion,
  MDBAccordionItem,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import "./article.scss";
import { useOutletContext, useParams } from "react-router-dom";
import { UseArticle } from "../../Contexts/ArticleContext.tsx";
import { useState } from "react";
import CommentArea from "../../components/article/CommentArea.tsx";
import { UserInfo } from "../../types/UserInfo.type.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import { useGetPostByIdQuery } from "../../app/features/api/apiSlice.ts";

function Article() {
  const { id } = useParams();
  const userInfo: UserInfo = useOutletContext();
  const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;

  const articleRedux = useAppSelector(state => 
    state.articles.find(article => article._id ===id)
  )
  const {data, error, isLoading} = useGetPostByIdQuery(id as string);
  // @ts-ignore
  const { createFrenchDate, postComment } = UseArticle();
  const headerBackgroudImage = `
  linear-gradient(to bottom, rgba(11, 32, 47, 1) 0%, rgba(11, 32, 47, 0) 66%),
  url(${backendUrl}/public${articleRedux?.pictures[0]})
  `;

  const [comment, setComment] = useState({
    userId: userInfo?.id,
    userPseudo: userInfo?.pseudo,
    text: "",
  });
  const creationDate = data?.createdAt ? createFrenchDate(data.createdAt) : "Date non disponible";

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
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
  if(isLoading) {
    return (
      <section>
        <h2>hold on...</h2>
      </section>
    )
  }
  if(error) {
    return(
      <section>
        <h2>error</h2>
      </section>
    )
  }
  if(!data) {
    return (
      <section>
        <h2>error;
        </h2>
      </section>
    )
  }
  return (
    <>
      <article className="blog-article">
        <header
          className="article-header"
          style={{ backgroundImage: headerBackgroudImage }}
        >
          <h1>{data.title}</h1>
          <p>{`Le ${creationDate}`}</p>
        </header>
        <section className="article-text-area">
          <p className="article-text">{data.text}</p>
        </section>
        <section className="carousel-area">
          <section className="carousel">
            <MDBCarousel showControls>
              <MDBCarouselItem itemId={1}>
                <img
                  src={`${backendUrl}/public${data.pictures[0]}`}
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
                articleComments={data.comments}
              />
            </MDBAccordionItem>
          </MDBAccordion>
        </section>
        <form onSubmit={handleComment}>
        <section className="comments-area">
          <textarea
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
          >
            envoyer
          </button>
        </section>
        </form>
      </article>

    </>
  );
}

export default Article;
