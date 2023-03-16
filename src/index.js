import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import axios from "axios";
//import Boardwrite from "./pages/BoardWrite";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store";
// import PrivateRoute from "./routes/PrivateRoute";

// axios 쿠키 주고 받기
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      {" "}
      <Provider store={store}>
        <BrowserRouter>
          {" "}
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

reportWebVitals();
