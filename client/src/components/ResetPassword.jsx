
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, {
        password,
      });

      setSuccess("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid or expired reset link"
      );
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
        <h1 className="text-3xl font-extrabold text-center text-white">
          Reset Password
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm">
          Create a new secure password
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* New Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition transform shadow-lg disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
