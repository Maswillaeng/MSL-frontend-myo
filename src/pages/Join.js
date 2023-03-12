import React from "react";
import { useState, useRef } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
//import { useDispatch } from "react-redux";
//import { registerUser } from "../actions/store";

const Join = () => {
  //const dispatch = useDispatch();
  const [join, setJoin] = useState({
    email: "",
    usableEmail: false,
    password: "",
    confirmPassword: "",
    nickname: "",
    //number: number,
    userImage: "/img/user.jpg",
    introduction: "",
  });

  const fileInput = useRef(null);

  const [emailNotice, setEmailNotice] = useState({});
  const [passNotice, setPassNotice] = useState({});
  const [confirmPassNotice, setConfirmPassNotice] = useState({});
  const [nicknameNotice, setNicknameNotice] = useState({});
  const [numNotice, setNumNotice] = useState({});
  // 이메일 정규식 : 영문자와 숫자만
  const regexrEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  ///^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,15}$/;
  // 비밀번호 형식
  const regexrPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  //  닉네임 형식
  const regexrNickname = /^[가-힣a-zA-Z]{3,10}$/;
  //  핸드폰 번호 형식
  const regexrNum = /^01(0|1|6|7|8|9)\d{7,8}$/;

  //프로필 이름 변경

  const onChange = (e) => {
    if (e.target.files[0]) {
      let copy = { ...join };
      copy.userImage = e.target.files[0];
      setJoin(copy);
    } else {
      //업로드 취소할 시
      let copy = { ...join };
      copy.userImage = "/img/user.jpg";
      setJoin(copy);
      return;
    }

    //화면에 프로필 사진 표시 :FileReader API
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        let copy = { ...join };
        copy.userImage = reader.result;
        setJoin(copy);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // 자기소개

  const onIntroductionHandler = (e) => {
    let copy = { ...join };
    copy.introduction = e.currentTarget.value;
    setJoin(copy);
  };
  // email 검사 & 중복검사
  const onEmailHandler = (e) => {
    let copy = { ...join };
    copy.email = e.currentTarget.value;
    setJoin(copy);
  };
  const onBlurEmailHandler = async () => {
    let { email } = join;
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
      // setEmailNotice({
      //   message: "사용가능한 이메일입니다.",
      //   alert: true,
      // });
      try {
        const response = await axios.post(
          "/api/auth/duplicate/email",
          { email },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          setEmailNotice({ message: "사용 가능한 이메일입니다.", alert: true });
          setJoin((prevState) => ({
            ...prevState,
            usableEmail: true,
          }));
        } else if (response.status === 409) {
          setEmailNotice({
            message: "이미 사용중인 이메일입니다.",
            alert: false,
          });
          setJoin((prevState) => ({
            ...prevState,
            usableEmail: false,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Password 검사
  const onPasswordHandler = (e) => {
    let copy = { ...join };
    copy.password = e.currentTarget.value;
    setJoin(copy);
  };
  const onBlurPasswordHandler = (e) => {
    let { password } = join;
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
    let copy = { ...join };
    copy.confirmPassword = e.currentTarget.value;
    setJoin(copy);
  };
  const onBlurConfirmPasswordHandler = (e) => {
    let { confirmPassword } = join;
    let { password } = join;
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
  // 닉네임 검사 & 중복검사
  const onNicknameHandler = (e) => {
    let copy = { ...join };
    copy.nickname = e.currentTarget.value;
    setJoin(copy);
  };

  const onBlurNicknameHandler = async () => {
    let { nickname } = join;
    if (nickname === "") {
      setNicknameNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrNickname.test(nickname)) {
      setNicknameNotice({
        message: "3~10자리 한글과 영문으로 이루어진 닉네임을 작성해주세요",
        alert: false,
      });
      return;
    } else {
      try {
        const response = await axios.post(
          "/api/auth/duplicate/name",
          { nickname },
          { headers: { "Context-Type": "application/json" } }
        );
        if (response.status === 200) {
          setNicknameNotice({
            message: "사용 가능한 닉네임입니다.",
            alert: true,
          });
          setJoin((prevState) => ({
            ...prevState,
            usableEmail: true,
          }));
        } else if (response.status === 409) {
          setNicknameNotice({
            message: "이미 사용중인 닉네임입니다.",
            alert: false,
          });
          setJoin((prevState) => ({
            ...prevState,
            usableEmail: false,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }

    return;
  };
  //전화번호 검사
  const onNumberHandler = (e) => {
    let copy = { ...join };
    copy.number = e.currentTarget.value;
    setJoin(copy);
  };

  // const onBlurNumHandler = (e) => {
  //   if (number === "") {
  //     setNumNotice({ message: "필수항목입니다.", alert: false });
  //     return;
  //   } else if (!regexrNum.test(number)) {
  //     setNumNotice({
  //       message: "전화번호 형식에 맞게 입력해주세요",
  //       alert: false,
  //     });
  //     return;
  //   } else {
  //     setNumNotice({
  //       message: "",
  //       alert: true,
  //     });
  //   }
  // };

  //전송
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !emailNotice.alert ||
      !passNotice.alert ||
      !confirmPassNotice.alert ||
      !nicknameNotice.alert
      //!numNotice.alert
    ) {
      return alert("작성");
    }
    joinSubmitData();
  };
  const joinSubmitData = async (e) => {
    const { email, password, nickname, phoneNumber, userImage, introduction } =
      join;
    let userData = {
      email,
      password,
      nickname,
      phoneNumber,
      userImage,
      introduction,
    };
    try {
      const response = await axios.post("/api/auth/sign", { userData });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 중복아이디 check
  // const checkId = async (e) => {
  //   e.preventDefault();
  //   const { usableEmail } = { join };
  //   try {
  //     const response = await axios.post(
  //       "/api/auth/sign",
  //       { usableEmail },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     if (response.status === 200) {
  //       alert("사용 가능한 아이디 입니다.");
  //       let copy = { ...join };
  //       copy.usableEmail = true;
  //       setJoin(copy);
  //     } else if (response.status === 409) {
  //       alert("이미 사용중인 아이디 입니다.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 중복 닉네임

  //---------------------
  return (
    <div className="py-14 flex items-center justify-center ">
      <div className="w-96 mx-auto text-center">
        {" "}
        <h1 className="mb-10 font-black text-3xl text-yellow-500 ">
          MASHILLAENG
        </h1>
        <form className=" text-left" onSubmit={onSubmitHandler} method="post">
          <div className="relative my-10 ">
            <div className="w-40 h-40 border-2 rounded-full mx-auto overflow-hidden">
              <img src={join.userImage} className="w-40 h-40" alt="" />
              <input
                type="file"
                accept="image/*"
                nickname="profile_img"
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
              value={join.introduction}
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
              value={join.email}
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
              value={join.password}
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
              value={join.confirmPassword}
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
              value={join.nickname}
              onChange={onNicknameHandler}
              onBlur={onBlurNicknameHandler}
              placeholder="닉네임 입력"
            />
            <div className="font-bold mb-3 text-xs text-right">
              {nicknameNotice.alert ? (
                <span className="text-black">{nicknameNotice.message}</span>
              ) : (
                <span className="text-red-500">{nicknameNotice.message}</span>
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
                    value={join.number}
                    onChange={onNumberHandler}
                    // onBlur={onBlurNumHandler}
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
