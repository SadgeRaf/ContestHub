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
import Users from "../Pages/Users"
import ContestApproval from "../Pages/ContestApproval"
import AdminRoute from "../Provider/AdminRoute"
import EditContest from "../Pages/EditContest"
import PickWinner from "../Pages/PickWinner"
import DashboardHome from "../Pages/DashboardHome"
import LeaderBoard from "../Pages/LeadorBoard"

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
                },
                {
                    path:'leaderboard',
                    element: <LeaderBoard></LeaderBoard>
                }

            ]
        },
        {
            path: '/dashboard',
            element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
            children: [
                {
                    path: '',
                    element: <DashboardHome></DashboardHome>

                },
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
                    path: 'edit-contest',
                    element: <EditContest></EditContest>
                },
                {
                    path: 'pick-winner',
                    element: <PickWinner></PickWinner>
                },
                {
                    path: 'creator-approval',
                    element: <AdminRoute>
                        <CreatorApproval></CreatorApproval>
                    </AdminRoute>
                },
                {
                    path: 'contest-approval',
                    element: <AdminRoute>
                        <ContestApproval></ContestApproval>
                    </AdminRoute>
                },
                {
                    path: 'users',
                    element: <AdminRoute>
                        <Users></Users>
                    </AdminRoute>
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