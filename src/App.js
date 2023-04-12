import "./App.css";
import "./style/input.css";
import Header from "./components/Header";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext, { getLoginUser } from "./context/AuthContextProvider";
import { useRecoilValue } from "recoil";

function App() {
  const { updateToken } = useContext(AuthContext);
  const userId = useRecoilValue(getLoginUser);
  // (() => { console.warn = console.error = () => {}} )();
  // 렌더링 될 때 마다 토큰 재 발급
  useEffect(() => {
    updateToken();
  }, [userId]);

<<<<<<< HEAD
    const { updateToken } = useContext(AuthContext)
    const userId = useRecoilValue(getLoginUser);
    // (() => { console.warn = console.error = () => {}} )();
    // 렌더링 될 때 마다 토큰 재 발급
    useEffect(() => {
        window.addEventListener('load', updateToken);
        return () => {
            window.removeEventListener('load', updateToken);
        };
    },[])

    return (
        <>
            <Header userId={ userId } />
            <Outlet/>
        </>
    );
=======
  return (
    <>
      <Header userId={userId} />
      <Outlet />
    </>
  );
>>>>>>> 0b53eb3 (feat:대댓글 기능)
}

export default App;
