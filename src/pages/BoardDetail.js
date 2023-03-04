import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import CategoryList from "../components/boardDetail/CategoryList";
import Comments from "../components/boardDetail/Comments";
const BoardDetail = () => {
  return (
    <div className="mx-auto max-w-4xl py-24 ">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="mb-2">카테고리명</h2>
          <div className="mb-2 text-2xl font-black">
            무슨 칵테일이 어쩌고 저쩌고
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2"></div>
              <div>닉네임</div>
              <div>날짜</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-2xl ">
          <AiOutlineHeart />
          <div>0</div>
        </div>
      </div>
      <div className="mb-5 h-96 border-2 p-10"> 텍스트 내용</div>
      <div className="text-right">
        {" "}
        <div className="mb-10 inline-flex gap-7 rounded-full border-2 py-3 px-7 align-middle text-xl">
          {" "}
          <FiShare />
          <BsThreeDots />
        </div>
      </div>
      <CategoryList />
      <Comments />
    </div>
  );
};

export default BoardDetail;
