import React from "react";
import { useEffect, useState } from "react";
import { displayCreatedAt } from "../../function/Board_api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comments = ({ postId, postComment }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(postComment);

  // postComment 값이 변경될 때마다 comments 상태 업데이트
  useEffect(() => {
    setComments(postComment);
  }, [postComment]);
  // 입력한 댓글 내용
  const [commentContent, setCommentContent] = useState("");
  let token = localStorage.getItem("accessToken");

  // 댓글 등록
  const submit = async (e) => {
    const comment = {
      postId: postId,
      content: commentContent,
    };

    try {
      await axios.post(`/api/comment`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
  };

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
        댓글 {comments ? comments.length : 0}
      </div>
      {comments.map((item, id) => {
        return (
          <div key={id} className="bg-white flex px-12 py-8 border-t-2">
            <div className="mr-5 h-10 w-10 border-2 rounded-full overflow-hidden">
              <img src={item.userImage} className="w-10 h-10" alt="" />
            </div>
            <div>
              <div className="flex font-extrabold mb-3 gap-10">
                <div>{item.nickname}</div>
                <div className="text-red-500">
                  {" "}
                  {displayCreatedAt(item.createDate)}
                </div>
              </div>
              <div className="mb-3">{item.content}</div>
              <ul className="flex gap-3">
                <li className="font-bold">답글</li>
                <li className="text-gray-500">신고</li>
              </ul>
            </div>
          </div>
        );
      })}

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
