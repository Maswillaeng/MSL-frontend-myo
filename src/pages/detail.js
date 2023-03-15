import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { jwtUtils } from "../../utils/jwtUtils";
import { useSelector } from "react-redux";
import Comments from "../components/boardDetail/Comments";
import moment from "moment";
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
  const token = useSelector((state) => state.Auth.token);
  // navigate
  const navigate = useNavigate();
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
  return (
    <React.Fragment>
      {/* isLoaded:해당 페이지가 로딩되었는지 여부 */}
      {isLoaded && (
        <div>
          {
            /*
              해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이게 하자.
              로그인을 한 사용자의 jwt-token에서 user의 ID를 추출한 후,
              board(해당 글)의 user의 ID를 비교했을 때 같으면 수정, 삭제 버튼이 보이게 한다.
              ID는 DB에 저장되어 있는 유저의 고유 번호이다.
             */
            jwtUtils.isAuth(token) &&
              jwtUtils.getId(token) === post.user_id && (
                <div className="edit-delete-button">
                  <button
                    className="delete-button"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => {
                      // put 사용해야할 듯 경로 이동말고
                      // 경로가 동일함
                      navigate(`/api/post/${postId}`);
                    }}
                  >
                    수정
                  </button>
                </div>
              )
          }
          <div className="mx-auto max-w-4xl py-24 ">
            <div className=" mb-10 flex items-center justify-between">
              <div>
                <h2 className="mb-2 font-bold text-red-500">{post.category}</h2>
                <div className="mb-2 text-2xl font-black">{post.title}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 border-2 rounded-full overflow-hidden">
                      <img src={userImage} className="w-10 h-10" alt="" />
                    </div>
                    <div className="font-bold relative ">{post.nickname}</div>
                    <div class="w-0.5 h-5 bg-gray-200 after:absolute after:inset-0 after:content after:''"></div>
                    <div className="text-slate-400 text-s">
                      {moment(post.created)
                        .add(9, "hour")
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </div>
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
          </div>
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
                삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button onClick={handleClose}>예</button>
              <button onClick={handleClose}>아니오</button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </React.Fragment>
  );
};

export default BoardDetail;
