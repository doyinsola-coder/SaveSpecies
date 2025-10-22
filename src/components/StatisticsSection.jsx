// You can place this inside Home.jsx or in a separate file (e.g. StatisticsSection.jsx) and import it

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card } from "./ui/Card";  // adjust import path as needed
import { conservationStats } from "../lib/species-data"; // adjust path

export default function StatisticsSection() {
  const speciesDistribution = [
    { name: "Critically Endangered", value: 8914, color: "#dc2626" },
    { name: "Endangered", value: 16431, color: "#ea580c" },
    { name: "Vulnerable", value: 15902, color: "#ca8a04" },
    { name: "Near Threatened", value: 7762, color: "#2563eb" },
  ];

  const habitatData = [
    { habitat: "Mammals", threatened: 1307, total: 5513 },
    { habitat: "Birds", threatened: 1481, total: 10425 },
    { habitat: "Reptiles", threatened: 1829, total: 10038 },
    { habitat: "Amphibians", threatened: 2467, total: 6771 },
    { habitat: "Fish", threatened: 2386, total: 32900 },
    { habitat: "Invertebrates", threatened: 2644, total: 1305250 },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="statistics" className="py-16 sm:py-24 bg-emerald-50"> 
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
            <Activity className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-700">Global Conservation Data</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Biodiversity Statistics</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding the scale of biodiversity loss helps us take meaningful action
            to protect our planet's precious species.
          </p>
        </motion.div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {conservationStats.map((stat, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <div className="text-3xl text-emerald-600">{stat.value}</div>
                <p className="text-sm text-gray-700">{stat.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 pt-2">
                  {stat.change.startsWith("+") ? (
                    <TrendingUp className="h-3 w-3 text-red-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-600" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <Card className="p-6">
            <h3 className="mb-6 text-xl font-semibold">Conservation Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {speciesDistribution.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart */}
          <Card className="p-6">
            <h3 className="mb-6 text-xl font-semibold">Threatened Species by Group</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={habitatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="habitat" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="threatened" fill="#2E7D32" name="Threatened Species" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Impact / Message Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-emerald-100 via-blue-100 to-emerald-100 rounded-2xl p-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="mb-3 text-2xl font-bold text-gray-900">Every Species Matters</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Over 41,000 species are threatened with extinction. But there's hope – 
            conservation efforts have saved 48 species from the brink. Your pledge can make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="text-2xl text-emerald-600">37%</div>
              <div className="text-sm text-gray-500">of species could go extinct</div>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="text-2xl text-blue-600">10M</div>
              <div className="text-sm text-gray-500">hectares of forest lost/year</div>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <div className="text-2xl text-emerald-800">48</div>
              <div className="text-sm text-gray-500">species recovered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
