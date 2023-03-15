import { persistReducer } from "redux-persist";
import { AuthReducer } from "./reducers/AuthReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// local storage 사용
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  //local storage에 저장
  storage: storage,
};

const allReducers = combineReducers({
  Auth: AuthReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, allReducers),
  devTools:
    process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
});

export default store;
