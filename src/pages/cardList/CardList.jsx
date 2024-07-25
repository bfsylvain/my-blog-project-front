import { Link, useOutletContext } from "react-router-dom";
import Card from "../../components/cardList/card/card/Card";
import "./cardList.scss";
import { useEffect } from "react";
import { UseArticle } from "../../Contexts/ArticleContext";

function CardList() {
  const {cardList, fetchArticles} = UseArticle();
const userInfo = useOutletContext();
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);


  return (
    <section className="card-page">
      <section className="add-article">
        {userInfo && 
        (<Link to={"/new-article"}>
          <button className="add-article-btn">Ajouter un article</button>
        </Link>)}
      </section>
      <section className="card-area">
        {cardList.map((article) => (
          <Card key={article._id} article={article}  />
        ))}
      </section>
    </section>
  );
}

export default CardList;
