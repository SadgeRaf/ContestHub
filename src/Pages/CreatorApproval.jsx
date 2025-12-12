import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const CreatorApproval = () => {
  const axiosSecure = useAxios();

  // Fetch all pending creators
  const { data: creators = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['creators', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/creators?status=pending');
      return res.data;
    },
  });

  const handleApproval = async (id, email) => {
    try {
      const res = await axiosSecure.patch(`/creators/${id}`, {
        status: 'approved',
        email, // needed to update user role
      });
      if (res.data.success) {
        toast.success('Creator approved!');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to approve creator.');
    }
  };

  const handleRejection = async (id) => {
    try {
      const res = await axiosSecure.patch(`/creators/${id}`, {
        status: 'rejected',
      });
      if (res.data.success) {
        toast.success('Creator rejected.');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to reject creator.');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Creator Approvals</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Bio</th>
            <th className="border px-4 py-2">Applied At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {creators.map((creator, index) => (
            <tr key={creator._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{creator.name}</td>
              <td className="border px-4 py-2">{creator.email}</td>
              <td className="border px-4 py-2">{creator.bio || '-'}</td>
              <td className="border px-4 py-2">{new Date(creator.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleApproval(creator._id, creator.email)}
                  className="btn btn-sm btn-success"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejection(creator._id)}
                  className="btn btn-sm btn-error"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}

          {creators.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No pending creators found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorApproval;
