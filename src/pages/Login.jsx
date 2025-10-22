import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../utils/axiosInstance"; // ✅ Your pre-configured Axios instance
import { motion } from "framer-motion";
import { Mail, Lock, Heart } from "lucide-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();

  //  Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    
    try {
      //  send login request
      const res = await api.post("/api/users/login", formData);
  
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Token from storage:", res.data.token); 
        setMessage(" Login successful!");

        // show message briefly, then redirect
        setTimeout(() => {
          window.location.href = "/profile"; // This will reload the page
        }, 1000);
      } else {
        setMessage("❌ Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Invalid credentials. Please try again.");
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
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Heart className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl font-bold text-emerald-700">Welcome Back</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Log in to continue saving species 🌿
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="w-full outline-none"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="flex items-center border rounded-lg p-2 relative">
            <Lock className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all"
          >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.startsWith("✅") ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Go to Signup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center text-sm"
        >
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200"
            >
              Create one
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
