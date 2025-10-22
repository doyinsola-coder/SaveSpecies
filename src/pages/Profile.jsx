import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  LogOut,
  Settings,
  Heart,
  Leaf,
  Loader2,
} from "lucide-react";
import api from "../utils/axiosInstance";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [pledges, setPledges] = useState([]);
  const [supportedSpecies, setSupportedSpecies] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
 // Add this state at the top of your Profile component
 const [reportLoading, setReportLoading] = useState(false);
 const [reportMessage, setReportMessage] = useState("");
  // Fetch user and related data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/api/users/profile");
        setUser(userRes.data);
        setFormData({ name: userRes.data.name, email: userRes.data.email });

        // Fetch pledges with error handling
        try {
          const pledgesRes = await api.get("/pledges/");
          setPledges(pledgesRes.data || []);
        } catch (err) {
          console.error("Error fetching pledges:", err);
          setPledges([]);
        }

        // Fetch species with error handling
        try {
          const speciesRes = await api.get("/api/species/supported");
          setSupportedSpecies(speciesRes.data || []);
        } catch (err) {
          console.error("Error fetching species:", err);
          setSupportedSpecies([]);
        }

        // Fetch reports with error handling
        try {
          const reportsRes = await api.get("/api/reports/user");
          setReports(reportsRes.data || []);
        } catch (err) {
          console.error("Error fetching reports:", err);
          setReports([]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (err) {
      return "Invalid date";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Clear any previous messages
  };

  const handleEditClick = () => {
    setFormData({ name: user.name, email: user.email });
    setEditMode(true);
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setMessage("");

    try {
      const res = await api.put("/users/update", formData);
      console.log("Update response:", res.data);
      
      // Update the user state with the new data
      setUser(res.data);
      setEditMode(false);
      setMessage("✅ Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      console.error("Error details:", error.response?.data);
      
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      "Failed to update profile";
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ name: user.name, email: user.email });
    setEditMode(false);
    setMessage("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-50">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 text-center">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
          You must be logged in
        </h2>
        <a
          href="/login"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Go to Login
        </a>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-emerald-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-emerald-100 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-emerald-700">
              Welcome, {user.name}
            </h1>
            <p className="text-sm text-gray-500">Manage your profile 🌿</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>

        {/* Personal Info */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" /> Personal Information
          </h2>
          
          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-lg ${
                message.startsWith("✅")
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </motion.div>
          )}

          {!editMode ? (
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-500" />
                {user.name}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                {user.email}
              </p>
              <p className="flex items-center gap-2">
  <Calendar className="w-4 h-4 text-emerald-500" />
  Joined: {user.createdAt ? formatDate(user.createdAt) : "N/A"}
</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="mt-3 bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition"
              >
                Edit Info
              </motion.button>
            </div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleUpdate}
              className="space-y-4 bg-emerald-50 p-4 rounded-xl"
            >
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={updateLoading}
                  className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition disabled:bg-emerald-400 disabled:cursor-not-allowed"
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={updateLoading}
                  className="border border-emerald-500 text-emerald-600 px-4 py-1.5 rounded-lg hover:bg-emerald-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          )}
        </section>

        {/* Pledge History
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5" /> Pledge History
          </h2>
          {pledges.length > 0 ? (
            <ul className="bg-emerald-50 rounded-xl p-4 space-y-2">
              {pledges.map((p, i) => (
                <li key={i} className="text-gray-700">
                  🌱 {p.speciesName} — {p.amount} USD —{" "}
                  {formatDate(p.date)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No pledges yet.</p>
          )}
        </section> */}

        {/* Supported Species
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5" /> Supported Species
          </h2>
          {supportedSpecies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {supportedSpecies.map((sp, i) => (
                <div
                  key={i}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center"
                >
                  <p className="font-medium text-emerald-700">{sp.name}</p>
                  <p className="text-sm text-gray-500">{sp.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No supported species yet.</p>
          )}
        </section> */}

        {/* Report an Issue */}
<section className="mb-8">
  <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center gap-2">
    🚨 Report an Issue
  </h2>
  
  {/* Success/Error Message */}
  {reportMessage && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-4 p-3 rounded-lg ${
        reportMessage.startsWith("✅")
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {reportMessage}
    </motion.div>
  )}

  <form
    onSubmit={async (e) => {
      e.preventDefault();
      setReportLoading(true);
      setReportMessage("");

      try {
        const reportData = {
          speciesName: e.target.speciesName.value,
          issueType: e.target.issueType.value,
          description: e.target.description.value,
        };

        // Add image URL if provided
        if (e.target.image.value.trim()) {
          reportData.image = e.target.image.value;
        }

        const res = await api.post("/reports", reportData);
        setReportMessage("✅ Report submitted successfully!");
        setReports([res.data, ...reports]); // Add new report to the top
        e.target.reset();
        
        // Clear success message after 3 seconds
        setTimeout(() => setReportMessage(""), 3000);
      } catch (err) {
        console.error("Report error:", err);
        console.error("Error details:", err.response?.data);
        
        const errorMsg = err.response?.data?.message || 
                        err.response?.data?.error || 
                        "Failed to submit report";
        setReportMessage(`❌ ${errorMsg}`);
      } finally {
        setReportLoading(false);
      }
    }}
    className="bg-emerald-50 rounded-xl p-4 space-y-3"
  >
    <div>
      <label className="block text-sm font-medium text-emerald-700 mb-1">
        Species Name *
      </label>
      <input
        type="text"
        name="speciesName"
        placeholder="e.g. African Elephant"
        required
        className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-emerald-700 mb-1">
        Issue Type *
      </label>
      <select
        name="issueType"
        required
        className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">Select Issue Type</option>
        <option value="Overhunting">Overhunting</option>
        <option value="Deforestation">Deforestation</option>
        <option value="Pollution">Pollution</option>
        <option value="Climate Change">Climate Change</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-emerald-700 mb-1">
        Description *
      </label>
      <textarea
        name="description"
        placeholder="Describe the issue in detail..."
        rows="4"
        required
        className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-emerald-700 mb-1">
        Image URL (Optional)
      </label>
      <input
        type="url"
        name="image"
        placeholder="https://example.com/image.jpg"
        className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <p className="text-xs text-gray-500 mt-1">
        Provide a URL to an image related to the issue
      </p>
    </div>

    <motion.button
      whileTap={{ scale: 0.95 }}
      type="submit"
      disabled={reportLoading}
      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition disabled:bg-emerald-400 disabled:cursor-not-allowed w-full"
    >
      {reportLoading ? "Submitting..." : "Submit Report"}
    </motion.button>
  </form>
</section>

{/* Your Submitted Reports - Updated */}
<section className="mb-8">
  <h3 className="text-lg font-semibold text-emerald-700 mb-3">
    Your Submitted Reports
  </h3>
  {reports.length > 0 ? (
    <ul className="space-y-3 bg-emerald-50 p-4 rounded-lg">
      {reports.map((r, i) => (
        <li key={r._id || i} className="bg-white p-3 rounded-lg border border-emerald-100">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold text-emerald-700">
                🐾 {r.speciesName}
              </p>
              <p className="text-sm text-gray-600">
                Type: <span className="font-medium">{r.issueType}</span>
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                r.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : r.status === "Reviewed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {r.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{r.description}</p>
          {r.image && (
            <img
              src={r.image}
              alt={r.speciesName}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
          )}
          <p className="text-xs text-gray-400">
            Submitted: {formatDate(r.createdAt)}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No reports submitted yet.</p>
  )}
</section>

        {/* Account Settings Placeholder */}
        <section>
          <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5" /> Account Settings
          </h2>
          <p className="text-gray-500">
            (Coming soon) — Notification preferences, password reset, etc.
          </p>
        </section>
      </motion.div>
    </section>
  );
}