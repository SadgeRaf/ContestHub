import React from "react";

const Card = ({ contest }) => {
  return (
    <div className="hover-3d w-96 bg-white/50 rounded-2xl shadow-lg overflow-hidden transition-transform duration-500 flex flex-col">
      {/* Image on top */}
      <div className="w-full h-56 overflow-hidden rounded-t-2xl">
        <img
          src={contest.banner}
          alt={contest.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content below image */}
      <div className="p-6 flex-1">
        <h2 className="text-xl text-black font-bold mb-3 ml-3 flex-wrap">{contest.name}</h2>
        <p className="text-sm text-black mb-3 ml-3">{contest.description.slice(0, 120)}...</p>
        <p className="text-sm text-black font-semibold mb-1 ml-2">Prize: {contest.prize}</p>
        <p className="text-xs text-black ml-2">
          Deadline: {new Date(contest.deadline).toLocaleDateString()}
        </p>
      </div>

      {/* 8 empty divs for 3D hover effect */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Card;
