import React from 'react';
import Board from "../pages/Board";
import MyPage from "../pages/MyPage";
import {createBrowserRouter} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import AuthenticateCheck from "../components/AuthenticateCheck";

const RouterInfo = [

    // 얘는 아무 영양가가 없는 컴포넌트 입니다. (시간 남으면 같이 라우터 방식을 바꿔봅시당)
    {
        path: '/',
        element: <Board />,
        Auth: false,
    },
    {
        path: '/Login',
        element: <LoginForm />,
        Auth: false,
    },
    {
        path: '/MyPage',
        element: <MyPage />,
        Auth: true,
    },
]


const router = createBrowserRouter([
    RouterInfo.map((routerInfo) => {
        return routerInfo.Auth ? {
            path: routerInfo.path,
            element : (
                <AuthenticateCheck>
                    { routerInfo.element }
                </AuthenticateCheck>
            ),
        } : {
            path: routerInfo.path,
            element: routerInfo.element
        }
    })
    ]
)

export default router;