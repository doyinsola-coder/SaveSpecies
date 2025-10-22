import React from "react";
import { motion } from "framer-motion";

export default function EducationalResources() {
  const videos = [
    {
      title: "Protecting Marine Life",
      url: "https://www.youtube.com/embed/fUkxk8UYX4A",
    },
    {
      title: "The Fight Against Deforestation",
      url: "https://www.youtube.com/embed/_DhjPFSJbEw",
    },
  ];

  const materials = [
    {
      title: "Wildlife Conservation Handbook",
      link: "/EB-2025-145-R-14.pdf",
    },
    {
      title: "Climate & Habitat Report 2025",
      link: "/WildlifeConservationandProtectedAreaManagement.pdf",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-6 md:px-16 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-emerald-700 mb-10 text-center"
      >
        Educational Resources
      </motion.h1>

      {/* YouTube Videos */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {videos.map((vid, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <iframe
              src={vid.url}
              title={vid.title}
              className="w-full h-64 md:h-80"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {vid.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Downloadable PDFs */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
          Downloadable Materials
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {materials.map((m, i) => (
            <a
              key={i}
              href={m.link}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-emerald-600 text-white px-5 py-3 rounded-full hover:bg-emerald-700 transition"
            >
              {m.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
