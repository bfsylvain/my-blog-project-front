import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { decrement, increment, incrementByAmount, reset } from '../../app/features/counter/counterSlice.ts';

function Counter() {

    const [incrementAmount, setIncrementAmount] = useState("2");
    const incrementValue = Number(incrementAmount) || 0;

    const dispatch = useAppDispatch();
    const count = useAppSelector((state) => state.counter.value);

  return (
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

  )
}

export default Counter
