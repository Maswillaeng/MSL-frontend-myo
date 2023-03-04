import React from "react";
import Editor from "../components/boardWrite/Editor";
const BoardWrite = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 ">
      <div className="mx-auto w-3/6 mb-10 flex">
        <select name="pets" className="border-2 p-1 flex-none" id="pet-select ">
          <option value="">카테고리</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>{" "}
        <input
          className="border-2 ml-5 p-1 flex-1"
          type="text"
          name="title"
          placeholder="제목"
        />
      </div>{" "}
      <Editor />{" "}
      <div className="m-0">
        {" "}
        <button className="block mx-auto bg-point  px-40 py-3 mt-20 font-bold font-white">
          {" "}
          글 게시
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
