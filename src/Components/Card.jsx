import React from "react";
import { Link } from "react-router";
import { Trophy, Users, Calendar, Award } from "lucide-react";

const Card = ({ contest }) => {
  return (
    <div className="group hover-3d w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={contest.banner}
          alt={contest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Prize Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <Trophy className="w-4 h-4" />
          ${contest.prize}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {contest.name}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {contest.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Participants</p>
              <p className="font-semibold text-gray-900">{contest.participants}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Prize Pool</p>
              <p className="font-semibold text-gray-900">${contest.prize}</p>
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Deadline</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {new Date(contest.deadline).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* Action Button */}
        <Link 
          to={`/contest/${contest._id}`}
          className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;