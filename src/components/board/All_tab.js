import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import axios from "axios";

const AllTab = () => {
    // 게시물 데이터
    const [allList, setAllList] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(false);
    // 게시물 갯수 (확인 용)
    const [postCount, setPostCount] = useState();
    const [lastPost, setLastPost] = useState(false)
    // 페이지 네이션 (offset ver.)
    const navigate = useNavigate()
    // 현재 페이지
    const [page, setPage] = useState(0);
    // 화면에 보여줄 데이터 갯수
    const size = 8;
    // 현재 페이지 바꾸기
    const currentPage = (e) => {
        const { name } = e.target
        console.log(name)

        let offset = page;

        if(name === "prevBtn"){
           offset = offset-1
        }else if (name === "nextBtn")
            offset = offset+1
        // if(offset <= 0){
        //     offset = 0;
        // }else {
        //     offset = (page-1) * size
        // }
        setPage(offset)
    }

    useEffect(() => {
        const ListData = async () => {
            const postRes = await axios.post("api/post/posts", {
                size: size, page: page
            })
            // 콘솔 확인용
            console.log(postRes.status) //200
            console.log(postRes.data) //list - id,nickname, thumbnail,title (날짜는 어디에..?)

            return postRes.data;
        }

    // 해시태그 테스트, 현재 jwt 권한 걸려있음
        // const getHashTag = async () => {
        //   const hashRes = await axios.get("api/post/9/hashtag")
        //   console.log(hashRes.status)
        //   console.log(hashRes)
        //
        //   return hashRes;
        // }
        // getHashTag()
        //     .then((hash) => console.log(hash))
        setLoading(true)
        ListData()
            .then((posts) => {
                setAllList(posts)
                setPostCount(posts.length) // 임시 게시물 갯수 카운트, totalCount 전달받으면 그거 쓸 예정
                if (postCount < 8){
                    setLastPost(true)
                }else setLastPost(false)
            })
            .catch((err) => console.log("게시물 리스트 에러 " + err))

        setLoading(false)

    }, [page])

    // 검색 (테스트 중)
    const [userInput, setUserInput] = useState("");
    const [searchFilterList, setSearchFilterList] = useState([]);
    const getSearchValue = (e) => {
        setUserInput(e.target.value);
    };
    const onSearch = (e) => {
        const filterData = allList.filter((item) => item.title.includes(userInput));
        setSearchFilterList(filterData);
        console.log(filterData);
    };

    return (
        <>
            {/* 게시물 수 확인 용 */}
            {/* { postCount } */}

            <span className="m-auto">
                <span className="text-red-500 text-lg font-bold">{postCount}</span>개 글을 불러왔습니다
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
                                                onChange={getSearchValue}/>
                                            <button
                                                className="right-10 top-0 mr-4"
                                                onClick={onSearch}
                                            >
                                                검색
                                            </button>
                                        </div>
                                        <button
                                            className="w-16 rounded-md mx-3 h-8 text-sm text-white font-bold bg-[#EA4E4E]">
                                            <Link to={"/BoardWrite"}>
                                                글쓰기
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            { loading && <div className="text-center text-3xl mt-5"> 로딩 중... </div> }

                            {/* 게시물 */}
                            <div className="mx-1 grid grid-cols-4">
                                {
                                    allList.map((item) => (

                                        <div className="text-center p-5 h-auto" key={item.id}>
                                            <Link to="/Board">
                                                <div className="h-52 overflow-hidden rounded-md">
                                                    {/* thumnail */}
                                                    {/* 더미데이터 불렀을 때, 썸네일에 타이틀 들어와서 경로가 맞지않아 잘못된 요청 콘솔 에러 뜸*/}
                                                    {/*<img src={item.thumbnail} />*/}
                                                </div>
                                                <div
                                                    className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis hover:text-[#EA4E4E]">
                                                    {/* title */}
                                                    {/* 더미데이터 불렀을 때, 이미지 경로 출력 됨 (타이틀, 썸네일 바뀜) */}
                                                    {item.title}
                                                </div>
                                            </Link>

                                            <div>
                                                {/*  user_id  */}
                                                <span className="text-sm pr-3">
                                                    <Link to="/MyPage/:user_id">
                                                    {item.nickname}
                                                    </Link>
                                                </span>
                                                {/*  creat_At  */}
                                                <span className="text-sm">
                                                    {/*{item.created_date}*/}
                                                </span>
                                            </div>
                                            {/* 댓글수 */}
                                            <span className="text-sm text-[#EA4E4E]">
                                                {/* {item.postId === } */}
                                            </span>
                                            {/* 조회수는 아직 구현 중 */}
                                            <span className="text-sm pl-3">
                                                👀 9999
                                            </span>
                                            {/* 좋아요 테스트 중 */}
                                            <span className="text-sm pl-3">
                                                💗 100
                                            </span>

                                            <div className="grid grid-cols-3">
                                                <span className="bg-gray-200 rounded-md text-xs p-1 m-1 overflow-hidden whitespace-nowrap text-ellipsis ">
                                                  #해시태그
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* 페이지 네이션 */}
                {/* 게시물의 끝을 요청 후에 알아서 다음 버튼이 한 텀 늦음 갯수 or 페이지 마지막 번호를 알아야 할 듯 */}
                <div className="my-5 m-auto text-2xl">
                    <button className={ page === 0 ? "text-gray-300" : "" } name="prevBtn" onClick={ (e) => currentPage(e) } disabled={ page === 0 } > 이전 </button>
                    <span>{page+1}</span>
                    <button className={ lastPost === true ? "text-gray-300" : "" } name="nextBtn" onClick={ (e) => currentPage(e) } disabled={ lastPost === true ? true : false }>다음</button>
                </div>

                {/* 페이징 frontOnly ver. */}
                {/*  <div className="my-5 m-auto text-2xl">*/}
                {/*    <nav>*/}
                {/*      <ul className="pagination flex m-auto">*/}
                {/*        { pageNumbers.map((number) => (*/}
                {/*            <li key={number} className={number === currentPage ? "page-item mx-3 font-bold text-[#EA4E4E]" : "page-item mx-3"}>*/}
                {/*              <button onClick={() => setCurrentPage(number)} className="page-link">*/}
                {/*                {number}*/}
                {/*              </button>*/}
                {/*            </li>*/}
                {/*          ))*/}
                {/*        }*/}
                {/*      </ul>*/}
                {/*    </nav>*/}
                {/*  </div>*/}

            </div>
        </>
    );
};

export default AllTab;
