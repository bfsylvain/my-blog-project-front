import { Link, useOutletContext } from "react-router-dom";
import Card from "../../components/cardList/card/card/Card.tsx";
import "./cardList.scss";
import { ReactNode, useEffect, useState } from "react";
import { UseArticle } from "../../Contexts/ArticleContext.tsx";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { decrement, increment, incrementByAmount } from "../../app/features/counter/counterSlice.ts";
import { UserInfo } from "../../types/UserInfo.type.tsx";
import { getAllArticlesAsync } from "../../app/features/article/articleSlice.ts";

function CardList() {
  // @ts-ignore
  const { cardList, fetchArticles } = UseArticle();
  const userInfo: UserInfo = useOutletContext();
  
  const cardListRedux = useAppSelector((state) => state.articles);
  
  const count = useAppSelector((state) => state.counter.value);
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0


  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchArticles();
    dispatch(getAllArticlesAsync())
  }, [fetchArticles]);
  return (
    <section className="card-page">
      <section className="add-article">
        {userInfo && (
          <Link to={"/new-article"}>
            <button className="add-article-btn">Ajouter un article</button>
          </Link>
        )}
      </section>
      <section className="card-area">
        {cardList.map((article: ArticleDetail) => (
          <Card key={article._id} article={article} />
        ))}
      </section>
      <section className="card-area">
        {cardListRedux.map((article: ArticleDetail) => (
          <Card key={article._id} article={article}></Card>
        ))}
      </section>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          type="number"
          onChange={e => {
            setIncrementAmount(e.target.value)
          }}
        />
        <button
          onClick={() => {
            dispatch(incrementByAmount(incrementValue))
          }}
        >
          Add Amount
        </button>
      </div>
      </div>
    </section>
  );
}

export default CardList;
