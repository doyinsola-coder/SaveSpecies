import React from "react";
import { motion } from "framer-motion";
import { Leaf, Recycle, Droplet, Globe, Heart } from "lucide-react";

const tips = [
  {
    icon: Leaf,
    title: "Plant Trees",
    text: "Help restore natural habitats by planting native trees and plants.",
  },
  {
    icon: Recycle,
    title: "Reduce Waste",
    text: "Recycle plastics and reduce waste to protect oceans and wildlife.",
  },
  {
    icon: Droplet,
    title: "Conserve Water",
    text: "Avoid water wastage to preserve freshwater ecosystems.",
  },
  {
    icon: Globe,
    title: "Support Eco Groups",
    text: "Volunteer or donate to organizations working to save endangered species.",
  },
  {
    icon: Heart,
    title: "Spread Awareness",
    text: "Share knowledge about conservation with your community.",
  },
];

export default function ConservationTips() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-6 md:px-16 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-emerald-700 mb-10 text-center"
      >
        Conservation Tips
      </motion.h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <tip.icon className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600">{tip.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
