import React from "react";

const Comments = () => {
  return (
    <div className="border-2  ">
      <textarea placeholder="댓글을 작성해주세요"></textarea>
      <input type="radio" name="secret" className="mr-2" />
      <span className="mr-4">비밀글</span>
      <button className="font-white h-9 flex-none bg-point px-7 font-bold">
        {" "}
        등록
      </button>
    </div>
  );
};

export default Comments;
