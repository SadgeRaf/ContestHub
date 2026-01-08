import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Card from '../Components/Card';
import { Link } from 'react-router';
import Loading from './Loading';
import { Search } from 'lucide-react';

const AllContests = () => {
  const axiosSecure = useAxios();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const { data: contests = [], isLoading, isError, error } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center mt-20 text-red-500 text-lg font-medium">Error: {error.message}</p>;
  if (contests.length === 0) return <p className="text-center mt-20 text-lg font-medium">No contests available.</p>;

  const contestTypes = ["all", ...new Set(contests.map(c => c.type))];

  // Filter contests based on type and search query
  const filteredContests = contests.filter(contest => {
    const matchesType = filterType === 'all' || contest.type === filterType;
    const matchesSearch = searchQuery === '' || 
      contest.contestName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContests = filteredContests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="mt-20 mb-16 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
        All Ongoing Contests <span className="text-primary">({filteredContests.length})</span>
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Browse through all available contests and find your next challenge
      </p>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contests by category"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            className="w-full md:w-auto border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
          >
            {contestTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Categories' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(filterType !== 'all' || searchQuery) && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setFilterType('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-sm text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Contest Grid */}
      {filteredContests.length > 0 ? (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {currentContests.map((contest) => (
              <Card key={contest._id} contest={contest} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-800 dark:text-white"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 ${
                  page === currentPage 
                    ? 'bg-primary text-white dark:bg-primary' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-800 dark:text-white"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            No contests found matching your search criteria.
          </p>
          <button
            onClick={() => {
              setFilterType('all');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="btn btn-primary"
          >
            View All Contests
          </button>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/"
          className="btn btn-primary px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default AllContests;