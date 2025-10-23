import React from "react";
import { useState, useEffect } from "react";
import { HeartHandshake, User, Leaf } from "lucide-react";

export default function PledgePage() {
  const [pledges, setPledges] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    speciesName: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch pledges from backend
  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const res = await fetch("https://savespeciesexpress.onrender.com/api/pledges");
        const data = await res.json();
        setPledges(data);
      } catch (error) {
        console.error("Error fetching pledges:", error);
      }
    };
    fetchPledges();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle pledge submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.speciesName) return alert("Please fill all fields.");

    setLoading(true);
    try {
      const res = await fetch("https://savespeciesexpress.onrender.com/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newPledge = await res.json();
        setPledges([newPledge, ...pledges]);
        setFormData({ userName: "", speciesName: "" });
      } else {
        alert("Failed to submit pledge.");
      }
    } catch (error) {
      console.error("Error submitting pledge:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-emerald-700 flex justify-center items-center gap-2 mb-6">
          <HeartHandshake className="w-8 h-8 text-emerald-600" />
          Take a Pledge
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Make a personal commitment to protect endangered species. Your action matters!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto mb-12"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center border rounded-lg p-2">
              <User className="w-5 h-5 mr-2 text-emerald-500" />
              <input
                type="text"
                name="userName"
                placeholder="Your Name"
                value={formData.userName}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded-lg p-2">
              <Leaf className="w-5 h-5 mr-2 text-emerald-500" />
              <input
                type="text"
                name="speciesName"
                placeholder="Species You Pledge to Protect"
                value={formData.speciesName}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-all"
            >
              {loading ? "Submitting..." : "Submit Pledge"}
            </button>
          </div>
        </form>

        {/* Display pledges */}
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pledges.map((pledge) => (
            <div
              key={pledge._id}
              className="bg-white shadow-md rounded-xl p-4 border-l-4 border-emerald-500"
            >
              <h3 className="font-semibold text-emerald-700">{pledge.userName}</h3>
              <p className="text-gray-600 text-sm">{pledge.speciesName}</p>
              <span className="text-xs text-gray-400 block mt-2">
                {new Date(pledge.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        {pledges.length === 0 && (
          <p className="text-gray-500 mt-6">No pledges yet. Be the first!</p>
        )}
      </div>
    </section>
  );
}
