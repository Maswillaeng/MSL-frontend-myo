import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { setCookie } from "../function/cookies";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/User.js";
import { fetchToken } from "../api/User.js";
import { setRefreshToken } from "../storage/Cookie";
import { SET_TOKEN } from "../store/Auth";

const LoginForm = () => {
  const navigate = useNavigate();
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
    onValid();

    // 요청 (testing)
    //   axios.post(`/api/auth/login/`,{
    //   email: email,
    //   password: password
    //   },{
    //   headers: {
    //     "Content-Type": `application/json`,
    //       },
    //   })
    //       .then(res => {
    //           console.log(res)
    //           navigate("/");
    //   }).catch(err => {
    //   console.log(err.exception)
    //   setErrmessage('아이디 또는 비밀번호가 맞지 않습니다');
    // })
  };
  const onValid = async () => {
    try {
      // 토큰을 받아옴
      const token = await fetchToken({ email, password });

      // 로그인 API 호출
      const response = await loginUser({ email, password, token });
      console.log(response.status);
      // 로그인 성공 처리
      if (response.status === 200) {
        setRefreshToken(response.refresh_token);
        dispatch(SET_TOKEN(response.access_token));
        console.log("성공");
        return navigate("/");
      }
    } catch (error) {
      // 로그인 실패 처리
      setJoin((prevState) => ({ ...prevState, password: "" }));
      setErrmessage("아이디 비밀번호가 일치하지않습니다");
      console.log("안됨");
      console.error(error);
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
                <div className="mt-3 text-center text-sm font-bold text-white">
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
