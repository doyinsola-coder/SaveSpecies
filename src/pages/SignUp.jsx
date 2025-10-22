import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Home, Heart } from "lucide-react";
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
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", formData);
      
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Account created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          Gender: "",
        });
        localStorage.setItem("token", res.data.token);
        
        // Navigate to profile after successful registration
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
     } catch (error) {
  console.error(error);
  console.error("Error details:", error.response?.data); 
  setMessage("❌ Failed to register. Please check your details.");
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
            <h2 className="text-2xl font-bold text-emerald-700">Create an Account</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Join SaveSpecies and start making a difference 🌿
          </p>
        </div>

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
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
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
              className="outline-none text-gray-700"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.startsWith("✅") ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Animated "Go to Login" Section */}
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