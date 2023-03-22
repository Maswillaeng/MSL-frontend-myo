import React from "react";
import SingleComments from "./SingleComments.jsx";
import { useNavigate } from "react-router-dom";
const Comments = () => {
  //let [comment, setComment] = useState("");
  const navigate = useNavigate();
  return (
    <div className="border-t-2 h-44 bg-slate-50 ">
      <div className="p-5 mb-10 text-right">
        <textarea
          placeholder="댓글을 작성해주세요"
          className="border p-3 w-full"
        ></textarea>

        <div className="mt-5">
          {" "}
          <input type="radio" name="secret" className="mr-2 " />
          <span className="mr-7">비밀글</span>
          <button className=" font-white h-9 flex-none bg-point px-7 font-bold bg-red-500 text-white">
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
