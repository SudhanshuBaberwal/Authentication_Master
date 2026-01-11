import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        setMessage("Password reset link has been sent to your email.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        {/* Back */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
        >
          <ArrowLeft size={18} />
          Back to login
        </button>

        <h1 className="text-3xl font-extrabold text-center text-white">
          Forgot Password
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm">
          Enter your email and we’ll send you a reset link
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Messages */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition transform shadow-lg disabled:opacity-60"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
