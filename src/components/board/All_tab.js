import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Pagination} from "@mui/material";
import Search from "./Search";


const AllTab = ({allList, etc, loading}) => {

    // 페이지 네이션 (게시물 후에 수정 예정!)
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 게시물 자를 갯수
    const [postsPerPage, setPostsPerPage] = useState(6);
    // 페이징 끝 번호
    const indexOfLast = currentPage * postsPerPage;
    // 페이징 첫 번호
    const indexOfFirst = indexOfLast - postsPerPage;

    // 첫번호 끝번호로 현재페이지에서 보여줄 숫자 배열 만들기
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(etc / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 검색 (테스트 중!)
    const [userInput, setUserInput] = useState('')
    const [searchFilterList, setSearchFilterList] = useState([])
    const getSearchValue = (e) => {
        setUserInput(e.target.value)
    }
    const onSearch = (e) => {
        const filterData = allList.filter((item) =>
        item.title.includes(userInput)
    )
            setSearchFilterList(filterData)
            console.log(filterData)
    }

    return (
        <>
            {/* 게시물 수 확인 용 */}
            <span className="m-auto"><span className="text-red-500 text-lg font-bold">{etc}</span>개 글을 불러왔습니다</span>

            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
                                    <div
                                        className="relative text-lg bg-transparent text-gray-800">
                                        <div className="inline-flex text-sm items-center border-b border-b-2 py-3">
                                            <input className="bg-transparent border-none mr-3 leading-tight focus:outline-none"
                                                type="text" placeholder="검색" value={ userInput } onChange={ getSearchValue } />
                                            <button className="right-10 top-0 mr-4" onClick={ onSearch } >검색</button>
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
                            {loading && <div className="text-center"> 로딩 중... </div>}

                            {/* 게시물 */}
                            <div className="mx-1 grid grid-cols-4">

                                <div className="text-center p-5 h-80">
                                    <div className="h-52 overflow-hidden rounded-md">
                                        {/* thumnail */}
                                        <img src="https://cdn.pixabay.com/photo/2013/02/21/19/06/drink-84533_1280.jpg" />
                                    </div>
                                    <div className="font-bold my-3 overflow-hidden whitespace-nowrap text-ellipsis">
                                        {/* title */}
                                        여기는 전체 탭 입니다. 테스트 중이에요
                                    </div>
                                    <span className="text-sm pr-3">
                                    {/*  nickname  */}
                                        묘묘
                                    </span>
                                    <span className="text-sm">
                                    1분 전
                                    </span>
                                    <span className="text-sm pl-3">
                                        {/* 댓글수 */}
                                        💬 3
                                    </span>
                                    <span className="text-sm pl-3">
                                        {/* 조회수 */}
                                        👀 100
                                    </span>
                                    <span className="text-sm pl-3">
                                        {/* 좋아요 */}
                                        💗 100
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 페이징 */}
            {/*<Pagination count={10}></Pagination>*/}
            {/*<div className="">*/}
            {/*    <nav>*/}
            {/*        <ul className="pagination flex m-auto">*/}
            {/*            {pageNumbers.map((number) => (*/}
            {/*                <li key={number} className="page-item mx-3">*/}
            {/*                    <button onClick={() => setCurrentPage(number)} className="page-link">*/}
            {/*                        {number}*/}
            {/*                    </button>*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</div>*/}

            <Pagination count={ pageNumbers } defaultPage={1}></Pagination>
        </>
    );
};

export default AllTab;