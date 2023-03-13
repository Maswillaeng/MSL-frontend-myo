import React from "react";
import { useState, useRef } from "react";
import Editor from "../components/boardWrite/Editor";
import axios from "axios";
import CategorySelector from "../components/category/CategorySelector";
const BoardWrite = () => {
  // title Focus
  const titleInputRef = useRef(null);

  // content Focus
  const contentEditorRef = useRef(null);

  // 글 카테고리
  let categories = [
    { id: 0, name: "RECIPE" },
    { id: 1, name: "COCKTAIL / SNACK" },
    { id: 2, name: "ETC" },
  ];

  // editor content
  let [posting, setPosting] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
  });
  // title 작성
  const onTitleHandler = (e) => {
    setPosting((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  // 게시글데이터 전송
  const postingSubmitData = async (e) => {
    const { title, content, thumbnail, category } = posting;
    let contentData = {
      title,
      content,
      thumbnail,
      category,
    };

    try {
      const response = await axios.post("/api/post", { contentData });
      console.log(response);
      // 게시물 등록이 성공하면 posting 상태를 초기화
      setPosting({ title: "", content: "", category: "", thumbnail: "" });
    } catch (error) {
      console.log(error);
    }
  };
  // submit
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let { title, content, category } = posting;
    if (!title.trim()) {
      return titleInputRef.current.focus();
    }

    if (category === "") {
      alert("카테고리를 선택해주세요");
      return;
    }
    if (!content.trim()) {
      return contentEditorRef.current.querySelector(".ql-editor").focus();
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

  // 카테고리 선택
  const handleSelect = (categories) => {
    setPosting((prevState) => ({
      ...prevState,
      category: categories,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-24 relative">
      <div className="relative">
        <div className="mx-auto w-5/6 mb-10 flex ">
          {" "}
          <CategorySelector categories={categories} onSelect={handleSelect} />
          <input
            className="border border-red-500 ml-5 p-2 px-2 w-full"
            type="text"
            name="title"
            onChange={onTitleHandler}
            value={posting.title}
            placeholder="제목"
            ref={titleInputRef}
          />
        </div>
        <div ref={contentEditorRef}>
          <Editor value={posting.content} onChange={onEditorChange} />
        </div>{" "}
        <div className="absolute right-28 bottom-[-80px]"></div>
      </div>{" "}
      <div className="flex justify-center gap-20 ">
        {" "}
        <button className="block border  border-red-500 bg-white  font-bold px-20 py-3 mt-28 ">
          {" "}
          임시저장
        </button>
        <button
          onClick={onSubmitHandler}
          className="block bg-red-500 px-20 py-3 mt-28 font-bold text-white"
        >
          {" "}
          글 게시
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
