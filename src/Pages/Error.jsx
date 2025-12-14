import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4">
            <h1 className="text-9xl font-extrabold animate-pulse">404</h1>
            <p className="text-2xl md:text-4xl mt-4 mb-8 text-center">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link to="/" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300">
                Go Back Home
            </Link>
            <div className="mt-12">
                <img
                    src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
                    alt="funny error"
                    className="w-64 md:w-96 rounded-xl shadow-lg"
                />
            </div>
        </div>
    );
};

export default Error;
