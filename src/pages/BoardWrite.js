import React from "react";
import Editor from "../components/boardWrite/Editor";
const BoardWrite = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 relative">
      <div className="mx-auto w-5/6 mb-10 flex ">
        <select
          name="msl"
          className=" px-5 flex-none text-white bg-red-500 border-red-500 border-r-8"
          id="pet-select "
        >
          <option value="">카테고리</option>
          <option value="msl1">msl1</option>
          <option value="msl2">msl2</option>
          <option value="msl3">msl3</option>
          <option value="msl4">msl4</option>
          <option value="msl5">msl5</option>
          <option value="msl6">msl6</option>
        </select>{" "}
        <input
          className="border border-red-500 ml-5 p-2 px-2 w-full"
          type="text"
          name="title"
          placeholder="제목"
        />
      </div>{" "}
      <div className="">
        <Editor /> <div className="absolute right-28">0/1000</div>
      </div>
      <div className="flex justify-center gap-20 ">
        {" "}
        <button className="block border  border-red-500 bg-white  font-bold px-20 py-3 mt-20 ">
          {" "}
          임시저장
        </button>
        <button className="block bg-red-500 px-20 py-3 mt-20 font-bold text-white">
          {" "}
          글 게시
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
