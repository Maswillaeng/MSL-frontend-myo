import React from "react";
import SingleComments from "./SingleComments.jsx";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Comments = ({ postId }) => {
  // 로그인 후 다시 돌아오기위해 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  // 입력한 댓글 내용
  const [commentContent, setCommentContent] = useState("");
  const [token, setToken] = useState(null);
  // 현재 페이지, 전체 페이지 갯수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // modal이 보이는 여부 상태
  const [showModal, setShowModal] = useState(false);
  // user_id가지고오기
  // const userId = useRecoilValue(getLoginUser);

  const getCommentList = async () => {
    const response = await axios
      .get(`/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // 응답에서 user_id를 가져오기

        const userId = response.data.id;

        console.log("postId 가지고오기");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // 페이지에 해당하는 댓글 목록은 page 상태가 변경될 때마다 가져옴
  // 맨 처음 페이지가 1이므로 처음엔 1페이지에 해당하는 댓글을 가져온다
  // useEffect(() => {
  //   const getCommentList = async (commentContent) => {
  //     const { data } = await axios.post(
  //       `/api/post/${postId}/comment`,
  //       commentContent
  //     );
  //     return data;
  //   };

  // 기존 comment에 데이터를 덧붙임
  //   getCommentList().then((result) =>
  //     setCommentList([...commentList, ...result])
  //   );
  // }, [page]);

  // 댓글 추가하기, 댓글 추가하는 API는 인증 미들웨어가 설정되어 있으므로
  // HTTP HEADER에 jwt-token 정보를 보내는 interceptor 사용
  const submit = useCallback(async () => {
    const comment = {
      postId: postId,
      content: commentContent,
    };
    console.log(comment);
    try {
      await axios.post(`/api/post/${postId}/comment`, comment);
      alert("댓글 등록 완료");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    // axios interceptor 사용 : 로그인한 사용자만 쓸 수 있다!
  }, [commentContent]);
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    getCommentList();
  }, []);
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
      <div className="font-bold text-xl mb-5">댓글 0</div>
      <SingleComments />
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
