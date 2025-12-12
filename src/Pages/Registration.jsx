import React, { useState, use } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';

const Register = () => {
  const { createUser, setUser, updateUser, googleSignUp } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    const name = data.name;
    const photo = data.photo;

    try {
      const res = await createUser(data.email, data.password);
      const user = res.user;

      await updateUser({ displayName: name, photoURL: photo });

      const savedUser = {
        name: name,
        email: data.email,
        photoURL: photo,
        role: "user",
        createdAt: new Date()
      };

      await axiosSecure.post("/users", savedUser);

      setUser({ ...user, displayName: name, photoURL: photo });

      toast.success("Account registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await googleSignUp();
      const user = res.user;

      await axiosSecure.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        createdAt: new Date()
      });

      setUser(user);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 mt-20">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-8 border border-gray-200">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

          {/* FULL NAME */}
          <div>
            <label className="label text-gray-600">Full Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Your name"
            />
            {errors.name && <p className='text-red-500'>Name is required</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="label text-gray-600">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Your email"
            />
            {errors.email && <p className='text-red-500'>Email is required</p>}
          </div>

          {/* PHOTO URL */}
          <div>
            <label className="label text-gray-600">Photo URL</label>
            <input
              {...register('photo')}
              type="text"
              className="input input-bordered w-full"
              placeholder="Profile picture link"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="label text-gray-600">Password</label>
            <input
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
              })}
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full pr-10"
              placeholder="Create a password"
            />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={handleToggle}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IoIosEyeOff /> : <FaEye />}
            </button>

            {errors.password?.type === 'required' && (
              <p className="text-red-500">Password is required!</p>
            )}

            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">Password must be at least 6 characters</p>
            )}

            {errors.password?.type === 'pattern' && (
              <p className="text-red-500">
                Must contain at least 1 uppercase & 1 lowercase letter
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="btn btn-neutral w-full mt-2">
            Register
          </button>
        </form>

        {/* LOGIN REDIRECT */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {/* GOOGLE BUTTON */}
        <div className="flex justify-center items-center relative">
          <button
            onClick={handleGoogle}
            className="btn w-full mt-2 flex items-center gap-2"
          >
            <FaGoogle />
            Sign up with Google
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;
