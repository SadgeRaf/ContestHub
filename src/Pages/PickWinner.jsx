import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const PickWinner = () => {
    const axiosSecure = useAxios();
    const [selectedContest, setSelectedContest] = useState(null);
    const [selectedWinner, setSelectedWinner] = useState('');

    // Fetch approved contests for this creator
    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['approved-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/creator/contests/approved');
            return res.data;
        },
    });

    const handlePickWinner = async () => {
        if (!selectedContest || !selectedWinner) return;
        try {
            await axiosSecure.patch(`/creator/contests/${selectedContest._id}/winner`, {
                winnerEmail: selectedWinner
            });
            toast.success('Winner selected successfully!');
            setSelectedContest(null);
            setSelectedWinner('');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to select winner.');
        }
    };

    if (isLoading) return <p>Loading approved contests...</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Pick a Winner</h1>

            <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Contest Name</th>
                        <th className="border px-4 py-2">Participants</th>
                        <th className="border px-4 py-2">Submissions</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contests.map((contest, index) => (
                        <tr key={contest._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{contest.name}</td>
                            <td className="border px-4 py-2">{contest.participants}</td>
                            <td className="border px-4 py-2">
                                {contest.submissions?.length || 0}
                            </td>
                            <td className="border px-4 py-2">
                                {contest.submissions?.length > 0 && (
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => setSelectedContest(contest)}
                                    >
                                        Pick Winner
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedContest && (
                <div className="border p-6 rounded bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">
                        Select Winner for: {selectedContest.name}
                    </h2>
                    <select
                        className="input input-bordered w-full mb-4"
                        value={selectedWinner}
                        onChange={(e) => setSelectedWinner(e.target.value)}
                    >
                        <option value="">Select a submission</option>
                        {selectedContest.submissions.map((sub, i) => (
                            <option key={i} value={sub.userEmail}>
                                {sub.userEmail}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-primary mr-2"
                        onClick={handlePickWinner}
                    >
                        Confirm Winner
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedContest(null)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default PickWinner;
