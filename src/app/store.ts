import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { articleApi } from "./features/api/articleApi.ts";
import { AuthApi } from "./features/api/authApi.ts";
import articleReducer from "./features/article/articleSlice.ts";
import counterReducer from "./features/counter/counterSlice.ts";
import authReducer from "./features/auth/authSlice.ts";
import { rootApi } from "./features/api/rootApi.ts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "articles", "counter"],
};

const rootReducer = combineReducers({
  articles: articleReducer,
  counter: counterReducer,
  auth: authReducer,
  [rootApi.reducerPath]: rootApi.reducer,
  // SI pas re rootApi.reducer, besoin de rajouter tous les reducers des api
  // [articleApi.reducerPath]: articleApi.reducer,
  // [AuthApi.reducerPath]: AuthApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // doit etre concatené avec les middleware des api
      // dans ce cas celui de root car il regroupe toutes les api
    }).concat(rootApi.middleware),
});

export default store;

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
