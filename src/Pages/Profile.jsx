import React, { use } from "react";
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

const COLORS = ["#22c55e", "#e5e7eb"]; 

const MyProfile = () => {
  const axiosSecure = useAxios();
  const { user, setUser } = use(AuthContext);
  const { register, handleSubmit } = useForm();

  const { data: registered = [] } = useQuery({
    queryKey: ["registeredContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered?email=${user.email}`);
      return res.data;
    },
  });

  const { data: winning = [] } = useQuery({
    queryKey: ["winningContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/winners?winnerEmail=${user.email}`
      );
      return res.data;
    },
  });

  const participated = registered.length;
  const wins = winning.length;
  const losses = Math.max(participated - wins, 0);

  const winRate =
    participated > 0 ? ((wins / participated) * 100).toFixed(1) : "0.0";

  const chartData = participated
    ? [
      { name: "Wins", value: wins },
      { name: "Losses", value: losses },
    ]
    : [{ name: "No Data", value: 1 }];

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const res = await axiosSecure.patch(`/user/${user.email}`, formData);

      if (res.data.success) {
        setUser({
          ...user,
          displayName: formData.name,
          photoURL: formData.photoURL,
          bio: formData.bio,
        });

        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    }
  });

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* PROFILE CARD */}
      <div className="border rounded-xl p-6 mb-10 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={user.photoURL}
            alt="profile"
            className="w-32 h-32 rounded-full border"
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

      {/* CHART */}
      <div className="border rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Win Statistics</h2>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <p className="text-center mt-4 text-lg font-semibold">
          Win Rate:{" "}
          <span className="text-green-600">{winRate}%</span>
        </p>
      </div>

      {/* UPDATE FORM */}
      <div className="border rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            {...register("name")}
            defaultValue={user.displayName}
            className="input input-bordered w-full"
            placeholder="Name"
          />

          <input
            {...register("photoURL")}
            defaultValue={user.photoURL}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />

          <textarea
            {...register("bio")}
            defaultValue={user.bio}
            className="textarea textarea-bordered w-full"
            placeholder="Bio"
          />

          <button className="btn btn-primary w-full">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
