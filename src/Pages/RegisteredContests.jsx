import React, { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import SubmissionModal from "../Components/SubmissionModal";
import { Link } from "react-router";

const ParticipatedContests = () => {
  const axiosSecure = useAxios();
  const { user } = use(AuthContext);

  // Fetch registered contests (payment data + registration info)
  const {
    data: registered = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["registeredContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch all contests for mapping contestId → contest details
  const { data: allContests = [] } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  // Join: registered items + real contest info
  const joinedData = registered
    .map((item) => {
      const contest = allContests.find((c) => c._id === item.contestId);
      return {
        ...item,
        contestName: contest?.name || "Unknown",
        deadline: contest?.deadline || null,
        fee: contest?.registrationFee || 0,
      };
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // SORT: upcoming

  const { register, handleSubmit, reset } = useForm();
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    document.getElementById("submit_modal").showModal();
  };

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      submissionText: data.submissionText,
      submittedAt: new Date(),
    };

    const res = await axiosSecure.patch(
      `/registered/submit/${selectedId}`,
      payload
    );

    if (res.data.success) {
      alert("Submission uploaded!");
      reset();
      document.getElementById("submit_modal").close();
      refetch();
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        {error?.message || "Error loading contests"}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Participated Contests</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Contest</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Payment</th>
            <th className="border px-4 py-2">Submission</th>
          </tr>
        </thead>

        <tbody>
          {joinedData.map((item, index) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{index + 1}</td>

              <td className="border px-4 py-2 font-semibold">
                {item.contestName}
              </td>

              <td className="border px-4 py-2">
                {item.deadline
                  ? new Date(item.deadline).toLocaleDateString()
                  : "N/A"}
              </td>

              <td className="border px-4 py-2">
                <span className="badge badge-success">Paid</span>
              </td>

              <td className="border px-4 py-2">
                {item.contestStatus === "submitted" ? (
                  <button
                    className="btn btn-sm bg-gray-400 text-white"
                    disabled
                  >
                    Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => openModal(item._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Submit
                  </button>
                )}
              </td>
            </tr>
          ))}

          {!joinedData.length && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                You have not registered for any contests.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <SubmissionModal onSubmit={onSubmit} register={register} />
    </div>
  );
};

export default ParticipatedContests;
