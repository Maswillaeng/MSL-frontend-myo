import React, {useContext, useEffect} from 'react';
import AuthContext from "../context/AuthContextProvider";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthenticateCheck = () => {

    // 로그인 만료시간 체크용 컴포넌트 테스트 중이에요

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    if(!isLoggedIn) {
        alert("로그인이 필요합니다.")
        navigate("/Login")
    }
    //
    // useEffect(() => {
    //     const tokenUpdate = async () => {
    //     try {
    //         const tokenRes = await axios.post("/api/auth/issue")
    //
    //     }
    //     }
    //
    //
    // },[])

    return (
        <>

        </>
    );
};

export default AuthenticateCheck;