import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation()
  const name = location.state?.name;
  const navigate = useNavigate();
  const [code , setCode] = useState("")
  const [loading , setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!code){
      toast.error("Please Enter Code")
      return;
    }
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:3000/api/auth/verify-email", {code})
      console.log(res)
      if (res.data.success){
        localStorage.setItem("Users" , JSON.stringify(res.data.user))
        toast.success("Verified SuccessFully")
        navigate("/" ,{
          state : name
        })
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter the verification code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-4 py-3 border-2 border-purple-500 rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* ✅ SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Didn’t receive the code?{" "}
          <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
  
}

export default VerifyEmail
