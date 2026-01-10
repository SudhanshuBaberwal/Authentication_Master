import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Mail, Lock, User } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userInfo
      );

      toast.success("Verification email sent ✉️");
      navigate("/verify-email", {
        state: { name: data.name, email: data.email },
      });

      localStorage.setItem("users", JSON.stringify(res.data));
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-white border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Start your journey with us 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <div
               className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[#5a577a] text-white placeholder-gray-300 focus:bg-[#5a577a] focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <User size={18} className="text-white/70" />
              <input
                type="text"
                placeholder="Full name"
                className="bg-transparent w-full outline-none placeholder-white/60"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">Full name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[#5a577a] text-white placeholder-gray-300 focus:bg-[#5a577a] focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <Mail size={18} className="text-white/70" />
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent w-full outline-none placeholder-white/60"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div
               className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[#5a577a] text-white placeholder-gray-300 focus:bg-[#5a577a] focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <Lock size={18} className="text-white/70" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent w-full outline-none placeholder-white/60"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">Password is required</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-indigo-400 to-purple-500
            text-white font-semibold py-3 rounded-xl
            hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(99,102,241,0.6)]
            transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-white/70 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
