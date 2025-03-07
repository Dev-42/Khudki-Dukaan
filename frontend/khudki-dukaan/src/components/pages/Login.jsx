"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/30">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="ZippyLogo"
            className="w-24 drop-shadow-lg"
          />
        </div>

        {/* Login Form */}
        <form>
          <h3 className="text-lg font-semibold mb-2 text-white">
            What's your email?
          </h3>
          <div className="flex items-center bg-white/30 backdrop-blur-md border border-white/40 shadow-md rounded-lg mb-4 p-3">
            <FiMail className="text-white text-xl" />
            <input
              required
              type="email"
              placeholder="email@example.com"
              className="w-full bg-transparent ml-3 text-white outline-none placeholder-white/70"
            />
          </div>

          <h3 className="text-lg font-semibold mb-2 text-white">
            Enter Password
          </h3>
          <div className="relative flex items-center bg-white/30 backdrop-blur-md border border-white/40 shadow-md rounded-lg mb-4 p-3">
            <FiLock className="text-white text-xl" />
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="w-full bg-transparent ml-3 text-white outline-none placeholder-white/70 pr-12"
            />
            {/* Eye Icon for Show/Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-white text-xl focus:outline-none transition-all duration-300 hover:scale-110"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            <FiLogIn className="text-lg" /> Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-white mt-4">
          New here?{" "}
          <Link
            href="/signup"
            className="text-yellow-300 hover:underline flex items-center justify-center gap-1"
          >
            <FiUserPlus /> Create an Account
          </Link>
        </p>

        {/* Driver Sign In */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6 shadow-lg transition-all duration-300 transform hover:scale-105">
          Sign in as Driver
        </button>
      </div>
    </div>
  );
};

export default Login;
