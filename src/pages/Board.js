import React, {useEffect, useState} from "react";
import Recipe_tab from "../components/board/Recipe_tab";
import CocktailSnack_tab from "../components/board/CocktailSnack_tab";
import Etc_tab from "../components/board/Etc_tab";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';
import All_tab from "../components/board/All_tab";

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
        const [etc, setEtc] = useState();

        // 게시글 불러오기
        useEffect(() => {
            // setLoading(true)
            //
            // axios.get(`/api/post`)
            //     .then(res => {
            //       const {resList, ...EtcData} = res.data
            //       setAllList(resList)
            //       setEtc(EtcData)
            //       console.log(EtcData.code)
            //     })
            //     .catch(err => console.log(err))
            //
            //  setLoading(false)

            const ListData = async () => {
                setLoading(true)
                try {
                    const res = await axios.post("/api/post");
                    console.log(res);
                    setAllList(res.data);
                    setLoading(false)
                }
                catch (err) {
                    console.log(err);
                };
            };

            ListData();
        }, []);

        // 게시글 시간 표기
        const nowTime = moment().format('YYYY-MM-DD hh:mm:ss');

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
                        <section className="container px-4 mx-auto">
                        { index === 0 ? <All_tab allList={allList} etc={etc} loading={loading} />
                            :
                           index === 1 ? <Recipe_tab recipeList={recipeList} loading={loading} />
                               :
                               index === 2 ? <CocktailSnack_tab cockList={cockList} loading={loading} />
                                   :
                                   <Etc_tab etcList={etcList} loading={loading} />
                        }
                        </section>
                    </div>
                </div>
            </div>
        )
            ;
    }
;

export default Board;
