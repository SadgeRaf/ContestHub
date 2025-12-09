import React, { useState, useEffect, use } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Modal from '../Components/Modal'; // your modal component
import { AuthContext } from '../Provider/AuthProvider';

const Contest = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = use(AuthContext)

  // Fetch contest data with TanStack Query
  const { data: contest, isLoading, isError, error } = useQuery({
    queryKey: ['contest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
  const paymentInfo = {
    prize: contest.prize,
    name: contest.name,      // must match backend
    email: user.email,
    contestId: contest._id,  // must match backend
  };

  try {
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  } catch (err) {
    console.error("Payment request failed:", err);
    alert("Payment initiation failed. Check console for details.");
  }
};


  if (isLoading) return <p className="text-center mt-10">Loading contest...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;
  if (!contest) return <p className="text-center mt-10">Contest not found.</p>;

  const isClosed = contest.status === "registered" || contest.status === "ended";

  return (
    <div className="max-w-4xl mx-auto mt-25 px-4 mb-10">
      {/* Banner */}
      <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl mb-6">
        <img
          src={contest.banner}
          alt={contest.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contest Info */}
      <h1 className="text-3xl font-bold mb-4">{contest.name}</h1>
      <p className="text-gray-700 mb-2">Prize: <span className="font-semibold">{contest.prize}</span></p>
      <p className="text-gray-700 mb-2">Participants: <span className="font-semibold">{contest.participantsCount || 0}</span></p>
      <p className="text-gray-700 mb-4">Deadline: <span className="font-semibold">{contest.deadline}</span></p>

      {/* Description & Task */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description & Task</h2>
        <p>{contest.description}</p>
      </div>

      {/* Winner */}
      {contest.winner && (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Winner</h2>
          <div className="flex items-center gap-4">
            <img
              src={contest.winner.photo}
              alt={contest.winner.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="text-lg font-semibold">{contest.winner.name}</p>
          </div>
        </div>
      )}

      {isClosed ? (
        <button className="btn btn-disabled">It's over</button>
      ) : (
        <button onClick={()=>handlePayment(contest)} className="btn">
          Pay {contest.prize} to register
        </button>
      )}


    </div>
  );
};

export default Contest;
