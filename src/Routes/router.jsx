import { createBrowserRouter } from "react-router"
import HomeLayout from "../Layout/HomeLayout"
import Home from "../Pages/Home"
import AuthLayout from "../Layout/AuthLayout"
import Login from "../Pages/Login"
import Registration from "../Pages/Registration"
import Error from '../Pages/Home'

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <HomeLayout></HomeLayout>,
            children: [
                {
                    index: true,
                    element: <Home></Home>
                }
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: <Login></Login>,
                },
                {
                    path: "registration",
                    element: <Registration></Registration>,
                }
            ]
        },
        {
            path: "/*",
            element: <Error></Error>
        }
    ]
)

export default router;