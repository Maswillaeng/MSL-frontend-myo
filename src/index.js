import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";

//import Boardwrite from "./pages/BoardWrite";
import Header from "./components/Header";

import { Provider } from "react-redux";
import store from "./actions/store";
import BoardDetail from "./pages/BoardDetail";
import Board from "./pages/Board";
import LoginForm from "./pages/LoginForm";
import MyPage from "./pages/MyPage";
import BoardWrite from "./pages/BoardWrite";
import axios from "axios";
import Join from "./pages/Join";
// import PrivateRoute from "./routes/PrivateRoute";

// axios 쿠키 주고 받기
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/Board" element={<BoardDetail />} />
          <Route
            path="/BoardWrite"
            element={<BoardWrite />}
            // element={<PrivateRoute path="/BoardWrite" component={BoardWrite} />}
          />
          <Route path="/MyPage/:userId" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
