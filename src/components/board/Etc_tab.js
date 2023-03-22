import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const EtcTab = ({etcList, loading}) => {
    const [etc, setEtc] = useState('')
    useEffect(()=>{
        setEtc(etcList.length)
        console.log(etcList)
    },[])
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
                                        <div
                                            className="inline-flex text-sm items-center border-b border-b-2 py-3">
                                            <input
                                                className="bg-transparent border-none mr-3 leading-tight focus:outline-none"
                                                type="text" placeholder="검색"/>
                                            <button className="right-10 top-0 mr-4">검색</button>
                                        </div>
                                        <button className="w-16 rounded-md mx-3 h-8 text-sm text-white font-bold bg-[#EA4E4E]">
                                            <Link to={"/BoardWrite"}>
                                                글쓰기
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 페이징 */}
        </>
    );
};

export default EtcTab;