import React, { use} from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const MyProfile = () => {
  const axiosSecure = useAxios();
  const { user, setUser } = use(AuthContext);

  const { register, handleSubmit, reset } = useForm();

  // Fetch registered contests (to calculate total participated)
  const { data: registered = [] } = useQuery({
    queryKey: ["registeredContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch winning contests from backend (you must create: GET /winners?email=)
  const { data: winning = [] } = useQuery({
    queryKey: ["winningContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?email=${user.email}`);
      return res.data;
    },
  });

  // Stats
  const participated = registered.length;
  const wins = winning.length;
  const winRate = participated > 0 ? ((wins / participated) * 100).toFixed(1) : 0;

  const chartData = [
    { name: "Wins", value: wins },
    { name: "Participated", value: participated - wins },
  ];

  const COLORS = ["#4CAF50", "#BDBDBD"];

  // Handle profile update
  const onSubmit = handleSubmit(async (formData) => {
    const updateData = {
      name: formData.name,
      photoURL: formData.photoURL,
      bio: formData.bio,
    };

    try {
      const res = await axiosSecure.patch(`/user/${user.email}`, updateData);

      if (res.data.success) {
        // Also update AuthContext user
        setUser({
          ...user,
          displayName: updateData.name,
          photoURL: updateData.photoURL,
        });

        toast.success("Profile updated!");

        reset();
      }
    } catch (err) {
      toast.error(err.message);
    }
  });

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="shadow-md p-6 rounded-xl mb-10 border">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.photoURL}
            alt="User"
            className="w-32 h-32 rounded-full border-2"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="mt-2 text-gray-700">
              {user.bio || "No bio added yet."}
            </p>
          </div>
        </div>
      </div>

      {/* Win Percentage Chart */}
      <div className=" p-6 shadow-md rounded-xl border mb-10">
        <h2 className="text-xl font-bold mb-4">Win Percentage</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <p className="text-center text-xl font-semibold mt-4">
          Win Rate: <span className="text-green-600">{winRate}%</span>
        </p>
      </div>

      {/* Profile Update Form */}
      <div className=" p-6 shadow-md rounded-xl border mb-10">
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              {...register("name")}
              defaultValue={user.displayName}
              className="input input-bordered w-full"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">Photo URL</label>
            <input
              {...register("photoURL")}
              defaultValue={user.photoURL}
              className="input input-bordered w-full"
            />
          </div>

          {/* Bio */}
          <div >
            <label className="label">Bio / Address</label>
            <textarea
              {...register("bio")}
              defaultValue={user.bio}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
