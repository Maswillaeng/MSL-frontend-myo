import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {removeCookie} from "../function/cookies";
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigate();
  const LogoutHandler = () => {
    removeCookie("");
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("accessTime");
    setIsLogin(false);
    navigation("/");
  }

  useEffect(() => {
    // if(){
    //   setIsLogin(true);
    // }
  }, [])

  return (
    <div className="relative bg-main font-extrabold">
      <div className="border-b-zinc-400 border-t-stone-600 flex h-20  items-center justify-between border-t-4 border-b-2 ">
        <div>
          <Link to={"/"}>Mashillaeng</Link>
        </div>
        <div className="flex items-center gap-40">
          <FiSearch className="font-bold text-red-500" />
          <Link to={"/Board"}>Board</Link>
          { isLogin ?
              <>
              <Link to={"/MyPage:userId"}>MyPage</Link>
              <button onClick={ LogoutHandler }>Logout</button>
              </>
              :
              <Link to={"/LoginForm"}>Login</Link>
          }

        </div>
      </div>
    </div>
  );
};

export default Header;
