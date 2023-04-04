import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone';

const AllTab = () => {
    // 게시물 데이터
    const [allList, setAllList] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(false);

    // 페이지 네이션 (offset ver.)
    // 게시물 인지
    // page는 0부터 시작하지만, 첫 페이지 버튼은 1부터 시작
    const [firstPost, setFirstPost] = useState(1)
    // 마지막 페이지
    const [lastPost, setLastPost] = useState(0)
    // 페이지 당 게시물 수 확인
    const [postCount, setPostCount] = useState(0);
    // 페이지 당 게시물 수 확인
    const [totalPostCount, setTotalPostCount] = useState(0);
    // 서버 데이터의 현재 페이지
    const [page, setPage] = useState(0);
    // 현재 페이지 바꾸기
    const currentPage = (e, value) => {
        setPage(value-1)
        setFirstPost(value)
    }
    // page가 변경 될 때마다 서버에서 데이터 요청
    useEffect(() => {
        const ListData = async () => {
            const postRes = await axios.get(`api/post/posts/${page}`)
            // 콘솔 확인용
            console.log(postRes.status) //200
            console.log(postRes.data) //list - id,nickname,thumbnail,title,createdDate
            return postRes.data;
        }

    // 해시태그 테스트, 현재 jwt 권한 걸려있음
    //     const getHashTag = async () => {
    //       const hashRes = await axios.get("api/post/9/hashtag")
    //       console.log(hashRes.status)
    //       console.log(hashRes)
    //
    //       return hashRes;
    //     }
    //     getHashTag()
    //         .then((hash) => console.log(hash))
        setLoading(true)
        ListData()
            .then((posts) => {
                setAllList(posts.content)
                setTotalPostCount(posts.totalElements) // 전체 게시물 갯수
                setPostCount(posts.numberOfElements) // 현재 페이지 게시물 갯수
                setLastPost(posts.totalPages) // 총 페이지 수
            })
            .catch((err) => console.log("게시물 리스트 에러 " + err))
        setLoading(false)
    }, [page])

    // 검색 ...?
    const [userInput, setUserInput] = useState("");
    const [searchFilterList, setSearchFilterList] = useState([]);
    const getSearchValue = (e) => {
        setUserInput(e.target.value);
    };
    const onSearch = (e) => {
        // value 데이터를 서버에 요청 보내서 검색 기능 만들어야 할 듯.
    };

    // 업로드 시간
    const displayCreatedAt = (createdDate) => {
        const today = new Date() // 현재 시간
        const timeValue = new Date(createdDate) // 게시물 시간

        // 분 화
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        // 1분 미만 = 방금 전
        if (betweenTime < 1) return <span>방금 전</span>;
        // 1시간 미만 = ~분 전
        if (betweenTime < 60) {
            return <span>{ betweenTime }분 전</span>;
        }
        // 시간 화
        const betweenTimeHour = Math.floor(betweenTime / 60);
        // 24시간 미만 = ~시간 전
        if (betweenTimeHour < 24) {
            return <span>{ betweenTimeHour }시간 전</span>;
        }
        // 24시간 이상 = YYYY년 MM월 DD일
        return <Moment format="Y년 M월 D일">{ timeValue }</Moment>
    };

    return (
        <>
            {/* 게시물 수 확인 용 */}
            <span className="m-auto">총
                <span className="text-red-500 text-lg font-bold">{ totalPostCount }</span>개 글이 있습니다
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
                                                    {/* thumbnail */}
                                                    <img src={item.thumbnail} />
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
                                                    { displayCreatedAt(item.createdDate) }
                                                    {/*{ displayCreatedAt("2022-12-24T16:11:45.820984") }*/}
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
                {/* page 현재 페이지 count 마지막 페이지 수 onChange 화살표 눌렀을 때 함수 hidePrevButton 이전버튼 숨기기 hideNextButton 다음버튼 숨기기 */}
                <div className="my-5 m-auto text-2xl">
                    <Pagination
                        size="large"
                        page={ firstPost }
                        count={ lastPost }
                        hidePrevButton={ page === 0 }
                        hideNextButton={ firstPost === lastPost }
                        onChange={ currentPage } />
                </div>
            </div>
        </>
    );
};

export default AllTab;
