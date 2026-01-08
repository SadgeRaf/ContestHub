import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { role } = useRole();
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => toast.error(err));
    };

    const navItems = (
        <>
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/allcontests" className="hover:text-primary">All Contests</Link></li>
            {
                (role === 'creator' || role === 'admin') &&
                <li><Link to="/addcontest" className="hover:text-primary">Add a Contest</Link></li>
            }
            {
                user && (<li><Link to="/creator" className="hover:text-primary">Become a Creator</Link></li>)
            }
            <li><Link to="/leaderboard" className="hover:text-primary">Leaderboard</Link></li>
            {
                user && (<li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>)
            }
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
        </>
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const handleTheme = (checked) => {
        const newTheme = checked ? 'dark' : 'light';
        setTheme(newTheme);
    }

    return (
        <div className="navbar fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/20">
            
            <div className="navbar-start">
                
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-box w-52 border border-white/20 dark:border-gray-700/20">
                        {navItems}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl text-gray-800 dark:text-white">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                        ContestHub
                    </span>
                </Link>
            </div>

            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-gray-700 dark:text-gray-300">
                    {navItems}
                </ul>
            </div>

            
            <div className="navbar-end">
                {!user && (
                    <div className="space-x-2 hidden sm:flex">
                        <Link to="/auth/login" className="btn btn-sm btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-primary">
                            Login
                        </Link>
                        <Link to="/auth/registration" className="btn btn-sm btn-primary bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 border-none text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600">
                            Register
                        </Link>
                    </div>
                )}

                {/* Theme Toggle */}
                <label className="swap swap-rotate mr-4 ml-2">
                    <input 
                        type="checkbox" 
                        onChange={(e) => handleTheme(e.target.checked)}
                        checked={theme === 'dark'}
                        className="theme-controller" 
                    />
                    
                    <Sun className="swap-off w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <Moon className="swap-on w-5 h-5 text-gray-700 dark:text-gray-300" />
                </label>

                
                {!user && (
                    <div className="dropdown dropdown-end lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-sm text-gray-700 dark:text-gray-300">
                            Account
                        </label>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-box w-40 mt-3 p-2 shadow border border-white/20 dark:border-gray-700/20">
                            <li><Link to="/auth/login" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Login</Link></li>
                            <li><Link to="/auth/registration" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Register</Link></li>
                        </ul>
                    </div>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-2 ring-white/30 dark:ring-gray-600/30">
                                <img
                                    alt="profile"
                                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                    className="bg-gray-200 dark:bg-gray-700"
                                />
                            </div>
                        </label>

                        <ul tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-box w-52 border border-white/20 dark:border-gray-700/20">

                            <li className="p-2 font-semibold text-center text-gray-800 dark:text-gray-200 border-b border-white/20 dark:border-gray-700/20">
                                {user.displayName || "User"}
                            </li>

                            <li>
                                <Link to="/dashboard/profile" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="text-red-500 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;