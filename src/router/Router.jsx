import React from 'react';
import Board from "../pages/Board";
import MyPage from "../pages/MyPage";
import {createBrowserRouter} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import AuthenticateCheck from "../components/AuthenticateCheck";
import NotFound from "../pages/NotFound";
import App from "../App";

const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <AuthenticateCheck path={"/"} auth={null} />,
                },
                {
                    path: "/LoginForm",
                    element: <AuthenticateCheck path={"/LoginForm"} auth={false} />,
                },
                {
                    path: "/UserPage/:nickname",
                    element: <AuthenticateCheck path={"/UserPage/:nickname"} auth={true} />,
                },
                {
                    path: "/Board/:postId",
                    element: <AuthenticateCheck path={"/Board/:postId"} auth={true} />,
                },
                {
                    path: "/BoardWrite",
                    element: <AuthenticateCheck path={"/BoardWrite"} auth={true} />,
                },
                {
                    path: "/Join",
                    element: <AuthenticateCheck path={"/Join"} auth={false} />,
                },
            ],
            errorElement: <NotFound />,
        },
]);

export default router;