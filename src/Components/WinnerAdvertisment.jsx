import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Trophy, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WinnerAdvertisement = () => {
  const axiosSecure = useAxios();
  const containerRef = useRef();
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Main container animation
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    // Cards staggered animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });
      }
    });

  }, []);

  const { data: winners = [], isLoading, isError, error } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners");
      return res.data;
    },
  });

  const totalPrize = winners.reduce((sum, w) => sum + w.prize, 0);
  const totalWinners = winners.length;

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-white/70">Loading champions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400">Error loading winners: {error.message}</p>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="relative py-16 bg-gradient-to-br from-gray-900 to-purple-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our Champions</h2>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-lg font-semibold text-white">{totalWinners} Winners</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-lg font-semibold text-yellow-400">${totalPrize} Won</p>
            </div>
          </div>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner, index) => (
            <div
              key={winner._id}
              ref={el => cardsRef.current[index] = el}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Top Winner Badge */}
              {index === 0 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Trophy className="w-4 h-4" />
                    TOP WINNER
                  </div>
                </div>
              )}

              {/* Winner Image */}
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-20"></div>
                  <img
                    src={winner.img || "https://i.pravatar.cc/150"}
                    alt={winner.name}
                    className="relative w-20 h-20 mx-auto rounded-full border-4 border-gray-900 object-cover z-10"
                  />
                </div>
              </div>

              {/* Winner Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{winner.name}</h3>
                <p className="text-sm text-white/70 mb-3">{winner.contestName}</p>
                
                {/* Prize Display */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full">
                  <span className="text-xl font-bold text-yellow-400">
                    ${winner.prize}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
            Join the Competition
          </button>
          <p className="mt-3 text-white/60 text-sm">
            Be the next champion to win amazing prizes
          </p>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;