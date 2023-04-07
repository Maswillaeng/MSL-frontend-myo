import React, {createContext, useEffect, useState} from 'react';
import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";

// context 초기값 셋팅
const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    loginUser: {},
    loginHandler: () => {},
    logoutHandler: () => {},
    getUser: () => {},
});

// 로그인 시, 유저정보 저장 - 로컬에 recoil이 자동 저장
const { persistAtom } = recoilPersist();
export const setLoginUser = atom({
    key: "loginUser",
    default: {
        userId: "",
    },
    effects_UNSTABLE: [persistAtom],
});

export const getLoginUser = selector({
    key: "getLoginUser",
    get: ({ get }) => {
        const userId = get(setLoginUser);
        return userId;
    },
});

export const AuthContextProvider = (props) => {
    // 로컬에 있는 토큰 가져오기
    const initialToken = localStorage.getItem("accessToken");
    const [token, setToken] = useState(initialToken);

    // 로그인 상태 확인
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if(token){
            setIsLoggedIn(true)
        }else
            setIsLoggedIn(false)
    },[])

    // 로그인 & 로그아웃 처리
    const loginHandler = (accessToken, refreshToken) => {
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };
    // 로그아웃 시 토큰 지우기
    const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loginHandler,
                logoutHandler,
                token,
        }}>
            { props.children }
        </AuthContext.Provider>
    );
};
export default AuthContext;