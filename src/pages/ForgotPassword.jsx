// ============================================
// 1. FORGOT PASSWORD REQUEST PAGE
// ============================================
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        text: "❌ Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://savespeciesexpress.onrender.com/api/users/forgot-password",
        { email }
      );

      if (res.status === 200) {
        setMessage({
          type: "success",
          text: "✅ Password reset link sent to your email! Check your inbox.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 404) {
          setMessage({
            type: "error",
            text: "❌ No account found with this email address.",
          });
        } else if (status === 400) {
          const errorMsg = errorData?.message || errorData?.error || "Invalid email address.";
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
          const errorMsg = errorData?.message || errorData?.error || "Failed to send reset link.";
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
            <h2 className="text-2xl font-bold text-emerald-700">Forgot Password</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Enter your email and we'll send you a reset link 🔐
          </p>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex items-center border rounded-lg p-3">
            <Mail className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (message.text) setMessage({ type: "", text: "" });
              }}
              required
              disabled={loading}
              className="w-full outline-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}


// ============================================
// 2. RESET PASSWORD PAGE (with token)
// ============================================
import { Lock } from "lucide-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useParams } from "react-router-dom";

export function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL params

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "❌ Passwords do not match.",
      });
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setMessage({
        type: "error",
        text: "❌ Password must be at least 8 characters long.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `https://savespeciesexpress.onrender.com/api/users/reset-password/${token}`,
        { password: formData.password }
      );

      if (res.status === 200) {
        setMessage({
          type: "success",
          text: "✅ Password reset successful! Redirecting to login...",
        });
        
        setFormData({ password: "", confirmPassword: "" });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 400 && errorData?.message?.toLowerCase().includes("expired")) {
          setMessage({
            type: "error",
            text: "❌ Reset link has expired. Please request a new one.",
          });
        } else if (status === 400 && errorData?.message?.toLowerCase().includes("invalid")) {
          setMessage({
            type: "error",
            text: "❌ Invalid reset link. Please request a new one.",
          });
        } else if (status === 400) {
          const errorMsg = errorData?.message || errorData?.error || "Invalid request.";
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
          const errorMsg = errorData?.message || errorData?.error || "Failed to reset password.";
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
            <h2 className="text-2xl font-bold text-emerald-700">Reset Password</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Enter your new password below 🔑
          </p>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password */}
          <div className="flex items-center border rounded-lg p-3 relative">
            <Lock className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
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
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </motion.div>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg p-3 relative">
            <Lock className="w-5 h-5 mr-2 text-emerald-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full outline-none pr-8"
            />
            <motion.div
              whileTap={{ scale: 0.85 }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </motion.div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}


// ============================================
// 3. ADD TO YOUR LOGIN PAGE
// ============================================
// Add this link to your existing login form, below the password field:

<div className="text-right">
  <a
    href="/forgot-password"
    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
  >
    Forgot Password?
  </a>
</div>