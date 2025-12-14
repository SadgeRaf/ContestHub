import React from 'react';

const DashboardHome = () => {
    return (
        <div className="p-6 bg-base-100 min-h-screen flex flex-col items-center justify-center">
            {/* Welcome Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to ContestHub!</h1>
                <p className="text-gray-500 text-lg">
                    Manage your contests, view your progress, and explore all features from the sidebar.
                </p>
            </div>

            {/* Dashboard Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform">
                    <h2 className="text-xl font-semibold mb-2">Browse Contests</h2>
                    <p className="text-gray-500">Check out the latest contests and explore opportunities.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform">
                    <h2 className="text-xl font-semibold mb-2">Create Contest</h2>
                    <p className="text-gray-500">Easily set up a new contest if you are a creator.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-transform">
                    <h2 className="text-xl font-semibold mb-2">View Profile</h2>
                    <p className="text-gray-500">Manage your profile and account settings.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
