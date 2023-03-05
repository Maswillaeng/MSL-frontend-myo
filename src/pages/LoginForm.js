import React from 'react';
import {Link} from "react-router-dom";

const LoginForm = () => {
    return (
        <div>
            <div>
                <div>
                    <div className='flex h-screen w-full items-center justify-center bg-cover bg-no-repeat' style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/18/18/54/drink-3237895_1280.jpg)' }}>
                        <div className="rounded-xl bg-[#FBF9EC] bg-opacity-40 px-44 py-20 shadow-lg backdrop-blur-md max-sm:px-14">
                            <div className="text-white">
                                <div className="mb-8 flex flex-col items-center text-2xl">
                                    <Link to="/">
                                        Mashillaeng
                                        {/*<img src="https://www.logo.wine/logo.svg" width="150" alt="" srcset="" />*/}
                                    </Link>
                                </div>

                                <form action="#">
                                    <div className="mb-4 text-lg">
                                        <input className="rounded-3xl border-none bg-gray-50 bg-opacity-20 px-6 py-2 placeholder-slate-100 outline-none backdrop-blur-md" type="text" placeholder="아이디" />
                                    </div>
                                    <div className="mb-4 text-lg">
                                        <input className="rounded-3xl border-none bg-gray-50 bg-opacity-20 px-6 py-2 placeholder-slate-100 outline-none backdrop-blur-md" type="password" placeholder="비밀번호" />
                                    </div>
                                    <div className="mt-8 flex justify-center text-lg">
                                        <button type="submit" className="rounded-3xl bg-[#EA4E4E] px-24 py-2 text-white shadow-xl duration-300 hover:bg-red-300">로그인</button>
                                    </div>
                                    <div className="flex justify-around mt-5 text-sm">
                                        <Link to="/Login" className="hover:text-[#EA4E4E]">
                                            회원가입
                                        </Link>
                                        <Link to="" className="hover:text-[#EA4E4E]">
                                            아이디 / 비밀번호 찾기
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;