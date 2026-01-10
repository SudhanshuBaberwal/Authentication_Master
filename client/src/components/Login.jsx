import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
        toast.success("LoggedIn successfully")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          Welcome Back
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Log in to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email address"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition transform shadow-lg disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
