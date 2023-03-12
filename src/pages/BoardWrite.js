import React from "react";
import { useState, useRef } from "react";
import Editor from "../components/boardWrite/Editor";
import axios from "axios";
const BoardWrite = () => {
  // editor content

  let [posting, setPosting] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
  });
  const onTitleHandler = (e) => {
    setPosting((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  // data 전송
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(!posting.title);
    if (
      posting.title === "" ||
      posting.content === ""
      //!numNotice.alert
    ) {
      return alert("작성");
    }
    postingSubmitData();
  };
  // editor 내용 변경
  const onEditorChange = (value) => {
    setPosting((prevState) => ({
      ...prevState,
      content: value,
    }));
  };
  const postingSubmitData = async (e) => {
    const { title, content, thumbnail } = posting;
    let contentData = {
      title,
      content,
      thumbnail,
    };
    try {
      const response = await axios.post("/api/post", { contentData });
      console.log(response);
      // 게시물 등록이 성공하면 posting 상태를 초기화
      setPosting({ title: "", content: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto py-24 relative">
      <div>
        <form
          className="mx-auto w-5/6 mb-10 flex "
          onSubmit={onSubmitHandler}
          method="post"
        >
          {" "}
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
            onChange={onTitleHandler}
            value={posting.title}
            placeholder="제목"
          />
        </form>
      </div>{" "}
      <Editor value={posting.content} onChange={onEditorChange} />{" "}
      <div className="absolute right-28">0/1000</div>
      <div className="flex justify-center gap-20 ">
        {" "}
        <button className="block border  border-red-500 bg-white  font-bold px-20 py-3 mt-20 ">
          {" "}
          임시저장
        </button>
        <button
          type="submit"
          className="block bg-red-500 px-20 py-3 mt-20 font-bold text-white"
        >
          {" "}
          글 게시
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
