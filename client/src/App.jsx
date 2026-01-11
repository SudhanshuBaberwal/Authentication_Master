import React from "react";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./components/VerifyEmail";
import Home from "./components/Home";
import ProtectedRoute from "./AuthProvider/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {" "}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
