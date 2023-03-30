import React, {useEffect, useState} from 'react';
import UserProfile from "../components/mypage/UserProfile";
import UserWriteContents from "../components/mypage/UserWriteContents";
import UserLikeContents from "../components/mypage/UserLikeContents";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Alert} from "@mui/material";


const MyPage = () => {
    // 현재 로그인&로그아웃 전역상태관리가 되어있지 않은 듯 함! (코드 리뷰 해볼 것)
    // 로그인 상태 (유저 정보는 어디에 있는지 파악하기)
    // const [isLoggedIn] = useState(false);
    // 토큰 여부 (임시)
    const authenticated = useSelector((state) => state.authToken.authenticated);

   // 유저 페이지로 사용될 경우 파라미터 받아와야 함
    const { userId } = useParams();
    const navigate = useNavigate();

    // 비로그인 접근 시 로그인 페이지로
    if (!authenticated){
        // alert("로그인 먼저 해주세요.")
        navigate('/LoginForm', { replace : true })
    }
    // 해당 유저 데이터
    const [userData, setUserData] = useState({});

    // 유저 데이터 불러오기
    // useEffect(() => {
    // 아직 getUser가 없음!
    // }, [])

    // 토글 - false: 작성한 글, true: 좋아요한 글
    const [userContent, setUserContent] = useState(false);
    const contentToggle = () => {
        setUserContent(!userContent);
    }

    return (
        <>
            {/*{*/}
            {/*    authenticated &&*/}
                    <>
                        <div className="flex w-full h-screen">

                            <UserProfile />

                            <div className="w-2/3 h-screen overflow-auto">
                                {/* 토글 */}
                                <div className="w-full h-20 flex text-center p-5">
                                    <div
                                        className={userContent ? "w-1/2 mx-3" : "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]"}>
                                        <button onClick={contentToggle}>
                                            작성한 글
                                        </button>
                                    </div>
                                    <div
                                        className={userContent ? "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]" : "w-1/2 mx-3"}>
                                        <button onClick={contentToggle}>
                                            좋아요한 글
                                        </button>
                                    </div>
                                </div>
                                {/* 글 */}
                                <div className="mx-3 grid grid-cols-3">
                                    {/* 작성한 글 */}
                                    {!userContent && <UserWriteContents/>
                                    }

                                    {/* 좋아요한 글 */}
                                    {userContent && <UserLikeContents/>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            {/*}*/}
        </>
    );
};

export default MyPage;