import React from "react";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./components/VerifyEmail";
import Home from "./components/Home";
import ProtectedRoute from "./AuthProvider/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
