import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const articles = [
  {
    title: "Rewilding Africa: The New Frontier",
    summary: "How reintroducing native species is restoring ecosystems.",
    content: "Rewilding Africa focuses on reviving natural habitats...",
  },
  {
    title: "Coral Reef Decline and Climate Change",
    summary: "Warming oceans threaten coral biodiversity worldwide.",
    content: "Climate change is causing bleaching events across reefs...",
  },
  {
    title: "The Role of Technology in Conservation",
    summary: "Drones, AI, and data science are reshaping wildlife monitoring.",
    content: "Innovative tools now track species and stop poaching in real time...",
  },
];

export default function ResearchArticles() {
  const [active, setActive] = useState(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-6 md:px-16 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-emerald-700 mb-10 text-center"
      >
        Research Articles
      </motion.h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={() => setActive(a)}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {a.title}
            </h3>
            <p className="text-gray-600">{a.summary}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg mx-4 shadow-xl text-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-emerald-700">
                {active.title}
              </h2>
              <p className="text-gray-600 mb-6">{active.content}</p>
              <button
                onClick={() => setActive(null)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
