import React from "react";
import { useState, useRef } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/store";

const Join = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("/img/user.jpg");
  const fileInput = useRef(null);
  const [introduction, setIntroduction] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [emailNotice, setEmailNotice] = useState({});
  const [passNotice, setPassNotice] = useState({});
  const [confirmPassNotice, setConfirmPassNotice] = useState({});
  const [nameNotice, setNameNotice] = useState({});
  const [numNotice, setNumNotice] = useState({});
  // 이메일 정규식 : 영문자와 숫자만
  const regexrEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  ///^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,15}$/;
  // 비밀번호 형식
  const regexrPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  //  닉네임 형식
  const regexrName = /^[가-힣a-zA-Z]{3,10}$/;
  //  핸드폰 번호 형식
  const regexrNum = /^01(0|1|6|7|8|9)\d{7,8}$/;

  //프로필 이름 변경
  const onChange = (e) => {
    if (e.target.files[0]) {
      setUserImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setUserImage("/img/user.jpg");
      return;
    }
    //화면에 프로필 사진 표시 :FileReader API
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // 자기소개

  const onIntroductionHandler = (e) => {
    setIntroduction(e.currentTarget.value);
  };
  // email 검사
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onBlurEmailHandler = (e) => {
    if (email === "") {
      setEmailNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrEmail.test(email)) {
      setEmailNotice({
        message: "올바른 이메일 형식으로 작성해주세요",
        alert: false,
      });
      return;
    } else {
      setEmailNotice({
        message: "사용가능한 이메일입니다.",
        alert: true,
      });
    }
  };
  // Password 검사
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onBlurPasswordHandler = (e) => {
    if (password === "") {
      setPassNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrPass.test(password)) {
      setPassNotice({
        message: "1개 이상 영문과 숫자가 포함한 문자 8~15자리로 입력해주세요",
        alert: false,
      });
      return;
    } else {
      setPassNotice({
        message: "",
        alert: true,
      });
    }
  };
  // confirmPassword 검사
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onBlurConfirmPasswordHandler = (e) => {
    if (confirmPassword === "") {
      setConfirmPassNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (password !== confirmPassword) {
      setConfirmPassNotice({
        message: "비밀번호가 일치하지 않습니다.",
        alert: false,
      });
      return;
    } else {
      setConfirmPassNotice({
        message: "",
        alert: true,
      });
    }
  };
  // 닉네임 검사
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onBlurNameHandler = (e) => {
    if (name === "") {
      setNameNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrName.test(name)) {
      setNameNotice({
        message: "3~10자리 한글과 영문으로 이루어진 닉네임을 작성해주세요",
        alert: false,
      });
      return;
    }
    setNameNotice({
      message: "",
      alert: true,
    });
    return;
  };
  // 전화번호 검사
  const onNumberHandler = (e) => {
    setNumber(e.currentTarget.value);
  };

  const onBlurNumHandler = (e) => {
    if (number === "") {
      setNumNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrNum.test(number)) {
      setNumNotice({
        message: "전화번호 형식에 맞게 입력해주세요",
        alert: false,
      });
      return;
    } else {
      setNumNotice({
        message: "",
        alert: true,
      });
    }
  };

  //전송
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let userData = {
      email: email,
      pw: password,
      nickname: name,
      phoneNumber: number,
      userImage: userImage,
      introduction: introduction,
    };

    if (
      !emailNotice.alert ||
      !passNotice.alert ||
      !confirmPassNotice.alert ||
      !nameNotice.alert
      //!numNotice.alert
    ) {
      // 오류가 있으면 처리하지 않음
      dispatch(registerUser(userData)).then((response) => {
        if (response.payload.success) {
          console.log(response.data);
        } else {
          alert("Error");
        }
      });
    }
    return alert("성공");
  };
  //---------------------
  return (
    <div className="py-14 flex items-center justify-center ">
      <div className="w-96 mx-auto text-center">
        {" "}
        <h1 className="mb-10 font-black text-3xl ">MASHILLAENG</h1>
        <form className=" text-left" onSubmit={onSubmitHandler} method="post">
          <div className="relative my-10 ">
            <div className="w-40 h-40 border-2 rounded-full mx-auto overflow-hidden">
              <img src={userImage} className="w-40 h-40" alt="" />
              <input
                type="file"
                accept="image/*"
                name="profile_img"
                onChange={onChange}
                ref={fileInput}
                className="hidden "
              />
            </div>
            <button
              className="absolute right-24 top-2/3"
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <AiFillPlusCircle className="text-red-500 text-5xl " />
            </button>
          </div>
          <div className="flex flex-col ">
            <label className="mb-3 text-sm ">자기소개</label>
            <input
              className=" mb-3 p-2 border "
              type="text"
              name="introduction"
              value={introduction}
              onChange={onIntroductionHandler}
              placeholder="소개글을 작성해주세요"
            />
          </div>

          <div className="flex flex-col ">
            <label className="mb-3 text-sm">아이디(이메일)</label>
            <input
              className=" mb-3 p-2 border "
              type="text"
              name="email"
              value={email}
              onChange={onEmailHandler}
              onBlur={onBlurEmailHandler}
              placeholder="이메일 입력"
            />
            <div className="font-bold mb-3 text-xs text-right">
              {emailNotice.alert ? (
                <span className="text-black">{emailNotice.message}</span>
              ) : (
                <span className="text-red-500">{emailNotice.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col relative">
            <label className="mb-3 text-sm">비밀번호 </label>
            <input
              className="mb-3 p-2 border "
              type="password"
              name="pass"
              value={password}
              onChange={onPasswordHandler}
              onBlur={onBlurPasswordHandler}
              placeholder="비밀번호 입력"
            />
            {passNotice.alert ? (
              <FaLockOpen className="text-lime-600 absolute right-4 top-11" />
            ) : (
              <FaLock className="text-slate-300 absolute right-4 top-11" />
            )}

            <div className="font-bold mb-3 text-xs text-right">
              {" "}
              {passNotice.alert ? (
                <span className="text-black">{passNotice.message}</span>
              ) : (
                <span className="text-red-500 ">{passNotice.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col relative">
            <label className="mb-3 text-sm ">비밀번호 재확인</label>
            <input
              className="mb-5 p-2 border "
              type="password"
              name="repass"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              onBlur={onBlurConfirmPasswordHandler}
              placeholder="비밀번호 재입력"
            />
            {confirmPassNotice.alert ? (
              <FaLockOpen className="text-lime-600 absolute right-4 top-11" />
            ) : (
              <FaLock className="text-slate-300 absolute right-4 top-11" />
            )}

            <div className="font-bold mb-3 text-xs text-right">
              {" "}
              {confirmPassNotice.alert ? (
                <span className="text-black">{confirmPassNotice.message}</span>
              ) : (
                <span className="text-red-500">
                  {confirmPassNotice.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="mb-3 text-sm">닉네임</label>
            <input
              className="mb-5 p-2 border"
              type="text"
              name="repass"
              value={name}
              onChange={onNameHandler}
              onBlur={onBlurNameHandler}
              placeholder="닉네임 입력"
            />
            <div className="font-bold mb-3 text-xs text-right">
              {nameNotice.alert ? (
                <span className="text-black">{nameNotice.message}</span>
              ) : (
                <span className="text-red-500">{nameNotice.message}</span>
              )}
            </div>
          </div>
          <div className="">
            <div className="mb-5">
              {" "}
              <div className="flex flex-col">
                <label className="mb-3 text-sm">휴대전화</label>
                <div className="flex flex-wrap justify-between gap-5 ">
                  {" "}
                  <input
                    type="text"
                    name="number"
                    className="w-3/5 p-2 border flex-1 "
                    placeholder="전화번호 입력"
                    value={number}
                    onChange={onNumberHandler}
                    onBlur={onBlurNumHandler}
                  />
                  <button className="text-sm bg-red-500 px-4 font-bold text-white flex-none ">
                    {" "}
                    인증번호 받기
                  </button>
                </div>
                <div className="font-bold mb-3 text-xs text-left ">
                  {numNotice.alert ? (
                    <span className="text-black ">{numNotice.message}</span>
                  ) : (
                    <span className="text-red-500 ">{numNotice.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <input
              type="text"
              name="repass"
              className="w-full p-2 border bg-transparent"
              placeholder="인증번호 입력하세요"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className=" w-full bg-red-500 p-5 font-bold text-white"
            >
              {" "}
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
