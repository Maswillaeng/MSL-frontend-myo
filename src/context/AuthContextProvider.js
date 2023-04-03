import React, {createContext, useEffect, useState} from 'react';

// context 초기값 셋팅
const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userInfo: {},
    setUserInfo: () => {},
    loginHandler: () => {},
    logoutHandler: () => {},
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

    // 유저 정보 저장
    const [userInfo, setUserInfo] = useState({
        email: "",
        nickname : "",
        userImage : "",
        introduction : "",
    })
    // 유저 정보 변경

    // 로그인 & 로그아웃 처리
    const loginHandler = (accessToken, refreshToken) => {
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };

    // 로그아웃 시 토큰 지우기
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                userInfo,
                setUserInfo,
                loginHandler,
                logoutHandler,
        }}>
            { props.children }
        </AuthContext.Provider>
    );
};
export default AuthContext;