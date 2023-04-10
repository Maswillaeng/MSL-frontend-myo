import React, {useContext, useEffect} from 'react';
import AuthContext from "../context/AuthContextProvider";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import MyPage from "../pages/MyPage";
import Board from "../pages/Board";
import Join from "../pages/Join";
import BoardWrite from "../pages/BoardWrite";
import BoardDetail from "../pages/BoardDetail";

const AuthenticateCheck = ({ path, auth }) => {
    // 로그인 만료시간 체크용 컴포넌트 테스트 중이에요
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    // 로그인 한 유저가 권한이 비로그인 페이지에 접근하려 할 때
    if(auth === false) {
        if(isLoggedIn){
            navigate("/", { replace: true })
            alert("로그인 상태입니다!")
        }
    } if(auth === true) {
        if(!isLoggedIn){
            navigate("/LoginForm", { replace: true })
            alert("로그인이 필요합니다!")
        }
    } if (auth === null) {
    }
    // useEffect(() => {
        // const tokenUpdate = async () => {
        // try {
        //     const tokenRes = await axios.post("/api/auth/issue")
        //
        // } catch (err) {
        //
        // }
        // }
    // },[])

    return (
        <>
            {
                path === "/" && <Board />
            }
            {
                path === "/LoginForm" && <LoginForm />
            }
            {
                path === "/UserPage/:nickname" && <MyPage />
            }
            {
                path === "/Join" && <Join />
            }
            {
                path === "/BoardWrite" && <BoardWrite />
            }
            {
                path === "/Board/:postId" && <BoardDetail />
            }
        </>
    );
};

export default AuthenticateCheck;