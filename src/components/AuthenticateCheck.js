import React, { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import MyPage from "../pages/MyPage";
import Board from "../pages/Board";
import Join from "../pages/Join";
import BoardWrite from "../pages/BoardWrite";
import BoardDetail from "../pages/BoardDetail";
import BoardEdit from "../pages/BoardEdit";

const AuthenticateCheck = ({ path, auth }) => {
  // 접근 제어
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그인 한 유저가 권한이 비로그인 페이지에 접근하려 할 때
  if (auth === false) {
    if (isLoggedIn) {
      navigate("/", { replace: true });
      alert("로그인 상태입니다!");
    }
  }

  return (
    <>
      {path === "/" && <Board />}
      {path === "/LoginForm" && <LoginForm />}
      {path === "/UserPage/:nickname" && <MyPage />}
      {path === "/Join" && <Join />}
      {path === "/BoardWrite" && <BoardWrite />}
      {path === "/Board/:postId" && <BoardDetail />}
      {path === "/BoardEdit/:postId" && <BoardEdit />}
    </>
  );
};

export default AuthenticateCheck;
