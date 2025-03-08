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
  FiTruck,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";

const DriverLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/ZippyRideBackground.webp')" }}
    >
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl border shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="ZippyRide Driver Logo"
            className="w-24 drop-shadow-lg hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-red-400 tracking-wide mb-6 drop-shadow-lg">
          DRIVER'S HUB
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <FiMail className="absolute left-4 top-3 text-red-400 text-xl" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@driver.com"
              className="w-full bg-black border border-gray-700 text-gray-300 p-3 pl-12 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-300 group-hover:border-red-500"
            />
          </div>

          <div className="relative group">
            <FiLock className="absolute left-4 top-3 text-red-400 text-xl" />
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-black border border-gray-700 text-gray-300 p-3 pl-12 pr-12 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-300 group-hover:border-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-red-400 text-xl focus:outline-none hover:scale-110 transition-transform duration-300"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
            <FaCar className="text-lg" /> Drive In
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-gray-400 mt-4">
          New to the crew?{" "}
          <Link
            href="/signup"
            className="text-red-400 hover:underline flex items-center justify-center gap-1 transition-transform duration-300 hover:scale-110"
          >
            <FiUserPlus /> Become a Driver
          </Link>
        </p>

        {/* Switch to User Login */}
        <Link
          href="/user/login"
          className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 rounded-lg mt-6 shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Switch to User Login
        </Link>
      </div>
    </div>
  );
};

export default DriverLogin;
