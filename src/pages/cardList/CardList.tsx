import { Link, useOutletContext } from "react-router-dom";
import Card from "../../components/cardList/card/card/Card.tsx";
import "./cardList.scss";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";
import { UserInfo } from "../../types/UserInfo.type.tsx";

import { useGetArticlesQuery } from "../../app/features/api/articleApi.ts";

function CardList() {
  // @ts-ignore
  const userInfo: UserInfo = useOutletContext();

  const { data: articleListRTK, error, isLoading } = useGetArticlesQuery();
  
  return (
    <section className="card-page">
      <section className="add-article">
        {userInfo && (
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
