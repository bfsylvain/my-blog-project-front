import { Link, useOutletContext } from "react-router-dom";
import Card from "../../components/cardList/card/card/Card.tsx";
import "./cardList.scss";
import { ReactNode, useEffect } from "react";
import { UseArticle } from "../../Contexts/ArticleContext.tsx";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";

import { useAppSelector } from "../../store/hooks.ts";

function CardList() {
  // @ts-ignore
  const { cardList, fetchArticles } = UseArticle();
  const userInfo = useOutletContext();

  const cardListRedux = useAppSelector(state => state.articles)

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  return (
    <section className="card-page">
      <section className="add-article">
        {userInfo ? (
          <Link to={"/new-article"}>
            <button className="add-article-btn">Ajouter un article</button>
          </Link>
        ) : null}
      </section>
      <section className="card-area">
        {cardList.map((article: ArticleDetail) => (
          <Card key={article._id} article={article} />
        ))}
      </section>
      <section className="card-area">
        {cardListRedux.map((article: ArticleDetail)=> (
          <Card key={article._id} article={article}></Card>
        ))}
      </section>
    </section>
  );
}

export default CardList;
