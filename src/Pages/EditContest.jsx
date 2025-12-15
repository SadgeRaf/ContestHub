import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const CreatorContests = () => {
  const axiosSecure = useAxios();
  const [editingContest, setEditingContest] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: contests = [], refetch, isLoading } = useQuery({
    queryKey: ['creator-contests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/creator/contests');
      return res.data;
    },
  });

  const pendingContests = contests.filter(
    (c) => c.contestStatus === 'pending'
  );

  const activeContests = contests.filter(
    (c) => c.contestStatus !== 'pending'
  );

  const handleEditClick = (contest) => {
    setEditingContest(contest);
    reset({
      name: contest.name,
      banner: contest.banner,
      type: contest.type,
      registrationFee: contest.registrationFee,
      prize: contest.prize,
      deadline: contest.deadline?.split('T')[0],
      description: contest.description,
      taskDetails: contest.taskDetails,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contest?')) return;
    try {
      await axiosSecure.delete(`/creator/contest/${id}`);
      toast.success('Contest deleted!');
      refetch();
    } catch {
      toast.error('Failed to delete contest.');
    }
  };

  const onSubmit = async (formData) => {
    try {
      await axiosSecure.patch(
        `/creator/contest/${editingContest._id}`,
        formData
      );
      toast.success('Contest updated!');
      setEditingContest(null);
      refetch();
    } catch {
      toast.error('Failed to update contest.');
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading contests...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-12">
      <h1 className="text-3xl font-bold text-center sm:text-left">
        Creator Dashboard
      </h1>

      {/* ================= Pending Contests ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pending Contests</h2>

        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th className="hidden md:table-cell">Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingContests.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No pending contests
                  </td>
                </tr>
              )}

              {pendingContests.map((contest, i) => (
                <tr key={contest._id}>
                  <td>{i + 1}</td>
                  <td>{contest.name}</td>
                  <td>{contest.type}</td>
                  <td className="hidden md:table-cell">
                    ${contest.registrationFee}
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleEditClick(contest)}
                      className="btn btn-xs btn-success"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= Active / Approved Contests ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Active & Completed Contests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeContests.length === 0 && (
            <p>No active contests yet.</p>
          )}

          {activeContests.map((contest) => (
            <div
              key={contest._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-bold">{contest.name}</h3>
              <p className="text-sm text-gray-600">
                Type: {contest.type}
              </p>
              <p className="text-sm">
                Participants: {contest.participants || 0}
              </p>
              <p className="text-sm">
                Status: {contest.contestStatus}
              </p>

              {contest.banner && (
                <img
                  src={contest.banner}
                  alt={contest.name}
                  className="mt-3 h-32 w-full object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= Edit Form ================= */}
      {editingContest && (
        <section className="border p-6 rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-4">
            Edit Contest: {editingContest.name}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input {...register('name')} className="input input-bordered w-full" />
            <input {...register('banner')} className="input input-bordered w-full" />
            <input {...register('type')} className="input input-bordered w-full" />
            <input type="number" {...register('registrationFee')} className="input input-bordered w-full" />
            <input type="number" {...register('prize')} className="input input-bordered w-full" />
            <input type="date" {...register('deadline')} className="input input-bordered w-full" />
            <textarea {...register('description')} className="textarea textarea-bordered w-full" />
            <textarea {...register('taskDetails')} className="textarea textarea-bordered w-full" />

            <div className="flex gap-2">
              <button className="btn btn-primary">Update</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingContest(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default CreatorContests;
