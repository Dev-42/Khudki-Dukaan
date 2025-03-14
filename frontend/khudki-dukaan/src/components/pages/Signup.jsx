"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiLogIn,
  FiFileText,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserDataContext } from "@/context/UserContext";
// Initialize toast notifications
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreeToPolicy) {
      toast.error("You must agree to the Privacy Policy to continue.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    console.log("User Data:", formData);
    const userData = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
    };

    try {
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
        userData
      );
      console.log(response);
      if (response.status === 201) {
        const data = response.data;
        const registeredUser = data.user;
        console.log("Registered user is", registeredUser);
        setUser(registeredUser);
        console.log("User from context", user);
        toast.success("Signup successful! 🎉", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/user/login");
        }, 3000);
      }

      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/ZippyRideBackground.webp')" }}
    >
      {/* Toast Notifications */}
      <ToastContainer />

      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-5 w-full max-w-sm border border-white/30 transition-all duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="ZippyLogo"
            className="w-20 drop-shadow-lg hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <div className="flex items-center bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-lg p-2">
              <FiUser className="text-white text-lg" />
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full bg-transparent ml-2 text-gray-100 outline-none placeholder-white/90 focus:text-white text-sm"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <div className="flex items-center bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-lg p-2">
              <FiUser className="text-white text-lg" />
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-transparent ml-2 text-gray-100 outline-none placeholder-white/90 focus:text-white text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <div className="flex items-center bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-lg p-2">
              <FiMail className="text-white text-lg" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full bg-transparent ml-2 text-gray-100 outline-none placeholder-white/90 focus:text-white text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3 relative">
            <div className="flex items-center bg-white/30 backdrop-blur-lg border border-white/40 shadow-md rounded-lg p-2">
              <FiLock className="text-white text-lg" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-transparent ml-2 text-gray-100 outline-none placeholder-white/90 focus:text-white text-sm pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-white text-lg focus:outline-none transition-all duration-300 hover:scale-110"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="flex items-center gap-2 text-white text-sm mb-3">
            <input
              type="checkbox"
              checked={agreeToPolicy}
              onChange={() => setAgreeToPolicy(!agreeToPolicy)}
              className="w-4 h-4 accent-green-500 cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowPolicy(true)}
                className="text-yellow-300 underline hover:text-yellow-400"
              >
                Privacy Policy
              </button>
            </span>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 text-sm"
          >
            <FiUserPlus className="text-base" /> Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-white mt-3 text-sm">
          Already have an account?{" "}
          <Link
            href="/user/login"
            className="text-yellow-300 hover:underline flex items-center justify-center gap-1 transition-transform duration-300 hover:scale-110"
          >
            <FiLogIn /> Login Here
          </Link>
        </p>
      </div>

      {/* Privacy Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md text-black">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Privacy Policy</h2>
              <button
                onClick={() => setShowPolicy(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="text-sm mb-4">
              We respect your privacy. Your data will be securely stored.
            </p>
            <button
              onClick={() => setShowPolicy(false)}
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md text-sm font-semibold transition-all"
            >
              I Agree
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
