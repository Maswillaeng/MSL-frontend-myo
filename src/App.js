import "./App.css";
import "./style/input.css";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import BoardDetail from "./pages/BoardDetail";
import Board from "./pages/Board";
import LoginForm from "./pages/LoginForm";
import Logout from "./pages/LoginForm";
import MyPage from "./pages/MyPage";
import BoardWrite from "./pages/BoardWrite";
import axios from "axios";
import Join from "./pages/Join";
function App() {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAuthToken(token);
    }
  }, []);

  axios.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Board" element={<BoardDetail />} />
        <Route
          path="/BoardWrite"
          element={<BoardWrite />}
          // element={<PrivateRoute path="/BoardWrite" component={BoardWrite} />}
        />
        <Route path="/MyPage/:userId" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
