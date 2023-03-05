import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const Header = () => {
  return (
    <div className="relative bg-main font-extrabold">
      <div className="border-b-zinc-400 border-t-stone-600 flex h-20  items-center justify-between border-t-4 border-b-2 ">
        <div>
          <Link to={"/"}>Mashillaeng</Link>
        </div>
        <div className="flex items-center gap-40">
          <FiSearch className="font-bold text-red-500" />
          <Link to={"/Board"}>Board</Link>
          <Link to={"/LoginForm"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
