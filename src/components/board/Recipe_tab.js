import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const RecipeTab = ({recipeList, loading}) => {
    const [etc, setEtc] = useState('')

    useEffect(() => {

        setEtc(recipeList.length)

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
                                        <button
                                            className="w-16 rounded-md mx-3 h-8 text-sm text-white font-bold bg-[#EA4E4E]">
                                            <Link to={"/BoardWrite"}>
                                                글쓰기
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                { loading && <div className="text-center"> 로딩 중... </div>}
                                <tbody
                                    className="bg-transparent divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                {/* 게시물 */}
                                {
                                    recipeList.map((post, index) => {
                                        return (
                                            <tr className="flex">
                                                <td className="w-2/3 px-4 py-4">
                                                                        <span
                                                                            className="text-xs mt-1 rounded-md p-1 bg-amber-300">NEW
                                                                        </span>
                                                    <Link className="inline" to="/Board">
                                                        <div
                                                            className="inline-block w-80 pt-2 px-1 text-md font-bold text-ellipsis overflow-hidden whitespace-nowrap hover:underline">
                                                            {post.title}
                                                        </div>
                                                        <div
                                                            className="w-80 mt-1 text-sm opacity-50 text-ellipsis overflow-hidden whitespace-nowrap">
                                                            {post.content}
                                                        </div>
                                                    </Link>
                                                    <div className="">
                                                        {post.hashTag.map((hash, index) => {
                                                            return (
                                                                <div
                                                                    className="inline-flex p-1 mx-1 mt-2 text-center text-xs bg-gray-200 rounded-md"
                                                                    key={index}>
                                                                    {hash}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="w-20 m-auto text-sm text-gray-500 text-center">
                                                    {post.nickname}
                                                </td>
                                                <td className="w-20 m-auto text-sm text-gray-500 text-center">
                                                    {post.creatAt}
                                                </td>
                                                <td className="w-20 m-auto text-sm text-gray-500 text-center">
                                                    💬 {post.commentCount}
                                                </td>
                                                <td className="w-20 m-auto text-sm text-gray-500 text-center">
                                                    👀 {post.view}
                                                </td>
                                                <td className="w-20 m-auto text-sm text-gray-500 text-center">
                                                    💗 {post.like}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 페이징 */
            }
            <div className="flex items-center justify-between mt-6">
                <div className="m-auto items-center hidden md:flex gap-x-3">
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        3
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        4
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        5
                    </a>
                    <a
                        href="#"
                        className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        6
                    </a>
                </div>
            </div>
        </>
    );
};

export default RecipeTab;