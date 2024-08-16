import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import articleReducer from "./features/article/articleSlice.ts";
import counterReducer from "./features/counter/counterSlice.ts";
import authReducer from "./features/auth/authSlice.ts";

const store = configureStore({
  reducer: {
    articles: articleReducer,
    counter: counterReducer,
    authentification: authReducer
  },
});
export default store;

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
