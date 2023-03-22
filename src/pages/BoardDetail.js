import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { MdOutlineReportProblem } from "react-icons/md";

import axios from "axios";
import Comments from "../components/boardDetail/Comments";
// material
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";

const BoardDetail = () => {
  // 토큰가지고오기
  // const token = useSelector((state) => state.Auth.token);
  // navigate
  // const navigate = useNavigate();
  const [userImage, setUserImage] = useState("/img/user.jpg");
  // 게시글 정보
  const [post, setPost] = useState([]);
  // 게시판 정보가 로딩되었는지 여부를 저장
  const [isLoaded, setIsLoaded] = useState(false);
  // URL 파라미터 받기 - post의 id
  const { postId } = useParams();
  // 삭제 modal이 보이는 여부 상태
  const [open, setOpen] = useState(false);
  //현재 url
  const location = useLocation();
  // baseUrl

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // post 가져오기
  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(`/api/post/${postId}`);
      return data;
    };
    getBoard()
      .then((result) => setPost(result))
      .then(() => setIsLoaded(true));
  }, []);

  // url 복사
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (event) => {
    const baseUrl = "http://localhost:3000";
    const pathname = window.location.pathname;
    const url = baseUrl + pathname;
    handleCopyClipBoard(url);
    console.log(url);
  };
  // report
  const report = () => {};
  return (
    <React.Fragment>
      <div className="mx-auto max-w-4xl py-24 ">
        <div className=" mb-10 flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-bold text-red-500">
              {post.category}칵테일
            </h2>
            <div className="mb-2 text-2xl font-black">
              {post.title}무슨 칵테일이 어쩌고 저쩌고
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 rounded-full overflow-hidden">
                  <img src={post.userImage} className="w-10 h-10" alt="" />
                </div>
                <div className="font-bold relative ">{post.nickname}닉네임</div>
                <div className="w-0.5 h-5 bg-gray-200 after:absolute after:inset-0 after:content after:''"></div>
                <div className="text-slate-400 text-s">
                  {post.created_at}2023.2.26 19:01
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-2xl ">
            <AiOutlineHeart />
            <div>0</div>
          </div>
        </div>
        <div className="mb-5 h-96 border-2 p-10 bg-white">
          {" "}
          {post.content}텍스트 내용
        </div>
        <div className="select">
          <div className="w-1/6 justify-between flex text-red-500 mb-10 rounded-full border border-red-500 py-3 px-7 align-middle text-xl">
            <div onClick={handleClick}>
              <FiShare />
            </div>
            <MdOutlineReportProblem onClick={report} />
          </div>
        </div>
        <button className="delete-button" onClick={handleClickOpen}>
          삭제
        </button>
        <Comments />
      </div>{" "}
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Disagree</button>
          <button onClick={handleClose}>Agree</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default BoardDetail;
