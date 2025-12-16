import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Card from '../Components/Card';
import { Link } from 'react-router';
import Loading from './Loading';

const AllContests = () => {
  const axiosSecure = useAxios();
  const [filterType, setFilterType] = useState('all');
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

  const filteredContests = filterType === 'all'
    ? contests
    : contests.filter(c => c.type === filterType);

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
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        All Ongoing Contests <span className="text-primary">({filteredContests.length})</span>
      </h1>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="border px-4 py-2 rounded-lg"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1); 
          }}
        >
          {contestTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Contest Grid */}
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
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded hover:bg-gray-300 ${
              page === currentPage ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default AllContests;
