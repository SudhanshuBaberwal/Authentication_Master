import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logoutFunction = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logout Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">
            Hello<span className="text-purple-400">App</span>
          </h1>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center font-bold uppercase">
              {user?.name?.charAt(0) || "U"}
            </div>

            <button
              onClick={logoutFunction}
              className="px-4 py-2 rounded-full bg-white/20 hover:bg-red-500 transition-all duration-300 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-28 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Welcome back {" "}
          <span className="text-purple-400">
            {user?.name || "User"}
          </span>
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Your personalized dashboard is ready. Build, explore, and manage
          everything in one powerful place.
        </p>

        <div className="flex justify-center gap-6">
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-xl border border-white/30 hover:bg-white hover:text-black transition">
            Explore Features
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 mt-28 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Blazing Fast",
            desc: "Optimized performance with smooth interactions.",
            icon: "⚡",
          },
          {
            title: "Enterprise Security",
            desc: "JWT, cookies, and secure backend architecture.",
            icon: "🔐",
          },
          {
            title: "Modern Experience",
            desc: "Clean UI with premium animations & responsiveness.",
            icon: "🎨",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative group rounded-2xl p-[1px] bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <div className="h-full bg-[#1a1831] rounded-2xl p-6 backdrop-blur-xl group-hover:scale-[1.03] transition">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-gray-400 pb-8 text-sm">
        © {new Date().getFullYear()} HelloApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
