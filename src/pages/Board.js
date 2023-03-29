import React, { useEffect, useState } from "react";
import Recipe_tab from "../components/board/Recipe_tab";
import CocktailSnack_tab from "../components/board/CocktailSnack_tab";
import Etc_tab from "../components/board/Etc_tab";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import All_tab from "../components/board/All_tab";
import boardList from "./Dummy_postList_data"
import {useSelector} from "react-redux";

const Board = () => {
  // 게시판 토글 탭
  const board_tab = [
    {
      id: 0,
      title: "ALL",
    },
    {
      id: 1,
      title: "RECIPE",
    },
    {
      id: 2,
      title: "COCKTAIL / SNACK",
    },
    {
      id: 3,
      title: "ETC",
    },
  ];

  // 탭 인덱스 상태변수
  const [index, setIndex] = useState(0);
  // 게시글 test dummyList
  const [allList, setAllList] = useState([]);
  const [cockList, setCockList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [etcList, setEtcList] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(false);
  // 게시물 갯수 (임시)
  const [postCount, setPostCount] = useState();

  //test dummy
  // const token = useSelector(state => state.token);
  // {headers: {"content-Type": "application/json",}}
  // 게시글 불러오기

  useEffect(() => {

    //api 요청 시 마다 헤더에 at 담아주는 설정
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // const authenticated = useSelector((state) => state.authToken.authenticated);

    //?? 왜 자꾸 토큰 달라고 하는 걸까
    //{headers : {"Content-Type" : "application/json"} }
    // 전체 게시물 리스트 요청
    const ListData = async () => {
      const postRes = await axios.get("api/post/posts",{})
      // 콘솔 확인용
      console.log(postRes.status) //200
      console.log(postRes.statusText) //ok
      console.log(postRes.data) //list - id,created_date,content,thumnail,title,user_id
      // 각 탭에 보내야 할 카테고리 DB 필요할 듯, 그러므로 All_tab만 현재 구현 중
    }

    setLoading(true)
    // setAllList(boardList)
    ListData()
      .then((postRes) => {
        setAllList(postRes.data)
        setPostCount(postRes.data.length) // 임시 게시물 갯수 카운트, totalCount 전달받으면 그거 쓸 예정
      })
      .catch((err) => console.log("게시물 리스트 에러 " + err))
    setLoading(false)
  }, []);

  // 게시글 시간 표기
  const nowTime = moment().format("YYYY-MM-DD hh:mm:ss");

  return (
    <div className="w-full h-screen items-center justify-center bg-[#FBF9EC] bg-cover ">
      <div>
        {/* 상단 이미지 */}
        <div
          className="w-full h-28"
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_1280.jpg)",
          }}
        />

        {/* 탭 */}
        <div className="w-full h-20">
          <ul className="m-auto flex justify-around pt-6 cursor-pointer">
            {board_tab.map((item) => (
              <li
                className={
                  index === item.id ? "font-bold opacity-100" : "opacity-40"
                }
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
          <section className="container px-4 mx-auto">
            {index === 0 ? (
              <All_tab allList={allList} postCount={postCount} loading={loading} />
            ) : index === 1 ? (
              <Recipe_tab recipeList={recipeList} loading={loading} />
            ) : index === 2 ? (
              <CocktailSnack_tab cockList={cockList} loading={loading} />
            ) : (
              <Etc_tab etcList={etcList} loading={loading} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
export default Board;
