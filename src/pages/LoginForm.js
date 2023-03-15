import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { setCookie } from "../function/cookies";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/reducers/AuthReducer";

const LoginForm = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [errmessage, setErrmessage] = useState("");

  // 유저 입력 데이터 묶기
  const [join, setJoin] = useState({
    email: "",
    password: "",
  });

  const inputValue = (e) => {
    const { name, value } = e.target;
    setJoin({
      ...join,
      [name]: value,
    });
  };
  const { email, password } = join;
  // 로그인 유효성
  const loginSubmit = (e) => {
    e.preventDefault();

    //유효성 검사
    if (email === "" || password === "") {
      setErrmessage("아이디 비밀번호를 입력해주세요");
      return;
    }
    loginForm();
    // 요청 (맞는 문법인지 아직 모르겠음)
    // axios.post(`http://localhost:8000/login`,{
    // id: userId,
    // password: userPwd
    // },{ headers: {
    //         "Content-Type": `application/json`,
    //     },
    // })
    //     .then(res => {
    //         console.log(res)
    //
    //         // 받아온 토큰 저장 처리
    //         setCookie(user.email)
    //         sessionStorage.setItem('access',res.data.accessToken);
    //         // 만료시간..?
    //         sessionStorage.setItem('accessTime',res.data.tokenTime);
    //         navigation("/");
    // }).catch(err => {
    // console.log(err.exception)
    // setErrmessage('아이디 또는 비밀번호가 맞지 않습니다');
    // })
  };
  const loginForm = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      dispatch(setToken(data.jwt));
      alert("로그인 성공");
      setTimeout(() => {
        navigation("/");
      }, 2000);
    } catch (e) {
      console.log("error");
    }
  };
  return (
    <div>
      <div
        className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/03/18/18/54/drink-3237895_1280.jpg)",
        }}
      >
        <div className="rounded-xl bg-[#FBF9EC] bg-opacity-40 px-44 py-20 shadow-lg backdrop-blur-md max-sm:px-14">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center text-2xl">
              <Link to="/">
                Mashillaeng
                {/*<img src="https://www.logo.wine/logo.svg" width="150" alt="" srcset="" />*/}
              </Link>
            </div>

            <form onSubmit={loginSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-gray-50 bg-opacity-20 px-6 py-2 placeholder-slate-100 outline-none backdrop-blur-md"
                  onChange={inputValue}
                  value={email}
                  name="email"
                  type="text"
                  placeholder="아이디"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-gray-50 bg-opacity-20 px-6 py-2 placeholder-slate-100 outline-none backdrop-blur-md"
                  onChange={inputValue}
                  value={password}
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                />
                <div className="text-center font-bold text-white">
                  {errmessage}
                </div>
              </div>
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="rounded-3xl bg-[#EA4E4E] px-24 py-2 text-white shadow-xl duration-300 hover:bg-red-300"
                >
                  로그인
                </button>
              </div>
              <div className="flex justify-around mt-5 text-sm">
                <Link to="/Join" className="hover:text-[#EA4E4E]">
                  회원가입
                </Link>
                <Link to="" className="hover:text-[#EA4E4E]">
                  아이디 / 비밀번호 찾기
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
