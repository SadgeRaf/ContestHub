import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';

const Login = () => {
  const { logIn, setUser, googleSignUp } = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;

    logIn(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        toast.success("Logged in Successfully!");
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((error) => {
        toast.error(error.message);
        setPasswordError(error.message);
      });
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogle = () => {
    googleSignUp()
      .then((res) => {
        const user = res.user;
        setUser(user);
        toast.success("Signed in with Google!");
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 mt-20">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

          <div>
            <label className="label text-gray-600">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div className="relative">
            <label className="label text-gray-600">Password</label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/
              })}
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />

            <button onClick={handleToggle} className="absolute right-3 top-9">
              {showPassword ? <IoIosEyeOff /> : <FaEye />}
            </button>

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Password must contain at least 1 uppercase & 1 lowercase letter
              </p>
            )}

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-neutral w-full mt-2">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/auth/registration" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="flex justify-center items-center flex-row relative">
          <button onClick={handleGoogle} className="btn w-full mt-2">
            Sign in with <span className="text-blue-500">Google</span>
          </button>
          <FaGoogle className="absolute left-57 top-5" />
        </div>
      </div>
    </div>
  );
};

export default Login;
