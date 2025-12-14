import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxios();

  const { data: winners = [], isLoading, isError, error } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading winners...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  const totalPrize = winners.reduce((sum, w) => sum + w.prize, 0);
  const totalWinners = winners.length;

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-500">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Header */}
        <h2 className="text-5xl font-bold text-white mb-4">Recent Winners</h2>
        <p className="mb-12 text-lg text-white/80">
          Total Winners: {totalWinners} | Total Prize Money: ${totalPrize}
        </p>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {winners.map((winner, index) => (
            <div
              key={winner._id}
              className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {/* Ribbon for top winner */}
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 rounded-bl-lg font-bold">
                  TOP WINNER
                </div>
              )}

              <img
                src={winner.img || "https://i.pravatar.cc/150"}
                alt={winner.name}
                className="w-28 h-28 mx-auto rounded-full border-4 border-white mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold text-white">{winner.name}</h3>
              <p className="mt-1 text-sm text-white/80">{winner.contestName}</p>
              <p className="mt-2 text-lg font-medium text-yellow-300">
                Prize: ${winner.prize}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Animated background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply opacity-20 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply opacity-20 animate-pulse blur-3xl"></div>
    </section>
  );
};

export default WinnerAdvertisement;
