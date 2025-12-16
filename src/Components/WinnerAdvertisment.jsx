import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const quotes = [
  "Greatness begins with a single challenge.",
  "Every winner was once a participant.",
  "Compete. Improve. Win.",
  "Your skills deserve recognition.",
];

const WinnerAdvertisement = () => {
  const axiosSecure = useAxios();
  const containerRef = useRef();
  const statsRef = useRef([]);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(statsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const { data: winners = [] } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners/all");
      return res.data;
    },
  });

  const totalPrize = winners.reduce((sum, w) => sum + w.prize, 0);
  const totalWinners = winners.length;

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/3 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <div className="mb-12">
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            “{quote}”
          </h2>
          <p className="mt-4 text-white/70">
            Real people. Real competitions. Real rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
          <div
            ref={(el) => (statsRef.current[0] = el)}
            className="bg-white/10 backdrop-blur-md rounded-xl py-8"
          >
            <p className="text-5xl font-extrabold text-yellow-400">
              {totalWinners}+
            </p>
            <p className="mt-2 text-lg text-white/80">
              Champions Created
            </p>
          </div>

          <div
            ref={(el) => (statsRef.current[1] = el)}
            className="bg-white/10 backdrop-blur-md rounded-xl py-8"
          >
            <p className="text-5xl font-extrabold text-green-400">
              ${totalPrize}+
            </p>
            <p className="mt-2 text-lg text-white/80">
              Prize Money Distributed
            </p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-lg text-white/70 mb-4">
            The next success story could be yours.
          </p>
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-white shadow-lg hover:scale-105 transition-transform">
            Start Competing
          </button>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;
