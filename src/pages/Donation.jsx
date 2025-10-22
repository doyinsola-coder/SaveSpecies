import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Donate() {
  const location = useLocation();
  const species = location.state?.species;

  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://savespeciesexpress.onrender.com/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          amount: form.amount,
          speciesName: species?.name || "General Donation",
        }),
      });

      const data = await res.json();
      
      // Check if request was successful
      if (!res.ok) {
        setStatus({ 
          type: "error", 
          message: data.message || "Failed to initialize payment." 
        });
        return;
      }

      // Access the authorization_url from the response
      // Paystack returns: { status: true, message: "...", data: { authorization_url: "..." } }
      const authUrl = data.data?.authorization_url;
      
      if (authUrl) {
        window.location.href = authUrl;
      } else {
        setStatus({ 
          type: "error", 
          message: "Payment initialization failed - no authorization URL received." 
        });
      }
    } catch (err) {
      console.error("Donation error:", err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-emerald-500 px-4 py-16 text-white">
      <motion.div
        className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <Heart className="text-pink-400 animate-pulse" /> Support Our Cause
        </motion.h1>

        {/* Species Info */}
        {species && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white/10 rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <img
                src={species.image}
                alt={species.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/50"
              />
              <div>
                <h3 className="text-lg font-semibold">{species.name}</h3>
                <p className="text-sm text-white/80">{species.status}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/80 line-clamp-3">
              {species.description}
            </p>
          </motion.div>
        )}

        {/* Donation Form */}
        <form onSubmit={handleDonate} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="johndoe@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Donation Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="5000"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Processing...
              </>
            ) : (
              <>
                <Heart size={18} /> Donate Now
              </>
            )}
          </motion.button>
        </form>

        {/* Status Message */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-center flex items-center justify-center gap-2 ${
              status.type === "success" ? "text-green-300" : "text-red-400"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            {status.message}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}