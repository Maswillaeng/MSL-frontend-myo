import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/boardWrite/Editor";
import axios from "axios";

import CategorySelector from "../components/category/CategorySelector";

const BoardWrite = () => {
  // title Focus
  const titleInputRef = useRef(null);
  // 페이지 이동
  const navigate = useNavigate();
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
  let { title, content, category } = posting;
  // 게시글데이터 전송
  const postingSubmitData = async (e) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      //인증된 사용자만 이용할 수 있는 기능이므로 미리 정의한 api라는 axios interceptor로 user의 id를 토큰에서 얻은 후 같이 서버에 요청을 보낸다.
      // formData.append("user_id", jwtUtils.getId(token));

      const response = await axios.post("/api/post", formData);

      if (response.data && response.data.ok === 1) {
        let postId = response.data.insertedId;
        navigate(`/api/post/${postId}`);
        setPosting({ title: "", content: "", category: "", thumbnail: "" });
        console.log(response);
      }
      // 게시물 등록이 성공하면 posting 상태를 초기화
    } catch (error) {
      console.log(error);
      alert("게시물을 저장하는 도중 오류가 발생하였습니다.");
    }
  };
  // submit
  const onSubmitHandler = (e) => {
    e.preventDefault();

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
