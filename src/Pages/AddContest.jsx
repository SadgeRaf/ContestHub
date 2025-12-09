import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";

const AddContest = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const contestData = {
      name: data.name,
      banner: data.banner,
      type: data.type,
      participants: 0,
      description: data.description,
      taskDetails: data.taskDetails,
      prize: data.prize,
      deadline: data.deadline,
      winner: null,
      submissions: [],
    };

    try {
      const res = await axiosSecure.post("/addcontest", contestData);
      console.log("Response:", res.data);
      setSuccessMsg("Contest created successfully!");
      reset();
    } catch (err) {
      console.error("Error creating contest:", err);
      setErrorMsg(err.response?.data?.message || err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 mb-10 p-6 shadow-lg rounded-xl bg-base-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Contest</h1>

      {successMsg && (
        <p className="text-green-500 text-center mb-4">{successMsg}</p>
      )}
      {errorMsg && (
        <p className="text-red-500 text-center mb-4">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="font-semibold">Contest Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Contest Name"
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Banner Image URL */}
        <div>
          <label className="font-semibold">Banner Image URL</label>
          <input
            {...register("banner", { required: true })}
            type="text"
            placeholder="https://example.com/banner.jpg"
            className="input input-bordered w-full"
          />
          {errors.banner && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Contest Type */}
        <div>
          <label className="font-semibold">Contest Type</label>
          <input
            {...register("type", { required: true })}
            type="text"
            placeholder="art, programming, robotics..."
            className="input input-bordered w-full"
          />
          {errors.type && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Prize */}
        <div>
          <label className="font-semibold">Prize Money</label>
          <input
            {...register("prize", { required: true })}
            type="text"
            placeholder="$1500"
            className="input input-bordered w-full"
          />
          {errors.prize && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Deadline */}
        <div>
          <label className="font-semibold">Deadline</label>
          <input
            {...register("deadline", { required: true })}
            type="datetime-local"
            className="input input-bordered w-full"
          />
          {errors.deadline && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Full Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Describe the contest..."
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Task Details */}
        <div>
          <label className="font-semibold">Task Details</label>
          <textarea
            {...register("taskDetails", { required: true })}
            placeholder="Explain what participants need to submit..."
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
          {errors.taskDetails && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Contest"}
        </button>
      </form>
    </div>
  );
};

export default AddContest;
