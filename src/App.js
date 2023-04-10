import "./App.css";
import "./style/input.css";
import Header from "./components/Header";
import React, {useContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {getLoginUser} from "./context/AuthContextProvider";
import {useRecoilValue} from "recoil";

function App() {
    const userId = useRecoilValue(getLoginUser);
    return (
        <>
            <Header userId={ userId } />
            <Outlet/>
        </>
    );
}

export default App;
