import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
//import Boardwrite from "./pages/BoardWrite";
import Header from "./components/Header";
import user from "./action/user";
import { Provider } from "react-redux";

import BoardDetail from "./pages/BoardDetail";
import Board from "./pages/Board";
import LoginForm from "./pages/LoginForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider user={user}> */}
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/Board" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();
