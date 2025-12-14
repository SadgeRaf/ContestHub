import React from 'react';
import { Link } from 'react-router';
import useRole from '../hooks/useRole';
import { Outlet } from 'react-router';

const Layout = () => {
    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">ContestHub DashBoard</div>
                </nav>
                <Outlet></Outlet>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to='/'>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V9.75z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                            </Link>
                        </li>

                        <li>
                            <Link to='/dashboard/my-registered-contests'>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Registered Contests">
                                    {/* Clipboard icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6M9 8h6M9 20h6M3 4h18v16H3V4z" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">Registered Contests</span>
                                </button>
                            </Link>
                        </li>

                        <li>
                            <Link to='/dashboard/my-winning-contests'>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Winning Contests">
                                    {/* Trophy icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6M12 3l3 6H9l3-6zM5 7h14v4a7 7 0 01-14 0V7z" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">Winning Contests</span>
                                </button>
                            </Link>
                        </li>

                        {
                            role === 'admin' && <>


                                <li>
                                    <Link to='/dashboard/creator-approval'>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Creator Approval">
                                            {/* Check badge icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m1-5H4a2 2 0 00-2 2v16l7-4 7 4V5a2 2 0 00-2-2h-2z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Creator Approval</span>
                                        </button>
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/dashboard/users'>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users">
                                            {/* Users icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5" />
                                                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Users</span>
                                        </button>
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/dashboard/contest-approval'>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Contest Approval">
                                            {/* Clipboard check icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M9 4h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Contest Approval</span>
                                        </button>
                                    </Link>
                                </li>

                            </>
                        }

                        {
                            (role === 'creator' || role === 'admin') && <>
                                <li>
                                    <Link to='/dashboard/edit-contest'>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Edit Contest">
                                            {/* Pencil icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4l12-12-4-4L4 16v4z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Edit Contest</span>
                                        </button>
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/dashboard/pick-winner'>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pick Winner">
                                            {/* Star icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Pick Winner</span>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        }

                        {/* List item */}
                        <li>
                            <Link to='/dashboard/profile'>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                    {/* User circle icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-1c0-2 4-3 6-3s6 1 6 3v1H6z" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Layout;