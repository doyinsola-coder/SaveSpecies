import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  Filter,
  Search,
  Download,
  X,
} from "lucide-react";
import axios from "axios";

// ✅ Updated axios instance setup
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000",
  withCredentials: true,
});

// ✅ Attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("⚠️ Please log in first to access reports");
        setLoading(false);
        return;
      }

      const res = await api.get("/api/reports");
      console.log("Reports fetched:", res.data);
      setReports(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setMessage(
        error.response?.status === 401
          ? "❌ Unauthorized: Please log in again"
          : "❌ Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reportsData) => {
    const stats = {
      total: reportsData.length,
      pending: reportsData.filter((r) => r.status === "Pending").length,
      reviewed: reportsData.filter((r) => r.status === "Reviewed").length,
      resolved: reportsData.filter((r) => r.status === "Resolved").length,
    };
    setStats(stats);
  };

  const updateStatus = async (reportId, newStatus) => {
    try {
      await api.put(`/api/reports/${reportId}/status`, { status: newStatus });
      setMessage(`✅ Status updated to ${newStatus}`);
      fetchReports();
      setSelectedReport(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("❌ Failed to update status");
    }
  };

  const deleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await api.delete(`/api/reports/${reportId}`);
      setMessage("✅ Report deleted successfully");
      fetchReports();
      setSelectedReport(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting report:", error);
      setMessage("❌ Failed to delete report");
    }
  };

  const exportToCSV = () => {
    const headers = ["Species Name", "Issue Type", "Description", "Status", "Date", "User"];
    const csvData = filteredReports.map((r) => [
      r.speciesName,
      r.issueType,
      r.description.replace(/,/g, ";"),
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
      r.user?.name || "Unknown",
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reports-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      filterStatus === "All" || report.status === filterStatus;
    const matchesSearch =
      report.speciesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-50">
        <div className="text-emerald-600 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-4 sm:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage conservation reports and track progress
          </p>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
              message.startsWith("✅")
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border-l-4 border-emerald-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Reports</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-700">
                  {stats.total}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border-l-4 border-yellow-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Reviewed</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {stats.reviewed}
                </p>
              </div>
              <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Resolved</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {stats.resolved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 md:flex-none px-3 sm:px-4 py-2 text-sm border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Reviewed</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:flex-1 md:max-w-md">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2 text-sm border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-3 sm:px-4 py-2 text-sm rounded-lg hover:bg-emerald-700 transition whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </motion.button>
          </div>
        </div>

        {/* Reports Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">
                    Species
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">
                    Issue Type
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">
                    Reporter
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-center text-xs lg:text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No reports found
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr
                      key={report._id}
                      className="hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm font-medium text-gray-900">
                        {report.speciesName}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-gray-600">
                        {report.issueType}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span
                          className={`inline-flex px-2 lg:px-3 py-1 text-xs font-semibold rounded-full ${
                            report.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : report.status === "Reviewed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-gray-600">
                        {formatDate(report.createdAt)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm text-gray-600">
                        {report.user?.name || "Unknown"}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedReport(report)}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteReport(report._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reports Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              No reports found
            </div>
          ) : (
            filteredReports.map((report) => (
              <motion.div
                key={report._id}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-emerald-700 text-base mb-1">
                      {report.speciesName}
                    </h3>
                    <p className="text-xs text-gray-600">{report.issueType}</p>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      report.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : report.status === "Reviewed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  <p>Reporter: {report.user?.name || "Unknown"}</p>
                  <p>{formatDate(report.createdAt)}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => deleteReport(report._id)}
                    className="flex items-center justify-center bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Report Details Modal */}
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
                  Report Details
                </h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">
                    Species Name
                  </label>
                  <p className="text-base sm:text-lg text-gray-900">
                    {selectedReport.speciesName}
                  </p>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">
                    Issue Type
                  </label>
                  <p className="text-sm sm:text-base text-gray-900">{selectedReport.issueType}</p>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <p className="text-sm sm:text-base text-gray-900">{selectedReport.description}</p>
                </div>

                {selectedReport.image && (
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">
                      Image
                    </label>
                    <img
                      src={selectedReport.image}
                      alt={selectedReport.speciesName}
                      className="w-full h-48 sm:h-64 object-cover rounded-lg mt-2"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">
                      Reported By
                    </label>
                    <p className="text-sm sm:text-base text-gray-900">
                      {selectedReport.user?.name || "Unknown"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {selectedReport.user?.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">
                      Date Submitted
                    </label>
                    <p className="text-sm sm:text-base text-gray-900">
                      {formatDate(selectedReport.createdAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                    Update Status
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() =>
                        updateStatus(selectedReport._id, "Pending")
                      }
                      className={`flex-1 py-2 text-sm rounded-lg transition ${
                        selectedReport.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(selectedReport._id, "Reviewed")
                      }
                      className={`flex-1 py-2 text-sm rounded-lg transition ${
                        selectedReport.status === "Reviewed"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(selectedReport._id, "Resolved")
                      }
                      className={`flex-1 py-2 text-sm rounded-lg transition ${
                        selectedReport.status === "Resolved"
                          ? "bg-green-500 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}