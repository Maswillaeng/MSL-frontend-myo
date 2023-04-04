import React from "react";
import { useState, useRef, useEffect } from "react";
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
  // editor
  const editorRef = useRef();
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
  let { title, content, category, thumbnail } = posting;
  //img 데이터 전송
  const onSubmitImgData = async (e) => {
    const formData = new FormData();
    formData.append("photo", thumbnail);
    try {
      const response = await axios.post("/api/user/upload", formData);
      posting((prevState) => ({
        ...prevState,
        thumbnail: response.data.path,
      }));
      // path property가 없음
      console.log(response.data.path);
    } catch (error) {
      console.log("이미지 전송 실패");
      console.log(error);
    }
  };

  // 게시글데이터 전송
  const postingSubmitData = async (e) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("thumbnail", thumbnail);
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("/api/post", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { grant_type: "refresh_token", refresh_token: refreshToken },
      });

      if (response.data && response.data.ok === 1) {
        let postId = response.data;
        setPosting({
          title: "",
          content: "",
          category: "",
          thumbnail: "",
        });

        navigate(`/api/post/${postId}`);
      }

      // 게시물 등록이 성공하면 posting 상태를 초기화
    } catch (error) {
      console.log(error);
      alert("게시물을 저장하는 도중 오류가 발생하였습니다.");
    }
  };
  const handleClick = () => {
    onSubmitImgData();
    onSubmitHandler();
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
    setPosting((prevPosting) => ({
      ...prevPosting,
      content: value,
    }));
  };

  // 카테고리 선택
  const handleSelect = (categories) => {
    setPosting((prevPosting) => ({
      ...prevPosting,
      category: categories,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-24 relative">
      <div className="relative">
        <div className="mx-auto w-5/6 mb-10 flex ">
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
          <Editor
            forwardedRef={editorRef}
            value={posting.content}
            onChange={onEditorChange}
            // onImageUpload={onImageUpload}
          />
        </div>
      </div>
      <div className="flex justify-center gap-20 ">
        <button className="block border  border-red-500 bg-white  font-bold px-20 py-3 mt-28 ">
          임시저장
        </button>
        <button
          onClick={handleClick}
          className="block bg-red-500 px-20 py-3 mt-28 font-bold text-white"
        >
          글 게시
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
