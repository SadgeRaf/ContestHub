import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios"; // your axios hook

const WinnerAdvertisement = () => {
  const axiosSecure = useAxios();

  // Fetch winners from backend
  const { data: winners = [], isLoading, isError, error } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners"); // endpoint for winners
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading winners...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  // Optional: calculate total prize and total winners
  const totalPrize = winners.reduce((sum, w) => sum + w.prize, 0);
  const totalWinners = winners.length;

  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 py-16 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-8">
          🎉 Recent Winners
        </h2>
        <p className="text-center mb-12 text-lg">
          Total Winners: {totalWinners} | Total Prize Money: ${totalPrize}
        </p>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {winners.map((winner) => (
            <div
              key={winner._id}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-center"
            >
              <img
                src={winner.img || "https://i.pravatar.cc/150"}
                alt={winner.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-white mb-4"
              />
              <h3 className="text-2xl font-semibold">{winner.name}</h3>
              <p className="mt-2 text-lg font-medium">Prize: ${winner.prize}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;
