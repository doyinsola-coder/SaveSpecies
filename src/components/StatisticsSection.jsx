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
import { Card } from "./ui/Card"; // adjust import path
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="statistics" className="py-12 sm:py-16 bg-emerald-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full mb-3 sm:mb-4">
            <Activity className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-700">Global Conservation Data</span>
          </div>
          <h2 className="mb-3 text-2xl sm:text-3xl font-bold text-gray-900">
            Biodiversity Statistics
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Understanding biodiversity loss helps us take meaningful action to protect our planet's species.
          </p>
        </motion.div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {conservationStats.map((stat, idx) => (
            <Card
              key={idx}
              className="p-4 sm:p-6 hover:shadow-lg transition-shadow text-center sm:text-left"
            >
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                <div className="text-2xl sm:text-3xl text-emerald-600 font-semibold">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-gray-700">{stat.description}</p>
                <div className="flex justify-center sm:justify-start items-center gap-1 text-xs text-gray-500 pt-1 sm:pt-2">
                  {stat.change.startsWith("+") ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Pie Chart */}
          <Card className="p-4 sm:p-6">
            <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold">
              Conservation Status Distribution
            </h3>
            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={speciesDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      window.innerWidth < 640
                        ? `${(percent * 100).toFixed(0)}%`
                        : `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={window.innerWidth < 640 ? 70 : 80}
                    dataKey="value"
                  >
                    {speciesDistribution.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Bar Chart (Scrollable on small screens) */}
          <Card className="p-4 sm:p-6">
            <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold">
              Threatened Species by Group
            </h3>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-200">
              <div className="min-w-[420px] sm:min-w-full h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={habitatData} margin={{ bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="habitat"
                      angle={-35}
                      textAnchor="end"
                      height={60}
                      interval={0}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="threatened" fill="#2E7D32" name="Threatened Species" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        {/* Message Section */}
        <motion.div
          className="mt-10 sm:mt-12 bg-gradient-to-r from-emerald-100 via-blue-100 to-emerald-100 rounded-2xl p-6 sm:p-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-gray-900">
            Every Species Matters
          </h3>
          <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Over 41,000 species are threatened with extinction. But there's hope – conservation efforts have saved 48 species from the brink. Your pledge can make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="text-xl sm:text-2xl text-emerald-600 font-semibold">37%</div>
              <div className="text-xs sm:text-sm text-gray-500">species could go extinct</div>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="text-xl sm:text-2xl text-blue-600 font-semibold">10M</div>
              <div className="text-xs sm:text-sm text-gray-500">hectares lost yearly</div>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="text-xl sm:text-2xl text-emerald-800 font-semibold">48</div>
              <div className="text-xs sm:text-sm text-gray-500">species recovered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
