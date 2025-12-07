import { createBrowserRouter } from "react-router"
import HomeLayout from "../Layout/HomeLayout"
import Home from "../Pages/Home"

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
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: 'auth/login',
                    element: <Login></Login>,
                },
                {
                    path: "auth/registration",
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