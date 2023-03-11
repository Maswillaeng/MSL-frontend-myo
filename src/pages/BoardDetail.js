import React from "react";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

import Comments from "../components/boardDetail/Comments";
const BoardDetail = () => {
  const [userImage, setUserImage] = useState("/img/user.jpg");
  //const [isLiked, setIsLiked] = useState("");
  return (
    <div className="mx-auto max-w-4xl py-24 ">
      <div className=" mb-10 flex items-center justify-between">
        <div>
          <h2 className="mb-2 font-bold text-red-500">칵테일</h2>
          <div className="mb-2 text-2xl font-black">
            무슨 칵테일이 어쩌고 저쩌고
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 border-2 rounded-full overflow-hidden">
                <img src={userImage} className="w-10 h-10" alt="" />
              </div>
              <div className="font-bold relative ">닉네임</div>
              <div class="w-0.5 h-5 bg-gray-200 after:absolute after:inset-0 after:content after:''"></div>
              <div className="text-slate-400 text-s">2023.2.26 19:01</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-2xl ">
          <AiOutlineHeart />
          <div>0</div>
        </div>
      </div>
      <div className="mb-5 h-96 border-2 p-10 bg-white"> 텍스트 내용</div>
      <div className="text-right">
        {" "}
        <div className=" text-red-500 mb-10 inline-flex gap-7 rounded-full border border-red-500  py-3 px-7 align-middle text-xl">
          {" "}
          <FiShare />
          <BsThreeDots />
        </div>
      </div>

      <Comments />
    </div>
  );
};

export default BoardDetail;
