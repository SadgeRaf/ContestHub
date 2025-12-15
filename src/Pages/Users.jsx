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
      const res = await axiosSecure.patch(`/users/${user._id}`, { role: 'admin' });
      if (res.data.matchedCount) {
        toast.success(`${user.name} is now an Admin!`);
        refetch();
      } else {
        toast.error('Failed to update role.');
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
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left hidden sm:table-cell">Email</th>
              <th className="border px-4 py-2 text-left hidden md:table-cell">Role</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2 hidden sm:table-cell">{user.email}</td>
                <td className="border px-4 py-2 hidden md:table-cell">{user.role}</td>
                <td className="border px-4 py-2 flex gap-2 flex-wrap">
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
    </div>
  );
};

export default Users;
