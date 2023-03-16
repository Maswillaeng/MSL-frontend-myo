import React, {useEffect, useState} from "react";
import Recipe_tab from "../components/board/Recipe_tab";
import CocktailSnack_tab from "../components/board/CocktailSnack_tab";
import Etc_tab from "../components/board/Etc_tab";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';
const Board = () => {
  // 게시판 토글 탭
  const board_tab = [
    {
      id: 0,
      title: "ALL",
      tab: null,
    },
    {
      id: 1,
      title: "RECIPE",
      tab: <Recipe_tab />,
    },
    {
      id: 2,
      title: "COCKTAIL / SNACK",
      tab: <CocktailSnack_tab />,
    },
    {
      id: 3,
      title: "ETC",
      tab: <Etc_tab />,
    },
  ];

  // 탭 인덱스 상태변수
  const [index, setIndex] = useState(0);

  // 게시글 불러오기
  useEffect(() => {
  const getBoardList = async () => {
    const { } = await axios.get(`http://localhost:3000/post`);
  };

  },[])

  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(nowTime);


  return (
    <div className="w-full h-screen items-center justify-center bg-[#FBF9EC] bg-cover">
      <div>
        {/* 상단 이미지 */}
        <div
          className="w-full h-28"
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_1280.jpg)",
          }}
        ></div>

        {/* 탭 */}
        <div className="w-full h-20">
          <ul className="m-auto flex justify-around pt-6 cursor-pointer">
            {board_tab.map((item) => (
              <li
                className={index === item.id ? "font-bold opacity-100" : "opacity-40"}
                key={item.id}
                onClick={() => setIndex(item.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* 게시판 */}
        <div>
          {index === 0 ?
              (
            <section className="container px-4 mx-auto">
              <div className="flex z-10 flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="flex w-full h-11 border-b-2 border-black">
                          {/* 정렬 버튼 */}
                          <div className="inline-flex flex-auto text-xs">
                            <button className="mx-3 decoration-red">
                              <span className="">●</span>
                              최신순</button>
                            <button className="mx-3">
                              <span>●</span>
                              추천순</button>
                            <button className="mx-3">
                              <span>●</span>
                              조회순</button>
                          </div>
                          {/* 검색, 글쓰기 버튼 */}
                          <div className="flex justify-end">
                            <div className="relative text-lg bg-transparent text-gray-800">
                              <div className="inline-flex text-sm items-center border-b border-b-2 py-3">
                                <input className="bg-transparent border-none mr-3 leading-tight focus:outline-none" type="text" placeholder="검색" />
                                <button className="right-10 top-0 mr-4">검색</button>
                              </div>
                              <button className="w-16 rounded-md mx-3 h-8 text-sm bg-[#EA4E4E]">
                                <Link to={"/BoardWrite"}>
                                  글쓰기
                                  </Link>
                                </button>
                            </div>
                          </div>
                        </div>

                        <tbody className="bg-transparent divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                        {/* 게시물 */}
                        <tr className="flex">
                          <td className="w-2/3 px-4 py-4">
                              <div className="inline text-xs mt-1 rounded-md p-1 bg-amber-300">NEW</div>
                              <div className="w-1/3 pt-2 inline-flex text-md font-bold text-ellipsis overflow-hidden whitespace-nowrap">

                              </div>
                              <div className="inline mx-2 text-xs text-[#EA4E4E]">[댓글수]</div>
                              <div className="inline-block w-2/3 items-center text-sm opacity-50 text-ellipsis overflow-hidden whitespace-nowrap">

                              </div>
                              <div className="w-16">
                                <div className="mt-2 text-center text-xs bg-gray-200 rounded-md">
                                  #해시태그
                                </div>
                              </div>
                            </td>
                          <div className="flex w-1/3 text-sm text-center text-gray-500">
                            <td className="w-20 m-auto ">
                              작성자
                            </td>
                            <td className="w-20 m-auto">

                            </td>
                            <td className="w-20 m-auto">
                              조회수
                            </td>
                            <td className="w-20 m-auto text-sm text-gray-500">
                              좋아요
                            </td>
                          </div>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* 페이징 */}
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
            </section>
          ) : (
            board_tab
              .filter((item) => index === item.id)
              .map((item, index) => <div key={index}>{item.tab}</div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
