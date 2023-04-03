import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from './context/AuthContextProvider';
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store";

// axios 쿠키 주고 받기 -> localstorage로 변경 됨
// axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
      <AuthContextProvider>
        <CookiesProvider>
          {" "}
          <Provider store={store}>
            <BrowserRouter>
              {" "}
              <App />
            </BrowserRouter>
          </Provider>
        </CookiesProvider>
      </AuthContextProvider>
  </>
);

reportWebVitals();
