import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import Comments from "../components/boardDetail/Comments";
// material
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // modal 효과
  // const Transition = React.forwardRef(function Transition(
  //   props: TransitionProps & {
  //     children: React.ReactElement<any, any>,
  //   },
  //   ref: React.Ref<unknown>
  // ) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  // post 가져오기
  // useEffect(() => {
  //   const getBoard = async () => {
  //     const { data } = await axios.get(`/api/post/${postId}`);
  //     return data;
  //   };
  //   getBoard()
  //     .then((result) => setPost(result))
  //     .then(() => setIsLoaded(true));
  // }, []);
  return (
    <React.Fragment>
      <div className="mx-auto max-w-4xl py-24 ">
        <div className=" mb-10 flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-bold text-red-500">칵테일</h2>
            <div className="mb-2 text-2xl font-black">
              무슨 칵테일이 어쩌고 저쩌고
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 rounded-full overflow-hidden">
                  <img src={userImage} className="w-10 h-10" alt="" />
                </div>
                <div className="font-bold relative ">닉네임</div>
                <div class="w-0.5 h-5 bg-gray-200 after:absolute after:inset-0 after:content after:''"></div>
                <div className="text-slate-400 text-s">2023.2.26 19:01</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-2xl ">
            <AiOutlineHeart />
            <div>0</div>
          </div>
        </div>
        <div className="mb-5 h-96 border-2 p-10 bg-white"> 텍스트 내용</div>
        <div className="text-right">
          {" "}
          <div className=" text-red-500 mb-10 inline-flex gap-7 rounded-full border border-red-500  py-3 px-7 align-middle text-xl">
            {" "}
            <FiShare />
            <BsThreeDots />
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
