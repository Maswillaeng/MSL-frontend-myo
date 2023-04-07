import React, {useContext, useEffect, useRef, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {AiFillPlusCircle} from "react-icons/ai";
import {Grid} from "@mui/material";
import axios from "axios";
import AuthContext, {getLoginUser} from "../../context/AuthContextProvider";
import {useNavigate} from "react-router-dom";
import {replace} from "formik";
import {useRecoilValue} from "recoil";

const UserProfile = ({ member, token, visitUser }) => {
    const userId = useRecoilValue(getLoginUser);
    const [loginUserState, setLoginUserState] = useState({});

    // 회원 수정, 탈퇴, 팔로우 접근 제어용 현유저 정보 끌어오기
    useEffect(() => {
        const getLoginMember = async () => {
            const res = await axios.get(`/api/user/${userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data)
            return res.data;
        }
        getLoginMember()
            .then((user) => setLoginUserState(user)) // email, nickname, userImage, introduction
            .catch((err) => console.log(err))
    }, [])

    const navigate = useNavigate();
    // 프로필 수정 모달
    // 에러 메세지
    const [errMsg, setErrMsg] = useState("");
    // 모달 오프너, 클로저
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => {
        setModalOpen(true)
    }
    const handleClose = (e) => {
        e.preventDefault();
        setModalOpen(false)
        setProfileUpdateForm({
            nickname: member.nickname,
            userImage: imgFile,
            introduction: member.introduction,
            phoneNumber: "",
            password: "",
            newPwd: "",
            RnewPwd: "",
        })
        setErrMsg("")
        setNickNameConfirm(false)
        setPasswordConfirm(false)
        setNewPasswordConfirm(false)
        setPhoneNumberConfirm(false)
        console.log(member)
    }
    useEffect(() => {
        if(member.userImage === null) {
            return;
        }else {
            setImgFile(member.userImage)
        }
    },[])
    // 프로필 이미지 + 미리보기 + 경로 받아오기
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const handleImg = () => {
        // 미리보기 먼저 처리
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        // form-data 방식으로 이미지 경로 데이터 요청
        const formData = new FormData();
        formData.append("photo", file);
        let imgPath = "";
        if (file) { // 사진이 있는 경우
            axios.post("/api/user/upload", formData)
            .then((res) => {
                 imgPath = res.data;
                console.log(imgPath);
            })
                .catch((err) => {
                    console.log("이미지 경로 받아오기 실패")
                    console.log(err)
                })
        }

        // 미리보기 띄우기, 업데이트 폼에 받아온 이미지 경로 넣기
        reader.onload = () => {
            setImgFile(reader.result);
            setProfileUpdateForm({
                ...profileUpdateForm,
                userImage: imgPath
            })
        }
        console.log(profileUpdateForm)
    }

    // 유저데이터 업데이트 폼
    const [profileUpdateForm, setProfileUpdateForm] = useState({
        nickname: member.nickname,
        userImage: imgFile,
        introduction: member.introduction,
        phoneNumber: "",
        password: "",
        newPwd: "",
        RnewPwd: "",
        }
    );
    const { nickname, userImage, introduction, phoneNumber, password, newPwd, RnewPwd } = profileUpdateForm;

    // 입력 값 formData에 넣기
    const onCheckInputValue = (e) => {
        const { name, value } = e.target;
        setProfileUpdateForm({
            ...profileUpdateForm,
            [name] : value,
        })

        setErrMsg("")

        // 컨펌 통과 후 입력 값 변경 시 컨펌 초기화
        if (name === "nickname"){
        setNickNameConfirm(false)
        }else if (name === "password"){
        setPasswordConfirm(false)
        }else if (name === "newPwd" || name === "RnewPwd"){
        setNewPasswordConfirm(false)
        }else if (name === "phoneNumber"){
        setPhoneNumberConfirm(false)
        }
        console.log(profileUpdateForm)
    }

    // 유효성 검사
    const [nickNameConfirm, setNickNameConfirm] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState(false)
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(false)
    const [phoneNumberConfirm, setPhoneNumberConfirm] = useState(false)

    // 닉네임
    const checkNickname = /^[가-힣a-zA-Z]{2,10}$/;
    const onNicknameCheck = (e) => {
        e.preventDefault()
        if(nickname === ''){
            setErrMsg("닉네임을 입력해주세요")
            setNickNameConfirm(false)
            return;
        }else if(!checkNickname.test(nickname)) {
            setErrMsg("2자 이상의 한글이나, 영문으로 입력해주세요")
            setNickNameConfirm(false)
            return;
        }else {
            axios.post("/api/auth/duplicate/nickname",{
                nickname
            })
                .then((res) => {
                    if(res.status === 200) {
                        setNickNameConfirm(true)
                        setErrMsg("닉네임 사용 가능")
                    }
                    else if(res.status === 409) {
                        setErrMsg("닉네임 사용 불가")
                        setNickNameConfirm(false)
                        return;
                    }
                })
                .catch((err) => {
                    setErrMsg("닉네임 확인 중 서버 에러")
                    setNickNameConfirm(false)
                    console.log(err)
                    return;
            })
        }
    }
    // 현재 비밀번호 확인
    const passwordCheck = async (e) => {
        if(!userId){
         setErrMsg("로그인 정보 상이")
         return;
        }
        if(password === ''){
            setErrMsg("비밀번호를 입력해주세요")
            setPasswordConfirm(false)
            return;
        } else {
            await axios.post("/api/user/password",{
                userId: userId,
                password: password
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
            )
            .then((res) => {
                console.log(res)
                if(res.status === 200) {
                    setPasswordConfirm(true)
                    setErrMsg("")
                }else {
                    setErrMsg("현재 비밀번호가 일치하지 않습니다")
                    setPasswordConfirm(false)
                    return;
                }
            })
            .catch((err) => {
                setErrMsg("비밀번호 확인 중 서버 에러")
                setPasswordConfirm(false)
                console.log(err)
            })
        }
    }
    // 새 비밀번호
    const checkPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    const onNewPwdCheck = (e) => {
        if (newPwd !== '' || RnewPwd !== '') {
            if (newPwd !== RnewPwd) {
                setErrMsg("새 비밀번호가 일치하지 않습니다")
                setNewPasswordConfirm(false)
                return;
            } else if (!checkPwd.test(newPwd)) {
                setErrMsg("새 비밀번호를 1개 이상의 영문과 숫자가 포함된 8~15자리로 입력해주세요")
                setNewPasswordConfirm(false)
                return;
            }
        }
            setErrMsg("")
            setNewPasswordConfirm(true)
    }

    // 핸드폰 번호
    const checkPhoneNumber = /^01(0|1|6|7|8|9)\d{7,8}$/;
    const onPhoneNumberCheck = (e) => {
        if (phoneNumber === "") {
            setErrMsg("핸드폰 번호를 입력해주세요")
            setPhoneNumberConfirm(false)
            return;
        }else if (!checkPhoneNumber.test(phoneNumber)){
            setErrMsg("핸드폰 번호를 올바르게 입력해주세요")
            setPhoneNumberConfirm(false)
            return;
        }else {
            setErrMsg("")
            setPhoneNumberConfirm(true)
        }
    }

    const profileUpdateSubmit = (e) => {
        e.preventDefault();

        // 새 비밀번호란이 비었고, 확인하지 않은 경우
        if( newPwd === "" && RnewPwd === "" && !newPasswordConfirm) {
            if(!nickNameConfirm) {
                setErrMsg("닉네임 중복을 확인해주세요")
                return;
            } else if(!passwordConfirm) {
                setErrMsg("현재 비밀번호를 확인해주세요")
                return;
            } else if(!phoneNumberConfirm) {
                setErrMsg("핸드폰번호를 확인해주세요")
                return;
            }
            const updateRequest = async () => {
                const res = await axios.put(`/api/user/${userId}`,{
                    nickname: nickname,
                    password: password,
                    phoneNumber: phoneNumber,
                    introduction: introduction,
                    userImage: userImage
                },{ headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                console.log(res)
            }
            updateRequest()
                .then()
                .catch()

            // 새 비밀번호를 확인한 경우
        } else if (newPwd === RnewPwd && newPasswordConfirm) {
            if(!nickNameConfirm ) {
                setErrMsg("닉네임 중복을 확인해주세요")
                return;
            } else if(!passwordConfirm) {
                setErrMsg("현재 비밀번호를 확인해주세요")
                return;
            } else if(!phoneNumberConfirm) {
                setErrMsg("핸드폰번호를 확인해주세요")
                return;
            }
            const updateRequest = async () => {
                const res = await axios.put(`/api/user/${userId}`,{
                    nickname: nickname,
                    password: password,
                    phoneNumber: phoneNumber,
                    introduction: introduction,
                    userImage: userImage
                },{ headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                console.log(res)
            }
            updateRequest()
                .then()
                .catch()
        }
        else {
            setErrMsg("알 수 없는 에러")
            return;
        }
    }

    const deleteHandler = async () => {
        let confirm = window.confirm("정말 탈퇴하시겠습니까?")
        if(confirm === true) {
            await axios.delete(`/api/user/${userId}`)
                .then((res) => {
                        console.log(res)
                    if(res.status === 200) {
                        navigate("/LoginForm", { replace : true})
                        alert("이용해주셔서 감사합니다.")
                    } else {
                            alert("탈퇴를 처리하는 중 문제가 생겼습니다.")
                            return;
                    }
                }).catch((err) => {
                    console.log(err)
                    console.log("탈퇴 서버 에러")
                })
                }
        else {
            return;
        }
    }

    return (
        <>
            <div className=" w-1/3 h-screen">
                <div className="w-full text-center">
                    <div className="w-40 h-40 m-auto mt-5 border-2 bg-gray-300 overflow-hidden rounded-full">
                        <img src={ member.userImage } />
                    </div>
                    <div className="my-6 text-3xl font-bold">
                        { member.nickname }
                    </div>
                    <div className="m-auto mx-5 flex justify-around">
                        <span className="font-bold">팔로우</span>
                        <span>
                            1
                        </span>
                        <span className="font-bold">팔로워</span>
                        <span>
                            1056
                        </span>
                    </div>

                    <div className="m-auto mt-10 ">
                        { member.introduction }
                    </div>

                    { loginUserState.nickname === visitUser ?
                        <>
                            <div className="mt-10 text-sm font-bold text-gray-400">
                                <button className="mx-3" onClick={ handleOpen }>프로필 수정</button>
                                <button className="mx-3" onClick={ deleteHandler }>회원 탈퇴</button>
                            </div>
                        </>
                        : null
                    }
                    { loginUserState.nickname === visitUser ? null :
                    <button className="m-7 w-10/12 h-10 text-lg text-white font-bold bg-[#EA4E4E] rounded-md mx-3">팔로우</button>
                    }
                </div>
            </div>


            {/* 프로필 수정 모달 UI 미완성 상태 */}
            <Dialog open={ modalOpen }>
                <form className="p-3 pr-5 bg-[#fbf9ec] w-auto" onSubmit={ profileUpdateSubmit }>
                <DialogTitle className="">프로필 수정</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={6}>
                                <div>
                                    <div className="my-3 border rounded-full w-52 h-52 overflow-hidden">
                                        <img src={ imgFile ? imgFile : "/img/user.jpg" } className="w-52 h-52"/>
                                        <input type="file" accept="image/*" id="profile_photo" className="hidden overflow-hidden w-0 h-0 p-0" onChange={ handleImg } ref={ imgRef }/>
                                    </div>
                                    <label htmlFor="profile_photo" className="pl-14 cursor-pointer text-sm">프로필 사진 변경</label>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="w-96">
                                    <DialogContentText>
                                        닉네임
                                    </DialogContentText>
                                    <div>
                                        <input type="text" className="border w-44" name="nickname" value={ nickname } onChange={ onCheckInputValue }/>
                                        <button className="text-sm w-24 h-7 ml-2 bg-[#EA4E4E] text-white rounded-md" onClick={ onNicknameCheck }>중복검사</button>
                                    </div>
                                    <DialogContentText>
                                        현재 비밀번호
                                    </DialogContentText>
                                    <div>
                                        <input type="password" className="border w-56" name="password" value={ password } onChange={ onCheckInputValue } onBlur={ passwordCheck }/>
                                    </div>
                                    <DialogContentText>
                                        새 비밀번호
                                    </DialogContentText>
                                    <div>
                                        <input type="password" className="border w-56" name="newPwd" value={ newPwd } onChange={ onCheckInputValue } onBlur={onNewPwdCheck}/>
                                    </div>
                                    <DialogContentText>
                                        새 비밀번호 확인
                                    </DialogContentText>
                                    <div>
                                        <input type="password" className="border w-56" name="RnewPwd" value={ RnewPwd } onChange={ onCheckInputValue } onBlur={onNewPwdCheck} />
                                    </div>
                                    <DialogContentText>
                                        핸드폰 번호
                                        <span className="text-xs text-gray-400"> ex) 01012345678</span>
                                    </DialogContentText>
                                    <div>
                                        <input type="text" className="border w-56" name="phoneNumber" value={ phoneNumber } onChange={ onCheckInputValue } onBlur={onPhoneNumberCheck}/>
                                    </div>
                                    <DialogContentText>
                                        자기소개
                                    </DialogContentText>
                                    <input type="text" className="border w-56" name="introduction" value={ introduction } onChange={ onCheckInputValue }/>
                                    <div className="my-3 text-sm font-bold text-[#EA4E4E]">
                                        { errMsg }
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <button className="w-12 h-8 bg-[#EA4E4E] text-white rounded-md">수정</button>
                        <button className="w-12 h-8 bg-gray-300 rounded-md" onClick={ handleClose }>닫기</button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default UserProfile;