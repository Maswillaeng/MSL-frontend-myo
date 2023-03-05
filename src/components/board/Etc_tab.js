import React from 'react';

const EtcTab = () => {
    return (
        <div>
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="flex w-full h-11 border-b-2 border-black">
                                        <div className="inline-flex justify-start">
                                            <button>최신순</button>
                                            <button>추천순</button>
                                            <button>조회순</button>
                                        </div>
                                        <div className="inline-flex justify-end">
                                            <div className="relative text-lg bg-transparent text-gray-800">
                                                <div className="inline-flex items-center border-b border-b-2 border-teal-500 py-2">
                                                    <input className="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none" type="text" placeholder="검색" />
                                                    <button className="absolute right-10 top-0 mt-2 mr-4">검색</button>
                                                </div>
                                                <button className="bg-[#EA4E4E]">글쓰기</button>
                                            </div>
                                        </div>
                                    </div>
                                    <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    <tr className="border-b-2 border-black">
                                        <td className="px-4 py-4 text-sm font-medium dark:text-gray-200 whitespace-nowrap">
                                            <div className="inline bg-amber-300">
                                                NEW
                                            </div>
                                            <div className="inline-flex items-center gap-x-3">
                                                여기는 자유게시판 탭
                                            </div>
                                            <div className="inline">
                                                [댓글수]
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                내용 블라블라
                                            </div>
                                            <div className="w-20">
                                                <div className="text-center text-black bg-gray-200 rounded-md">
                                                    #해시태그
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            작성자
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            작성시간
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            조회수
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                좋아요
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="m-auto items-center hidden md:flex gap-x-3">
                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">4</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">5</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">6</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EtcTab;