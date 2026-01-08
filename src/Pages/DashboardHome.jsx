import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxios from '../hooks/useAxios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Trophy, Users, Calendar, DollarSign, TrendingUp, Award, Target, Clock, Star, CheckCircle, AlertCircle } from 'lucide-react';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();

  // Common queries for all roles
  const { data: userStats = {}, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats', user?.email, user?.role],
    queryFn: async () => {
      const stats = {};
      
      // User stats (common for all)
      if (user?.email) {
        try {
          const [winnersRes, registeredRes] = await Promise.all([
            axiosSecure.get(`/winners?winnerEmail=${user.email}`).catch(() => ({ data: [] })),
            axiosSecure.get(`/registered?email=${user.email}`).catch(() => ({ data: [] }))
          ]);
          
          stats.wonContests = winnersRes?.data || [];
          stats.participatedContests = registeredRes?.data || [];
          stats.totalWins = stats.wonContests.length;
          stats.totalParticipations = stats.participatedContests.length;
        } catch (err) {
          console.error("Error fetching user stats:", err);
        }
      }

      // Admin-specific stats
      if (user?.role === 'admin') {
        try {
          const [usersRes, contestsRes, pendingContestsRes, creatorsRes] = await Promise.all([
            axiosSecure.get('/users').catch(() => ({ data: [] })),
            axiosSecure.get('/contests').catch(() => ({ data: [] })),
            axiosSecure.get('/admin/contests/pending').catch(() => ({ data: [] })),
            axiosSecure.get('/creators?status=pending').catch(() => ({ data: [] }))
          ]);
          
          stats.totalUsers = usersRes?.data?.length || 0;
          stats.totalContests = contestsRes?.data?.length || 0;
          stats.pendingContests = pendingContestsRes?.data?.length || 0;
          stats.pendingCreators = creatorsRes?.data?.length || 0;
          
          // Calculate role distribution
          if (usersRes?.data) {
            const roleCounts = usersRes.data.reduce((acc, u) => {
              acc[u.role] = (acc[u.role] || 0) + 1;
              return acc;
            }, { admin: 0, creator: 0, user: 0 });
            stats.roleDistribution = roleCounts;
          }
        } catch (err) {
          console.error("Error fetching admin stats:", err);
        }
      }

      // Creator-specific stats
      if (user?.role === 'creator') {
        try {
          const [creatorContestsRes, approvedContestsRes] = await Promise.all([
            axiosSecure.get('/creator/contests').catch(() => ({ data: [] })),
            axiosSecure.get('/creator/contests/approved').catch(() => ({ data: [] }))
          ]);
          
          stats.myContests = creatorContestsRes?.data || [];
          stats.approvedContests = approvedContestsRes?.data || [];
          
          // Calculate contest status distribution
          if (stats.myContests.length > 0) {
            const statusCounts = stats.myContests.reduce((acc, contest) => {
              const status = contest.contestStatus || 'pending';
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            }, { pending: 0, approved: 0, completed: 0 });
            stats.contestStatus = statusCounts;
          }
        } catch (err) {
          console.error("Error fetching creator stats:", err);
        }
      }

      return stats;
    },
    enabled: !!user, // Only run if user exists
  });

  const prepareChartData = () => {
    const { roleDistribution, contestStatus, myContests = [] } = userStats;
    const data = {};

    if (user?.role === 'admin' && roleDistribution) {
      // Admin: User role distribution pie chart data
      data.pieData = [
        { name: 'Admin', value: roleDistribution.admin || 0, color: '#8b5cf6' },
        { name: 'Creator', value: roleDistribution.creator || 0, color: '#10b981' },
        { name: 'User', value: roleDistribution.user || 0, color: '#3b82f6' }
      ].filter(item => item.value > 0);

      // Admin: Platform growth line chart (mock monthly data)
      data.lineData = [
        { month: 'Jan', users: 100, contests: 20 },
        { month: 'Feb', users: 120, contests: 25 },
        { month: 'Mar', users: 150, contests: 30 },
        { month: 'Apr', users: 180, contests: 35 },
        { month: 'May', users: 220, contests: 40 },
        { month: 'Jun', users: 250, contests: 45 },
      ];
    }

    if (user?.role === 'creator' && contestStatus) {
      // Creator: Contest status distribution
      data.pieData = [
        { name: 'Approved', value: contestStatus.approved || 0, color: '#10b981' },
        { name: 'Pending', value: contestStatus.pending || 0, color: '#f59e0b' },
        { name: 'Completed', value: contestStatus.completed || 0, color: '#8b5cf6' }
      ].filter(item => item.value > 0);

      // Creator: Contest participation bar chart
      if (myContests.length > 0) {
        data.barData = myContests.slice(0, 5).map(contest => ({
          name: contest.name?.substring(0, 15) + (contest.name?.length > 15 ? '...' : ''),
          participants: contest.participants || 0,
          prize: parseInt(contest.prize) || 0
        }));
      }
    }

    if (user?.role === 'user') {
      // User: Performance over time
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      data.lineData = months.map((month, index) => ({
        month,
        participations: Math.floor(Math.random() * 5) + 1, // Mock data
        wins: Math.floor(Math.random() * 2)
      }));
    }

    return data;
  };

  const chartData = prepareChartData();

  const StatCard = ({ icon: Icon, title, value, color, subtext }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
          {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtext}</p>}
        </div>
      </div>
    </div>
  );

  // Get user display name
  const getUserName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-base-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-base-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>Error loading dashboard data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 dark:bg-gray-900 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Welcome back, {getUserName()}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here's what's happening with your {user?.role === 'admin' ? 'platform' : 'account'} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Role-specific stats */}
        {user?.role === 'admin' ? (
          <>
            <StatCard
              icon={Users}
              title="Total Users"
              value={userStats.totalUsers || 0}
              color="bg-blue-500"
              subtext="Platform members"
            />
            <StatCard
              icon={Calendar}
              title="Total Contests"
              value={userStats.totalContests || 0}
              color="bg-green-500"
              subtext="All competitions"
            />
            <StatCard
              icon={AlertCircle}
              title="Pending Approvals"
              value={(userStats.pendingContests || 0) + (userStats.pendingCreators || 0)}
              color="bg-yellow-500"
              subtext="Awaiting review"
            />
            <StatCard
              icon={CheckCircle}
              title="Active Today"
              value="85%"
              color="bg-purple-500"
              subtext="Platform activity"
            />
          </>
        ) : user?.role === 'creator' ? (
          <>
            <StatCard
              icon={Calendar}
              title="Total Contests"
              value={userStats.myContests?.length || 0}
              color="bg-blue-500"
              subtext="Created by you"
            />
            <StatCard
              icon={CheckCircle}
              title="Approved Contests"
              value={userStats.approvedContests?.length || 0}
              color="bg-green-500"
              subtext="Ready for participants"
            />
            <StatCard
              icon={Clock}
              title="Awaiting Winners"
              value={userStats.contestStatus?.pending || 0}
              color="bg-yellow-500"
              subtext="To be judged"
            />
            <StatCard
              icon={DollarSign}
              title="Total Prize Pool"
              value={`$${userStats.myContests?.reduce((sum, c) => sum + (parseInt(c.prize) || 0), 0) || 0}`}
              color="bg-purple-500"
              subtext="Across all contests"
            />
          </>
        ) : (
          <>
            <StatCard
              icon={Trophy}
              title="Contests Won"
              value={userStats.totalWins || 0}
              color="bg-yellow-500"
              subtext="Total victories"
            />
            <StatCard
              icon={Target}
              title="Contests Participated"
              value={userStats.totalParticipations || 0}
              color="bg-blue-500"
              subtext="Total entries"
            />
            <StatCard
              icon={Award}
              title="Win Rate"
              value={userStats.totalParticipations ? `${Math.round((userStats.totalWins / userStats.totalParticipations) * 100)}%` : '0%'}
              color="bg-green-500"
              subtext="Success ratio"
            />
            <StatCard
              icon={TrendingUp}
              title="Current Streak"
              value="3"
              color="bg-purple-500"
              subtext="Active participations"
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      {(chartData.pieData || chartData.lineData || chartData.barData) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          {chartData.pieData && chartData.pieData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                {user?.role === 'admin' ? 'User Distribution by Role' : 'Contest Status Distribution'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderColor: '#e5e7eb',
                      color: '#374151'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Line/Bar Chart */}
          {(chartData.lineData || chartData.barData) && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                {user?.role === 'admin' ? 'Platform Growth (Last 6 Months)' : 
                 user?.role === 'creator' ? 'Top Contests by Participation' : 
                 'Your Performance Trend'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                {chartData.lineData ? (
                  user?.role === 'user' ? (
                    <AreaChart data={chartData.lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderColor: '#e5e7eb',
                          color: '#374151'
                        }}
                      />
                      <Area type="monotone" dataKey="participations" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Participations" />
                      <Area type="monotone" dataKey="wins" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="Wins" />
                    </AreaChart>
                  ) : (
                    <LineChart data={chartData.lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderColor: '#e5e7eb',
                          color: '#374151'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="contests" stroke="#82ca9d" />
                    </LineChart>
                  )
                ) : (
                  <BarChart data={chartData.barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderColor: '#e5e7eb',
                        color: '#374151'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="participants" fill="#8884d8" name="Participants" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user?.role === 'admin' ? (
            <>
              <button className="btn btn-primary dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700">
                Review Pending Approvals
              </button>
              <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Platform Analytics
              </button>
              <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                User Management
              </button>
            </>
          ) : user?.role === 'creator' ? (
            <>
              <button className="btn btn-primary dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700">
                Create New Contest
              </button>
              <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                View Pending Judging
              </button>
              <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Analytics Report
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700">
                Browse New Contests
              </button>
              <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                View My Submissions
              </button>
              <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Check Rankings
              </button>
            </>
          )}
        </div>
      </div>

      {/* Empty State if no data */}
      {!userStats.totalUsers && !userStats.totalWins && !userStats.myContests?.length && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Data Available</h3>
          <p className="text-gray-500 dark:text-gray-500">
            {user?.role === 'admin' 
              ? 'Start by reviewing pending approvals and managing users.' 
              : user?.role === 'creator'
              ? 'Create your first contest to get started!'
              : 'Join your first contest to see your stats here!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;