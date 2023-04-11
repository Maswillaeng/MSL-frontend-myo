import React from "react";
import SingleComments from "./SingleComments.jsx";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Comments = ({ postId, post }) => {
  // 로그인 후 다시 돌아오기위해 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  // 입력한 댓글 내용
  const [commentContent, setCommentContent] = useState("");

  // 현재 페이지, 전체 페이지 갯수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // modal이 보이는 여부 상태
  const [showModal, setShowModal] = useState(false);
  let token = localStorage.getItem("accessToken");

  const submit = useCallback(async () => {
    const comment = {
      postId: postId,
      content: commentContent,
    };

    try {
      let response = await axios.post(`/api/comment`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCommentList(post.commentList);
      setCommentContent("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // axios interceptor 사용 : 로그인한 사용자만 쓸 수 있다!
  }, [commentContent]);

  const onCommentHandler = (e) => {
    setCommentContent(e.target.value);
  };
  return (
    <div className="border-t-2 h-44 bg-slate-50 ">
      <div className="p-5 mb-10 text-right">
        <textarea
          placeholder="댓글을 작성해주세요"
          className="border p-3 w-full"
          onChange={onCommentHandler}
          value={commentContent}
        ></textarea>

        <div className="mt-5">
          {" "}
          <input type="radio" name="secret" className="mr-2 " />
          <span className="mr-7">비밀글</span>
          <button
            onClick={submit}
            className=" font-white h-9 flex-none bg-point px-7 font-bold bg-red-500 text-white"
          >
            {" "}
            등록
          </button>
        </div>
      </div>
      <div className="font-bold text-xl mb-5">
        댓글 {post.commentList ? post.commentList.length : 0}
      </div>

      <div className="bg-white flex px-12 py-8 border-t-2">
        <div className="mr-5 h-10 w-10 border-2 rounded-full overflow-hidden">
          <img src={post.userImage} className="w-10 h-10" alt="" />
        </div>
        <div>
          <div className="flex font-extrabold mb-3 gap-10">
            <div>{post.nickname}</div>
            <div className="text-red-500">2일전</div>
          </div>
          <div className="mb-3">좋은 정보 정말 감사합니다</div>
          <ul className="flex gap-3">
            <li className="font-bold">답글</li>
            <li className="text-gray-500">신고</li>
          </ul>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="float-right text-right my-10 font-white h-9 bg-point px-7 font-bold bg-red-500 text-white"
      >
        목록으로
      </button>
    </div>
  );
};

export default Comments;
