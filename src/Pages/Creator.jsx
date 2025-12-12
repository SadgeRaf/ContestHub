import React from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const Creator = () => {
  const axiosSecure = useAxios();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  try {
    const res = await axiosSecure.post('/creators', {
      name: data.name,
      email: data.email,
      bio: data.bio,
    });

    if (res.data.status === 'exists') {
      toast.info(res.data.message);
      return;
    }

    if (res.data.insertedId) {
      toast.success('Application submitted! Waiting for admin approval.');
      reset();
    } else {
      toast.error('Something went wrong. Try again.');
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to submit application.');
  }
};


  return (
    <div className="max-w-lg mx-auto mt-20 mb-10 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Apply to Become a Contest Creator</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label text-gray-700">Full Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Your full name"
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="label text-gray-700">Email</label>
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <label className="label text-gray-700">Bio / About You</label>
          <textarea
            {...register('bio', { required: false })}
            placeholder="Tell us about yourself"
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Creator;
