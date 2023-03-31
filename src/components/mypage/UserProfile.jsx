import React, {useEffect, useRef, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {AiFillPlusCircle} from "react-icons/ai";
import {Grid} from "@mui/material";
import axios from "axios";

const UserProfile = () => {
    const [errMsg, setErrMsg] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => {
        setModalOpen(true)
    }
    const handleClose = () => {
        setModalOpen(false)
    }
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const handleImg = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImgFile(reader.result);
            setProfileUpdateForm({
                ...profileUpdateForm,
                userImage: reader.result
            })
        }
        console.log(profileUpdateForm)
    }
    // 프로필 수정 모달 formData, 유저 데이터 들어올 시 수정 할 것
    const [profileUpdateForm, setProfileUpdateForm] = useState({
        nickname: "",
        userImage: "/img/user.jpg",
        introduction: "",
        }
    );
    const {nickname, userImage, introduction} = profileUpdateForm;

    //입력 값 formData에 넣기
    const onCheckInputValue = (e) => {
        const { name, value } = e.target;
        setProfileUpdateForm({
            ...profileUpdateForm,
            [name] : value,
        })
        console.log(profileUpdateForm)
    }

    // { headers: { "Context-Type": "application/json" }}
    // 닉네임 검사
    // 닉네임 정규식
    const checkNickname2 = /^[가-힣a-zA-Z]{2,10}$/;

    const onNicknameCheck = (e) => {
        e.preventDefault()

        if(nickname === ''){
            setErrMsg("닉네임을 입력해주세요")
            return;
        }else if(!checkNickname2.test(nickname)) {
            setErrMsg("2자 이상의 한글이나, 영문으로 입력해주세요")
            return;
        }else {
            axios.post("/api/auth/duplicate/nickname",{
                nickname
            })
                .then((res) => {
                    if(res.status === 200) {
                        setErrMsg("닉네임 사용 가능")
                        console.log(res)
                    }
                    else if(res.status === 409) {
                        setErrMsg("닉네임 사용 불가")
                        console.log(res)
                        return;
                    }
                }).catch((err) => console.log(err))
        }
    }

    return (
        <>
            <div className=" w-1/3 h-screen">
                <div className="w-full text-center">
                    <div className="w-40 h-40 m-auto mt-5 border-2 bg-gray-300 overflow-hidden rounded-full">
                        <img src="https://cdn.pixabay.com/photo/2014/07/11/11/57/cocktail-389798_1280.jpg" />
                    </div>
                    <div className="my-6 text-3xl font-bold">
                        묘묘
                    </div>
                    <div className="m-auto mx-5 flex justify-around">
                        <span className="font-bold">
                            팔로우
                        </span>
                        <span>
                            1
                        </span>
                        <span className="font-bold">
                            팔로워
                        </span>
                        <span>
                            1056
                        </span>
                    </div>
                    <div className="m-auto mt-10 ">
                        소개글 ~~~~~~~~~~~~~~~~~~~~~~~
                    </div>
                    <div className="mt-10 text-sm font-bold text-gray-400">
                        <button onClick={ handleOpen }>프로필 수정</button>
                    </div>
                    <button className="m-7 w-10/12 h-10 bg-[#EA4E4E] text-lg text-white font-bold rounded-md mx-3">
                        팔로우
                    </button>
                </div>
            </div>

            {/* 프로필 수정 모달 UI 미완성 상태 */}
            <Dialog open={ modalOpen }>
                <form className="p-3 pr-5 bg-[#fbf9ec] w-auto">
                <DialogTitle className="">프로필 수정</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs="6">
                                <div className="m-auto border rounded-full w-52 h-52 overflow-hidden">
                                    <img src={ imgFile ? imgFile : "/img/user.jpg" } className="w-52 h-52"/>
                                    <input type="file" accept="image/*" id="profile_photo" className="hidden overflow-hidden w-0 h-0 p-0" onChange={ handleImg } ref={ imgRef }/>
                                </div>
                                <label htmlFor="profile_photo" className="cursor-pointer">프로필 사진 변경</label>
                            </Grid>
                            <Grid item xs="6">
                                <DialogContentText>
                                    닉네임
                                </DialogContentText>
                                <div>
                                    <input type="text" className="border" name="nickname" value={nickname} onChange={ onCheckInputValue }/>
                                    <button className="" onClick={ onNicknameCheck }>중복검사</button>
                                </div>
                                <div className="mt-3 text-center text-sm font-bold">
                                    {errMsg}
                                </div>
                                <DialogContentText>
                                    자기소개
                                </DialogContentText>
                                <input type="text" className="border" name="introduction" value={introduction} onChange={ onCheckInputValue }/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                <DialogActions>
                    <button>수정</button>
                    <button onClick={ handleClose }>닫기</button>
                </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default UserProfile;