import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const ContestApproval = () => {
  const axiosSecure = useAxios();

  // Fetch all pending contests
  const { data: contests = [], refetch, isLoading } = useQuery({
    queryKey: ['pending-contests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/contests/pending');
      return res.data;
    },
  });

  const handleApproval = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/admin/contests/${id}`, { status });
      if (res.data.success) {
        toast.success(`Contest ${status}`);
        refetch();
      } else {
        toast.error('Failed to update contest status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating contest');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Pending Contests Approval</h1>

      {contests.length === 0 ? (
        <p className="text-center py-4">No pending contests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Type</th>
                <th className="border px-4 py-2 text-left">Deadline</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contests.map((contest, index) => (
                <tr key={contest._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{contest.name}</td>
                  <td className="border px-4 py-2">{contest.type}</td>
                  <td className="border px-4 py-2">
                    {new Date(contest.deadline).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApproval(contest._id, 'approved')}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(contest._id, 'rejected')}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContestApproval;
