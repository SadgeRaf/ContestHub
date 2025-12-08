import React from "react";

const Card = ({ contest }) => {
  return (
    <div className="hover-3d">
      <figure className="w-60 rounded-2xl overflow-hidden shadow-lg">
        <img src={contest.banner} alt={contest.name} />
      </figure>

      <div>
        <h2 className="text-lg font-bold mb-2">{contest.name}</h2>
        <p className="text-sm mb-1">{contest.description.slice(0, 60)}...</p>
        <p className="text-sm font-semibold">Prize: {contest.prize}</p>
        <p className="text-xs text-gray-500">
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
