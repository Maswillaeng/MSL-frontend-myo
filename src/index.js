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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider user={user}> */}
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Board" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();
