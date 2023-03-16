import React from 'react';

const UserProfile = () => {
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
                        소개글 뿌씨씨씨씨씨씨씨
                    </div>
                    <div className="mt-10 text-sm font-bold text-gray-400">
                        프로필 수정
                    </div>
                    <button className="m-7 w-10/12 h-10 bg-[#EA4E4E] text-lg text-white font-bold rounded-md mx-3">
                        팔로우
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;