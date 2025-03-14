"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { UserDataContext } from "@/context/UserContext";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const { user, setUser } = useContext(UserDataContext);
  const [user, setUser] = useState({});
  // console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
        userData
      );
      console.log("Response from login", response);

      if (response.status === 200) {
        const data = response.data;
        console.log("Logged in user:", data.user);
        setUser(data.user);
        localStorage.setItem("userToken", data.token);

        toast.success("Login successful! 🎉", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        setTimeout(() => {
          router.push("/user/dashboard"); // Change to your desired route after login
        }, 3000);

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        });
      } else {
        toast.error(error.response?.data?.message || "Login failed.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/ZippyRideBackground.webp')" }}
    >
      <ToastContainer />
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-[20px] w-full max-w-md border border-white/30 transition-all duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="ZippyLogo"
            className="w-24 drop-shadow-lg hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mb-2 text-white">
            What's your email?
          </label>
          <div className="flex items-center bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-lg mb-4 p-3 focus-within:ring-2 focus-within:ring-yellow-300">
            <FiMail className="text-white text-xl" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email@example.com"
              className="w-full bg-transparent ml-3 text-gray-100 outline-none placeholder-white/90 focus:text-white"
            />
          </div>

          <label className="block text-lg font-semibold mb-2 text-white">
            Enter Password
          </label>
          <div className="relative flex items-center bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-lg mb-4 p-3 focus-within:ring-2 focus-within:ring-yellow-300">
            <FiLock className="text-white text-xl" />
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              className="w-full bg-transparent ml-3 text-gray-100 outline-none placeholder-white/90 pr-12 focus:text-white"
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

          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
            <FiLogIn className="text-lg" /> Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-white mt-4">
          New here?{" "}
          <Link
            href="/user/register"
            className="text-yellow-300 hover:underline flex items-center justify-center gap-1 transition-transform duration-300 hover:scale-110"
          >
            <FiUserPlus /> Create an Account
          </Link>
        </p>

        {/* Driver Sign In */}
        <Link
          href="/driver/login"
          className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-lg mt-6 shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Sign in as Driver
        </Link>
      </div>
    </div>
  );
};

export default Login;
