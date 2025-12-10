import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const RegisteredContests = () => {
  const axiosSecure = useAxios();

  const { user } = use(AuthContext);

  const { data: contests = [], isLoading, isError, error } = useQuery({
    queryKey: ['registeredContests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered?email=${user.email}`);
      return res.data;
    },
  });;



  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Registered Contests</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Contest Name</th>
            <th className="border px-4 py-2">Registration Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={contest._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{contest.contestName || contest.contestId}</td>
              <td className="border px-4 py-2">
                {new Date(contest.registeredAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{contest.status || 'Registered'}</td>
              <td className="border px-4 py-2">
                <button  className="btn btn-sm btn-primary">
                  Submit
                </button>
              </td>
            </tr>
          ))}
          {contests.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No registered contests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredContests;
