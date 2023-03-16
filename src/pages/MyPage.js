import React, {useEffect, useState} from 'react';
import UserProfile from "../components/mypage/UserProfile";
import UserWriteContents from "../components/mypage/UserWriteContents";
import UserLikeContents from "../components/mypage/UserLikeContents";


const MyPage = () => {
    // 해당 유저 데이터 상태
    const [userData, setUserData] = useState({});
    // 유저 데이터 불러오기
    useEffect(() => {

    },[])

    // 토글 - false: 작성한 글, true: 좋아요한 글
    const [userContent, setUserContent] = useState(false);
    const contentToggle = () => {
        setUserContent(!userContent);
    }

    return (
        <div className="flex w-full h-screen">
            <UserProfile />
            <div className="w-2/3 h-screen overflow-auto">
                {/* 토글 */}
                <div className="w-full h-20 flex text-center p-5">
                    <div className={userContent ? "w-1/2 mx-3":"font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]"}>
                        <button onClick={contentToggle}>
                        내가 작성한 글
                        </button>
                    </div>
                    <div className={userContent ? "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]":"w-1/2 mx-3"}>
                        <button onClick={contentToggle}>
                            좋아요한 글
                        </button>
                    </div>
                </div>
                {/* 글 */}
                <div className="mx-3 grid grid-cols-3">
                    {/* 내가 작성한 글 */}
                    { !userContent && <UserWriteContents />
                    }

                    {/* 좋아요한 글 */}
                    { userContent && <UserLikeContents />
                    }
                </div>
            </div>
        </div>
    );
};

export default MyPage;