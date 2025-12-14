import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const CreatorContests = () => {
    const axiosSecure = useAxios();
    const [editingContest, setEditingContest] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    // Fetch creator's contests
    const { data: contests = [], refetch, isLoading } = useQuery({
        queryKey: ['creator-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/creator/contests'); // fetch contests by creator
            return res.data;
        },
    });

    const handleEditClick = (contest) => {
        setEditingContest(contest);
        reset({
            name: contest.name,
            banner: contest.banner,
            type: contest.type,
            registrationFee: contest.registrationFee,
            prize: contest.prize,
            deadline: contest.deadline.split('T')[0],
            description: contest.description,
            taskDetails: contest.taskDetails
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contest?')) return;

        try {
            await axiosSecure.delete(`/creator/contest/${id}`);
            toast.success('Contest deleted!');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete contest.');
        }
    };

    const onSubmit = async (formData) => {
        try {
            await axiosSecure.patch(`/creator/contest/${editingContest._id}`, formData);
            toast.success('Contest updated successfully!');
            setEditingContest(null);
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update contest.');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading contests...</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">My Contests</h1>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Participants</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contests.map((contest, index) => (
                        <tr key={contest._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{contest.name}</td>
                            <td className="border px-4 py-2">{contest.type}</td>
                            <td className="border px-4 py-2">{contest.participants}</td>
                            <td className="border px-4 py-2">{contest.contestStatus}</td>
                            <td className="border px-4 py-2 flex gap-2">
                                {contest.contestStatus === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(contest)}
                                            className="btn btn-sm btn-success"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contest._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit form modal */}
            {editingContest && (
                <div className="mt-10 border p-6 rounded bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">Edit Contest: {editingContest.name}</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input {...register('name')} className="input input-bordered w-full" />
                        <input {...register('banner')} className="input input-bordered w-full" />
                        <input {...register('type')} className="input input-bordered w-full" />
                        <input type="number" {...register('registrationFee')} className="input input-bordered w-full" />
                        <input type="number" {...register('prize')} className="input input-bordered w-full" />
                        <input type="date" {...register('deadline')} className="input input-bordered w-full" />
                        <textarea {...register('description')} className="textarea textarea-bordered w-full" />
                        <textarea {...register('taskDetails')} className="textarea textarea-bordered w-full" />
                        <button type="submit" className="btn btn-primary">Update Contest</button>
                        <button type="button" onClick={() => setEditingContest(null)} className="btn btn-secondary ml-2">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatorContests;
