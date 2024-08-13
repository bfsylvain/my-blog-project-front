import { configureStore } from "@reduxjs/toolkit";
import articleReducer from './article/articleSlice.ts';
import counterReducer from './counter/counterSlice.ts';

const store = configureStore({
  reducer: {
    articles: articleReducer,
    counter: counterReducer,
  },
});
export default store;

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
