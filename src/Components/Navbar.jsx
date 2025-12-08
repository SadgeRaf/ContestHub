import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {})
            .catch(err => toast.error(err));
    };

    const navItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </>
    );

    return (
        <div className="navbar absolute bg-transparent shadow-md top-0 left-0 w-full z-50">
            {/* LEFT */}
            <div className="navbar-start">
                {/* MOBILE DROPDOWN */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl">ContestHub</Link>
            </div>

            {/* CENTER (Desktop Menu) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            {/* RIGHT — LOGIN / REGISTER / AVATAR */}
            <div className="navbar-end">
                {!user && (
                    <div className="space-x-2 hidden sm:flex">
                        <Link to="/auth/login" className="btn btn-sm btn-outline">Login</Link>
                        <Link to="/auth/registration" className="btn btn-sm btn-primary">Register</Link>
                    </div>
                )}

                {/* Mobile buttons (stacked in dropdown) */}
                {!user && (
                    <div className="dropdown dropdown-end lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-sm">Account</label>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box w-40 mt-3 p-2 shadow">
                            <li><Link to="/auth/login">Login</Link></li>
                            <li><Link to="/auth/registration">Register</Link></li>
                        </ul>
                    </div>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="profile"
                                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                />
                            </div>
                        </label>

                        <ul tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                            <li className="p-2 font-semibold text-center">
                                {user.displayName || "User"}
                            </li>

                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>

                            <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
