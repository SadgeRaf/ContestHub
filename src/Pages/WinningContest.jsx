import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';

const WinningContest = () => {
  const axiosSecure = useAxios();
  const { user } = use(AuthContext);

  const { data: winners = [], isLoading, isError, error } = useQuery({
    queryKey: ['winners', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading winning contests...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;
  if (winners.length === 0) return <p className="text-center mt-10">You haven't won any contests yet.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Winning Contests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {winners.map((contest, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{contest.contestName}</h2>
            <p className="text-gray-700 mb-1">Prize: <span className="font-bold">${contest.prize}</span></p>
            <p className="text-gray-700 mb-1">Declared on: {new Date(contest.declaredAt).toLocaleDateString()}</p>
            {contest.banner && (
              <img
                src={contest.banner}
                alt={contest.contestName}
                className="mt-2 w-full h-40 object-cover rounded-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningContest;
