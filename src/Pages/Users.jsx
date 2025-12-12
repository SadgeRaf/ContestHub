import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const Users = () => {
    const axiosSecure = useAxios();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleMakeAdmin = async (user) => {
        try {
            const roleInfo = { role: 'admin' }
            const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
            if (res.data.matchedCount) {
                toast.success(`${user.name} is now an Admin!`);
                
                refetch();
            } else {
                toast.error('Failed to update role.');
                console.log(res.data)
            }
        } catch (err) {
            console.error(err);
            toast.error('Error updating role.');
        }
    };

    const handleMakeUser = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}`, { role: 'user' });
            if (res.data.modifiedCount > 0) {
                toast.success(`${user.name} is now a User!`);
                refetch();
            } else {
                toast.error('Failed to update role.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error updating role.');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">All Users</h1>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2 flex gap-2">
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm btn-success"
                                    >
                                        Make Admin
                                    </button>
                                )}
                                {user.role !== 'user' && (
                                    <button
                                        onClick={() => handleMakeUser(user)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Make User
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
