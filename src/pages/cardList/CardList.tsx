import { Link } from "react-router-dom";
import Card from "../../components/cardList/card/card/Card.tsx";
import "./cardList.scss";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";
import { useGetArticlesQuery } from "../../app/features/api/articleApi.ts";
import { useAppSelector } from "../../app/hooks.ts";

function CardList() {

  const { data: articleListRTK, error, isLoading } = useGetArticlesQuery();
  const userRTK = useAppSelector((state) => state.auth)
  
  return (
    <section className="card-page">
      <section className="add-article">
        {userRTK.id && (
          <Link to={"/new-article"}>
            <button className="add-article-btn">Ajouter un article</button>
          </Link>
        )}
      </section>
      {error ? (
        <>An error occured...</>
      ) : isLoading ? (
        <>Loading....</>
      ) : articleListRTK ? (
        <section className="card-area">
          {articleListRTK.map((article: ArticleDetail) => (
            <Card key={article._id} article={article}></Card>
          ))}
        </section>
      ) : null}
    </section>
  );
}

export default CardList;
