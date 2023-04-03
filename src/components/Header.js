import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../store/Auth";
const Header = () => {
  // 로그인&로그아웃
  const authenticated = useSelector((state) => state.authToken.authenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(DELETE_TOKEN());
  };
  return (
    <div className="relative bg-main font-extrabold">
      <div className="border-b-zinc-400 border-t-stone-600 flex h-20  items-center justify-between border-t-4 border-b-2 ">
        <div>
          <Link to={"/"}>Mashillaeng</Link>
        </div>
        <div className="flex items-center gap-40">
          <FiSearch className="font-bold text-red-500" />
          <Link to={"/Board"}>Board</Link>
          {authenticated ? (
            <>
              <Link to={"/MyPage/:userId"}>MyPage</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to={"/LoginForm"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
