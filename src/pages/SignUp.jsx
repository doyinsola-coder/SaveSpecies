import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Home, Heart, Shield } from "lucide-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    Gender: "",
    role: "user", // ✅ Default role
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message.text) setMessage({ type: "", text: "" });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );

      if (res.status === 201 || res.status === 200) {
        setMessage({
          type: "success",
          text: "✅ Account created successfully!",
        });

        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          Gender: "",
          role: "user", // reset to default
        });

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (
          status === 409 ||
          errorData?.message?.toLowerCase().includes("already exists")
        ) {
          setMessage({
            type: "error",
            text: "❌ An account with this email already exists. Try logging in instead.",
          });
        } else if (status === 400) {
          const errorMsg =
            errorData?.message ||
            errorData?.error ||
            "Invalid input. Please check your details.";
          setMessage({
            type: "error",
            text: `❌ ${errorMsg}`,
          });
        } else if (status === 500) {
          setMessage({
            type: "error",
            text: "❌ Server error. Please try again later.",
          });
        } else {
          const errorMsg =
            errorData?.message ||
            errorData?.error ||
            "Registration failed. Please try again.";
          setMessage({
            type: "error",
            text: `❌ ${errorMsg}`,
          });
        }
      } else if (error.request) {
        setMessage({
          type: "error",
          text: "❌ Network error. Please check your internet connection and try again.",
        });
      } else {
        setMessage({
          type: "error",
          text: "❌ An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-green-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 border border-emerald-200"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Heart className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl font-bold text-emerald-700">
              Create an Account
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            Join SaveSpecies and start making a difference 🌿
          </p>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-lg text-sm text-center font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex items-center border rounded-lg p-2">
            <User className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg p-2">
            <Mail className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg p-2 relative">
            <Lock className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full outline-none pr-8"
            />
            <motion.div
              whileTap={{ scale: 0.85 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </motion.div>
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-lg p-2">
            <Phone className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full outline-none"
            />
          </div>

          {/* Address */}
          <div className="flex items-center border rounded-lg p-2">
            <Home className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full outline-none"
            />
          </div>

          {/* Gender */}
          <div className="border rounded-lg p-2 flex justify-between items-center">
            <label htmlFor="Gender" className="text-gray-600 text-sm">
              Gender:
            </label>
            <select
              name="Gender"
              id="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              disabled={loading}
              className="outline-none text-gray-700"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* ✅ Role Selector */}
          <div className="border rounded-lg p-2 flex justify-between items-center">
            <label htmlFor="role" className="flex items-center text-gray-600 text-sm gap-1">
              <Shield className="w-4 h-4 text-emerald-500" />
              Role:
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="outline-none text-gray-700"
            >
              <option value="user">User (Default)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating your Account..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Go to Login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center text-sm"
        >
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200"
            >
              Log in here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
