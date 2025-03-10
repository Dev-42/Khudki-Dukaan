"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiKey,
  FiCheckSquare,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";

const DriverSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    licenseNumber: "",
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.includes("@")) errors.email = "Valid email required";
    if (!formData.phone.match(/^\d{10}$/))
      errors.phone = "Valid 10-digit phone required";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!formData.licenseNumber.trim())
      errors.licenseNumber = "License number is required";
    if (!formData.termsAccepted)
      errors.termsAccepted = "You must accept the terms & conditions";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      licenseNumber: "",
      termsAccepted: false,
    });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/ZippyRideBackground.webp')" }}
    >
      <div className="relative bg-gray-900/80 backdrop-blur-xl border shadow-xl rounded-xl p-6 w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="ZippyRide Logo" className="w-20" />
        </div>
        <h2 className="text-xl font-bold text-center text-red-400 mb-4">
          Join as a Driver
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { name: "name", icon: FiUser },
            { name: "email", icon: FiMail },
            { name: "phone", icon: FiPhone },
            { name: "licenseNumber", icon: FiKey },
          ].map(({ name, icon: Icon }) => (
            <div key={name} className="relative">
              <Icon className="absolute left-3 top-2.5 text-red-400 text-lg" />
              <input
                required
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={name
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                className="w-full bg-black border border-gray-700 text-gray-300 p-2 pl-10 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
              />
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="relative">
            <FiLock className="absolute left-3 top-2.5 text-red-400 text-lg" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-black border border-gray-700 text-gray-300 p-2 pl-10 pr-10 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-red-400 text-lg"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-4 h-4 text-red-500 bg-black border border-gray-700 rounded"
            />
            <label className="text-gray-300 text-sm">
              I agree to the
              <Link href="/" className="text-red-400 hover:underline mx-1">
                Terms & Conditions
              </Link>
              and
              <Link href="/" className="text-red-400 hover:underline ml-1">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-xs">{errors.termsAccepted}</p>
          )}

          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 rounded-md shadow-md">
            <FaCar className="text-lg" /> Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-3 text-sm">
          Already a driver?{" "}
          <Link href="/driver/login" className="text-red-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DriverSignup;
