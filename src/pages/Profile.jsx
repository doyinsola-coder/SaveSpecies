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
  ImageIcon,
  FileText,
} from "lucide-react";
import api from "../utils/axiosInstance"; // axios instance that attaches token

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
  const [reportLoading, setReportLoading] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  // avatar handling
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/api/users/profile");
        setUser(userRes.data);
        setFormData({ name: userRes.data.name, email: userRes.data.email });
        setAvatarPreview(userRes.data.avatar || null);

        try {
          const pledgesRes = await api.get("/pledges/");
          setPledges(pledgesRes.data || []);
        } catch (err) {
          console.error("Error fetching pledges:", err);
          setPledges([]);
        }

        try {
          const speciesRes = await api.get("/api/species/supported");
          setSupportedSpecies(speciesRes.data || []);
        } catch (err) {
          console.error("Error fetching species:", err);
          setSupportedSpecies([]);
        }

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
    setMessage("");
  };

  const handleEditClick = () => {
    setFormData({ name: user.name, email: user.email });
    setEditMode(true);
    setMessage("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e?.preventDefault();
    setUpdateLoading(true);
    setMessage("");

    try {
      // If avatarFile exists, use FormData
      let res;
      if (avatarFile) {
        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("avatar", avatarFile);
        res = await api.put("/api/users/update", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.put("/api/users/update", formData);
      }

      setUser(res.data);
      setEditMode(false);
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || "Failed to update profile";
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ name: user.name, email: user.email });
    setAvatarFile(null);
    setAvatarPreview(user.avatar || null);
    setEditMode(false);
    setMessage("");
  };

  // computed stats
  const speciesCount = supportedSpecies.length;
  const pledgesCount = pledges.length;
  const reportsCount = reports.length;
  const impactScore = Math.round((pledgesCount * 10) + speciesCount * 5 + reportsCount * 2);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-3">You must be logged in</h2>
        <a href="/login" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">Go to Login</a>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 border border-green-100">

        {/* Header banner */}
        <div className="relative rounded-2xl overflow-hidden bg-green-900 text-white mb-6">
          <div className="h-36 sm:h-44 w-full" />
          <div className="absolute inset-0 flex items-end p-6">
            <div className="flex items-center gap-4">
              <div className="relative -mt-16">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                <p className="text-sm opacity-90 flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</p>
                <p className="text-xs opacity-80 mt-1 flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined {formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="ml-auto flex gap-3">
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"> <LogOut className="w-4 h-4 inline" /> Logout</motion.button>
            </div>
          </div>
        </div>

        {/* Stats cards + Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="col-span-1 lg:col-span-3 bg-white p-4 rounded-xl border border-green-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-green-700">Overview</h2>
              <div className="flex gap-2">
                <button onClick={() => setActiveTab("overview")} className={`px-3 py-1 rounded-md ${activeTab === "overview" ? "bg-green-600 text-white" : "bg-green-50 text-green-700"}`}>Overview</button>
                <button onClick={() => setActiveTab("pledges")} className={`px-3 py-1 rounded-md ${activeTab === "pledges" ? "bg-green-600 text-white" : "bg-green-50 text-green-700"}`}>Pledges</button>
                <button onClick={() => setActiveTab("reports")} className={`px-3 py-1 rounded-md ${activeTab === "reports" ? "bg-green-600 text-white" : "bg-green-50 text-green-700"}`}>Reports</button>
                <button onClick={() => setActiveTab("settings")} className={`px-3 py-1 rounded-md ${activeTab === "settings" ? "bg-green-600 text-white" : "bg-green-50 text-green-700"}`}>Settings</button>
              </div>
            </div>

            {/* Tab content */}
            <div>
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                      <p className="text-sm text-green-700 font-medium">Species Supported</p>
                      <p className="text-2xl font-bold text-green-800">{speciesCount}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                      <p className="text-sm text-green-700 font-medium">Pledges</p>
                      <p className="text-2xl font-bold text-green-800">{pledgesCount}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                      <p className="text-sm text-green-700 font-medium">Reports</p>
                      <p className="text-2xl font-bold text-green-800">{reportsCount}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                      <p className="text-sm text-green-700 font-medium">Impact Score</p>
                      <p className="text-2xl font-bold text-green-800">{impactScore}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <h3 className="font-semibold text-green-700 mb-2">About</h3>
                    <p className="text-sm text-gray-600">{user.bio || "No bio provided. You can add one in Settings."}</p>
                  </div>
                </div>
              )}

              {activeTab === "pledges" && (
                <div>
                  {pledges.length > 0 ? (
                    <ul className="space-y-3">
                      {pledges.map((p) => (
                        <li key={p._id || p.id} className="bg-white p-3 rounded-lg border border-green-100">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-green-700">{p.speciesName || p.species || 'Unknown'}</p>
                              <p className="text-sm text-gray-600">Amount: {p.amount || 'N/A'}</p>
                            </div>
                            <div className="text-sm text-gray-400">{formatDate(p.date || p.createdAt)}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No pledges yet.</p>
                  )}
                </div>
              )}

              {activeTab === "reports" && (
                <div>
                  {reports.length > 0 ? (
                    <ul className="space-y-3">
                      {reports.map((r) => (
                        <li key={r._id || r.id} className="bg-white p-3 rounded-lg border border-green-100">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-green-700">{r.speciesName}</p>
                              <p className="text-sm text-gray-600">Type: <span className="font-medium">{r.issueType}</span></p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${r.status === "Pending" ? "bg-yellow-100 text-yellow-700" : r.status === "Reviewed" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{r.status}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{r.description}</p>
                          {r.image && <img src={r.image} alt={r.speciesName} className="w-full h-32 object-cover rounded-lg mb-2" />}
                          <p className="text-xs text-gray-400">Submitted: {formatDate(r.createdAt)}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No reports submitted yet.</p>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  {message && (
                    <div className={`p-3 rounded-md ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message}</div>
                  )}

                  {!editMode ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <p className="text-sm text-green-700 font-medium">Name</p>
                        <p className="text-gray-700">{user.name}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <p className="text-sm text-green-700 font-medium">Email</p>
                        <p className="text-gray-700">{user.email}</p>
                      </div>

                      <div className="md:col-span-2 bg-green-50 p-4 rounded-xl border border-green-100">
                        <p className="text-sm text-green-700 font-medium">Profile Picture</p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-white p-1 shadow">
                            {avatarPreview ? (
                              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">{user.name?.charAt(0)?.toUpperCase() || 'U'}</div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Change your avatar below</p>
                            <div className="mt-2 flex gap-2">
                              <button onClick={() => setEditMode(true)} className="px-3 py-2 bg-green-600 text-white rounded-md">Edit Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <h4 className="font-semibold text-green-700 mb-2">Report an Issue</h4>
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          setReportLoading(true);
                          setReportMessage("");
                          try {
                            const reportData = {
                              speciesName: e.target.speciesName.value,
                              issueType: e.target.issueType.value,
                              description: e.target.description.value,
                              image: e.target.image.value?.trim() || undefined,
                            };
                            const res = await api.post('/api/reports', reportData);
                            setReportMessage('✅ Report submitted successfully!');
                            setReports([res.data, ...reports]);
                            e.target.reset();
                            setTimeout(() => setReportMessage(''), 3000);
                          } catch (err) {
                            console.error('Report error:', err);
                            const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Failed to submit report';
                            setReportMessage(`❌ ${errorMsg}`);
                          } finally {
                            setReportLoading(false);
                          }
                        }} className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-green-700">Species Name *</label>
                            <input name="speciesName" required className="w-full p-2 border border-green-200 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-700">Issue Type *</label>
                            <select name="issueType" required className="w-full p-2 border border-green-200 rounded-md">
                              <option value="">Select Issue Type</option>
                              <option>Overhunting</option>
                              <option>Deforestation</option>
                              <option>Pollution</option>
                              <option>Climate Change</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-700">Description *</label>
                            <textarea name="description" rows={3} required className="w-full p-2 border border-green-200 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-green-700">Image URL (optional)</label>
                            <input name="image" type="url" className="w-full p-2 border border-green-200 rounded-md" />
                          </div>
                          <button type="submit" disabled={reportLoading} className="w-full bg-green-600 text-white py-2 rounded-md">{reportLoading ? 'Submitting...' : 'Submit Report'}</button>
                          {reportMessage && <p className="text-sm mt-2">{reportMessage}</p>}
                        </form>
                      </div>
                    </div>
                  ) : (
                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700">Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-green-200 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700">Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-green-200 rounded-md" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-green-700">Avatar (image file)</label>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full p-2" />
                      </div>

                      <div className="md:col-span-2 flex gap-3">
                        <button type="submit" disabled={updateLoading} className="px-4 py-2 bg-green-600 text-white rounded-md">{updateLoading ? 'Saving...' : 'Save Changes'}</button>
                        <button type="button" onClick={handleCancelEdit} disabled={updateLoading} className="px-4 py-2 border border-green-200 text-green-700 rounded-md">Cancel</button>
                      </div>
                    </motion.form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right column: quick stats */}
          <aside className="col-span-1 bg-white rounded-xl p-4 border border-green-100 shadow-sm">
            <div className="text-center mb-4">
              <p className="text-sm text-green-700 font-medium">Quick Stats</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
                <div>
                  <p className="text-xs text-green-700">Species Supported</p>
                  <p className="font-semibold text-green-800">{speciesCount}</p>
                </div>
                <Leaf className="w-6 h-6 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
                <div>
                  <p className="text-xs text-green-700">Pledges</p>
                  <p className="font-semibold text-green-800">{pledgesCount}</p>
                </div>
                <Heart className="w-6 h-6 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
                <div>
                  <p className="text-xs text-green-700">Reports</p>
                  <p className="font-semibold text-green-800">{reportsCount}</p>
                </div>
                <FileText className="w-6 h-6 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
                <div>
                  <p className="text-xs text-green-700">Impact</p>
                  <p className="font-semibold text-green-800">{impactScore}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">✓</div>
              </div>
            </div>
          </aside>
        </div>

      </motion.div>
    </section>
  );
}
