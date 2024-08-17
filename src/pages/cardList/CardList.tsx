import { Link, useOutletContext } from "react-router-dom";
import Card from "../../components/cardList/card/card/Card.tsx";
import "./cardList.scss";
import { ArticleDetail } from "../../types/ArticleDetail.type.tsx";
import { UserInfo } from "../../types/UserInfo.type.tsx";

import { useGetArticlesQuery } from "../../app/features/api/articleApi.ts";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "../../app/features/counter/counterSlice.ts";
import { useState } from "react";

function CardList() {
  // @ts-ignore
  const userInfo: UserInfo = useOutletContext();

  const { data: articleListRTK, error, isLoading } = useGetArticlesQuery();
  
  const [incrementAmount, setIncrementAmount] = useState("2");
  const incrementValue = Number(incrementAmount) || 0;
  
  const dispatch = useAppDispatch();

  const count = useAppSelector((state) => state.counter.value);

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
            onChange={(e) => {
              setIncrementAmount(e.target.value);
            }}
          />
          <button
            onClick={() => {
              dispatch(incrementByAmount(incrementValue));
            }}
          >
            Add Amount
          </button>
        </div>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </section>
  );
}

export default CardList;
