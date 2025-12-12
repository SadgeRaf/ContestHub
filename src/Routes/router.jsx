import { createBrowserRouter } from "react-router"
import HomeLayout from "../Layout/HomeLayout"
import Home from "../Pages/Home"
import AuthLayout from "../Layout/AuthLayout"
import Login from "../Pages/Login"
import Registration from "../Pages/Registration"
import Error from '../Pages/Home'
import AllContests from "../Pages/AllContests"
import Contest from "../Pages/Contest"
import PrivateRoute from '../Provider/PrivateRoute'
import DashboardLayout from '../Layout/DashboardLayout'
import AddContest from "../Pages/AddContest"
import DashboardSuccess from "../Pages/DashboardSuccess"
import SearchPage from "../Pages/SearchPAge"
import RegisteredContests from "../Pages/RegisteredContests"
import Profile from "../Pages/Profile"
import Creator from "../Pages/Creator"
import WinningContest from "../Pages/WinningContest"
import CreatorApproval from "../Pages/CreatorApproval"

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <HomeLayout></HomeLayout>,
            children: [
                {
                    index: true,
                    element: <Home></Home>
                },
                {
                    path: 'allcontests',
                    element: <AllContests></AllContests>
                },
                {
                    path: `contest/:id`,
                    element: <PrivateRoute>
                        <Contest></Contest>
                    </PrivateRoute>
                },
                {
                    path: 'addcontest',
                    element: <PrivateRoute>
                        <AddContest></AddContest>
                    </PrivateRoute>
                },
                {
                    path: "/search/:query",
                    element: <SearchPage />
                },
                {
                    path:'creator',
                    element:<PrivateRoute>
                        <Creator></Creator>
                    </PrivateRoute>
                }

            ]
        },
        {
            path: '/dashboard',
            element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
            children: [
                {
                    path: 'success',
                    element: <DashboardSuccess></DashboardSuccess>
                },
                {
                    path: 'my-registered-contests',
                    element: <RegisteredContests></RegisteredContests>
                },
                {
                    path: 'my-winning-contests',
                    element: <WinningContest></WinningContest>
                },
                {
                    path: 'creatior-approval',
                    element: <CreatorApproval></CreatorApproval>
                },
                {
                    path: 'profile',
                    element: <Profile></Profile>
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