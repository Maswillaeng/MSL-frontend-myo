import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { Pagination } from "@mui/material";
import axios from "axios";
// import Search from "../board/Search";

const AllTab = ({ allList, postCount, loading }) => {

// 페이지 네이션 (onlyFront ver.)
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 게시물 자를 갯수
  const [postsPerPage, setPostsPerPage] = useState(8);
  // 페이징 끝 번호
  const indexOfLast = currentPage * postsPerPage;
  // 페이징 첫 번호
  const indexOfFirst = indexOfLast - postsPerPage;
  // 첫번호 끝번호로 현재페이지에서 보여줄 숫자 배열 만들기
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allList.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
// 페이지 네이션 (offset ver.)
  const navigate = useNavigate()
  const updateOffset = () => {
    const limit = 8; // 화면에 보여줄 데이터 갯수
    const offset = (currentPage-1) * limit; // 데이터 시작점
    const queryString = `limit=${limit}&offset=${offset}`

    navigate(`?${queryString}`)
  }

// 좋아요, 댓글수, 해시태그 등...(회의를 해봐야 할 듯!)

  // 댓글수 카운트 (테스트 중)
  // const [commentList, setCommentList] = useState([]);
  // 좋아요 수 카운트 (껍데기)
  // const [likeList, setLikeList] = useState(([]))
  // 게시물 postId + 댓글 postId 매칭 시켜서 length 불러올 방법 고려 중...
  // const CommentList = async () => {
  //   const CommentRes = await axios.get(`api/post/${postId}/comment`)
  //   console.log(CommentRes.status)
  //   console.log(CommentRes.statusText)
  //   console.log(CommentRes.data)
  // }
  // 좋아요 없는 요청!
  // const LikeList = async () => {
  //   const LikeRes = await axios.get(`api/post/${postId}/like`)
  //   console.log(LikeRes.status)
  //   console.log(LikeRes.statusText)
  //   console.log(LikeRes.data)
  // }
  // useEffect(() => {
  //   CommentList()
  //       .then((CommentRes) => setCommentList(CommentRes.data))
  //       .catch((err) => console.log("댓글 리스트 에러 " + err))
  //
  //   LikeList()
  //       .then((LikeRes) => setLikeList(LikeRes.data))
  //       .catch((err) => console.log("좋아요 리스트 에러 " + err))
  // },[])


  // 검색 (테스트 중)
  const [userInput, setUserInput] = useState("");
  const [searchFilterList, setSearchFilterList] = useState([]);
  const getSearchValue = (e) => {
    setUserInput(e.target.value);
  };

  const onSearch = (e) => {
    // dummy는 allList, request는 axios get 요청 보내서 .filter()로 거르기
    const filterData = allList.filter((item) => item.title.includes(userInput));
    setSearchFilterList(filterData);
    console.log(filterData);
  };

  return (
    <>
      {/*/!* 게시물 수 확인 용 *!/{postCount}*/}
      <span className="m-auto">
        <span className="text-red-500 text-lg font-bold">{allList.length}</span>개 글을
        불러왔습니다
      </span>

      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg p-2">
              <div className="flex w-full h-11 border-b-2 border-black">
                {/* 정렬 버튼 */}
                <div className="inline-flex flex-auto text-xs">
                  <button className="mx-3 decoration-red">
                    <span className="">●</span>
                    최신순
                  </button>
                  <button className="mx-3">
                    <span>●</span>
                    추천순
                  </button>
                  <button className="mx-3">
                    <span>●</span>
                    조회순
                  </button>
                </div>

                {/* 검색, 글쓰기 버튼 */}
                <div className="flex justify-end">
                  <div className="relative text-lg bg-transparent text-gray-800">
                    <div className="inline-flex text-sm items-center border-b border-b-2 py-3">
                      <input
                        className="bg-transparent border-none mr-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="검색"
                        value={userInput}
                        onChange={getSearchValue}
                      />
                      <button
                        className="right-10 top-0 mr-4"
                        onClick={onSearch}
                      >
                        검색
                      </button>
                    </div>
                    <button className="w-16 rounded-md mx-3 h-8 text-sm text-white font-bold bg-[#EA4E4E]">
                      <Link to={"/BoardWrite"}>글쓰기</Link>
                    </button>
                  </div>
                </div>
              </div>

              {loading && <div className="text-center"> 로딩 중... </div>}

              {/* 게시물 */}
                  <div className="mx-1 grid grid-cols-4">
                    {
                      allList.slice(indexOfFirst, indexOfLast).map((item,index) => (
                          <Link to="/Board" key={index}>
                    <div className="text-center p-5 h-auto" >
                      <div className="h-52 overflow-hidden rounded-md">
                        {/* thumnail */}
                        <img src={item.thumnail} />
                      </div>

                      <div className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis hover:text-[#EA4E4E]">
                        {/* title */}
                        {item.title}
                      </div>
                      <div>
                      <span className="text-sm pr-3">
                    {/*  nickname  */}
                        {item.nickName}
                    </span>
                      <span className="text-sm">
                      {/*  creat_At */}
                        {item.createdDate}
                      </span>
                      </div>
                      <span className="text-sm text-[#EA4E4E]">
                    {/* 댓글수 */}
                        {/*{item.postId ===  }*/}
                  </span>
                      <span className="text-sm pl-3">
                    {/* 조회수 뺄지 말지 고려 중 */}
                        👀 9999
                  </span>
                      <span className="text-sm pl-3">
                    {/* 좋아요 */}
                        💗 100
                  </span>
                      <div className="grid grid-cols-3">
                    <span className="bg-gray-200 rounded-md text-xs p-1 m-1 overflow-hidden whitespace-nowrap text-ellipsis ">#해시태그</span>
                    </div>
                    </div>
                          </Link>
              ))
              }

            </div>
          </div>
        </div>
      </div>

      {/* 페이징 */}
        <div className="my-5 m-auto text-2xl">
          <nav>
            <ul className="pagination flex m-auto">
              { pageNumbers.map((number) => (
                  <li key={number} className={number === currentPage ? "page-item mx-3 font-bold text-[#EA4E4E]" : "page-item mx-3"}>
                    <button onClick={() => setCurrentPage(number)} className="page-link">
                      {number}
                    </button>
                  </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AllTab;
