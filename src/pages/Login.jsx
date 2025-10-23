import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Heart, CheckCircle } from "lucide-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear message when user starts typing
    if (message.text) setMessage({ type: "", text: "" });
    // Hide forgot password link when user starts typing again
    if (showForgotPassword) setShowForgotPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setShowForgotPassword(false);

    try {
      // Send login request
      const res = await api.post("/api/users/login", formData);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Token from storage:", res.data.token);

        // Show success popup
        setShowSuccessPopup(true);

        // Hide popup and redirect after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
          window.location.href = "/profile";
        }, 3000);
      } else {
        setMessage({
          type: "error",
          text: "❌ Login failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 401 || status === 400) {
          // Invalid credentials - show forgot password link
          setMessage({
            type: "error",
            text: "❌ Invalid email or password. Please try again.",
          });
          setShowForgotPassword(true);
        } else if (status === 404) {
          setMessage({
            type: "error",
            text: "❌ No account found with this email.",
          });
        } else if (status === 500) {
          setMessage({
            type: "error",
            text: "❌ Server error. Please try again later.",
          });
        } else {
          const errorMsg = errorData?.message || errorData?.error || "Login failed.";
          setMessage({
            type: "error",
            text: `❌ ${errorMsg}`,
          });
        }
      } else if (error.request) {
        setMessage({
          type: "error",
          text: "❌ Network error. Please check your internet connection.",
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
    <>
      {/* Success Popup Overlay */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                Login Successful!
              </h3>
              <p className="text-gray-600">
                Welcome back! We missed you...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Page */}
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

          {/* Error Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200"
            >
              {message.text}
            </motion.div>
          )}

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
                disabled={loading}
                className="w-full outline-none"
              />
            </div>

            {/* Password with Eye Toggle */}
            <div>
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

              {/* Forgot Password Link - Only shows after wrong password */}
              <AnimatePresence>
                {showForgotPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-right mt-2"
                  >
                    <a
                      href="/forgot-password"
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log In"}
            </motion.button>
          </form>

          {/* Go to Signup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center text-sm"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
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
    </>
  );
}