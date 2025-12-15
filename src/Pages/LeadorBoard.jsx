import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";

const LeaderBoard = () => {
  const axiosSecure = useAxios();

  // Fetch all winners
  const { data: winners = [], isLoading, isError, error } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners/all");
      return res.data;
    },
  });

  if (isLoading)
    return <Loading></Loading>
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        {error.message || "Failed to fetch leaderboard"}
      </p>
    );

  if (winners.length === 0)
    return <p className="text-center mt-10">No winners yet.</p>;

  const sortedWinners = [...winners].sort((a, b) => b.prize - a.prize);

  return (
    <div className="max-w-6xl mx-auto mt-20 mb-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Contest</th>
              <th className="border px-4 py-2">Winner</th>
              <th className="border px-4 py-2">Prize</th>
              <th className="border px-4 py-2">Declared On</th>
            </tr>
          </thead>
          <tbody>
            {sortedWinners.map((winner, index) => (
              <tr key={winner._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 font-semibold">
                  {winner.contestName}
                </td>
                <td className="border px-4 py-2">{winner.winnerEmail}</td>
                <td className="border px-4 py-2">${winner.prize}</td>
                <td className="border px-4 py-2">
                  {new Date(winner.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
