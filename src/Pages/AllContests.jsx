import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Card from '../Components/Card';
import { Link } from 'react-router';

const AllContests = () => {
  const axiosSecure = useAxios();

  const { data: contests = [], isLoading, isError, error } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-20 text-lg font-medium">Loading contests...</p>;
  }

  if (isError) {
    return <p className="text-center mt-20 text-red-500 text-lg font-medium">Error: {error.message}</p>;
  }

  if (contests.length === 0) {
    return <p className="text-center mt-20 text-lg font-medium">No contests available.</p>;
  }

  return (
    <div className="mt-20 mb-16 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        All Ongoing Contests <span className="text-primary">({contests.length})</span>
      </h1>

      {/* Contest Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {contests.map((contest) => (
          <Card key={contest._id} contest={contest} />
        ))}
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
