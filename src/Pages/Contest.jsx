import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const Contest = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const { data: contest, isLoading, isError, error } = useQuery({
    queryKey: ['contest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  const { data: registration } = useQuery({
    queryKey: ['registration', id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered/single?contestId=${id}&email=${user.email}`);
      return res.data; // null if not registered
    },
  });

  const alreadyRegistered = registration?.contestStatus === 'registered';
  const [timeLeft, setTimeLeft] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  const [winnerData, setWinnerData] = useState(null);

  // Countdown effect
  useEffect(() => {
    if (!contest?.deadline) return;

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const deadlineTime = new Date(contest.deadline).getTime();
      const distance = deadlineTime - now;

      if (distance <= 0) {
        setTimeLeft('Contest ended');
        setIsEnded(true);
        clearInterval(countdown);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(countdown);
  }, [contest?.deadline]);

  // Fetch winner info if winner exists
  useEffect(() => {
    if (contest?.winner) {
      axiosSecure
        .get(`/users?email=${contest.winner}`)
        .then(res => setWinnerData(res.data[0]))
        .catch(err => console.error(err));
    }
  }, [contest?.winner, axiosSecure]);

  const handlePayment = async () => {
    if (!contest) return;

    const paymentInfo = {
      fee: contest.registrationFee,
      name: contest.name,
      email: user.email,
      contestId: contest._id,
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

  const isClosed = contest.contestStatus === 'completed' || isEnded;

  return (
    <div className="max-w-4xl mx-auto mt-25 px-4 mb-10">
      {/* Banner */}
      <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl mb-6">
        <img src={contest.banner} alt={contest.name} className="w-full h-full object-cover" />
      </div>

      {/* Contest Info */}
      <h1 className="text-3xl font-bold mb-4">{contest.name}</h1>
      <p className="text-gray-700 mb-2">Prize: <span className="font-semibold">{contest.prize}</span></p>
      <p className="text-gray-700 mb-2">Participants: <span className="font-semibold">{contest.participants}</span></p>
      <p className="text-gray-700 mb-4">Deadline: <span className="font-semibold">{contest.deadline}</span></p>
      <p className={`mb-4 font-semibold ${isEnded ? 'text-red-500' : 'text-green-600'}`}>Time left: {timeLeft}</p>

      {/* Description & Task */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description & Task</h2>
        <p>{contest.description}</p>
      </div>

      {/* Winner Section */}
      {winnerData && (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Winner</h2>
          <div className="flex items-center gap-4">
            <img src={winnerData.photo} alt={winnerData.name} className="w-16 h-16 rounded-full object-cover" />
            <p className="text-lg font-semibold">{winnerData.name}</p>
          </div>
        </div>
      )}

      {/* Payment / Registration Button */}
      {alreadyRegistered ? (
        <button className="btn btn-disabled">Already Registered</button>
      ) : isClosed ? (
        <button className="btn btn-disabled">Contest Closed</button>
      ) : (
        <button onClick={handlePayment} className="btn">
          Pay {contest.registrationFee}$ to register
        </button>
      )}
    </div>
  );
};

export default Contest;
