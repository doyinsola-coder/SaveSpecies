import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Leaf, Users, Globe2, Heart } from "lucide-react";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const highlights = [
    {
      icon: <Globe2 className="w-6 h-6 text-emerald-600" />,
      title: "Global Impact",
      description:
        "We connect conservationists and supporters worldwide to protect endangered species and preserve biodiversity.",
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Community-Driven",
      description:
        "SaveSpecies thrives on pledges, donations, and awareness campaigns powered by passionate individuals like you.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: "Sustainable Future",
      description:
        "Our mission is to inspire actionable change through education, transparency, and collaboration.",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-emerald-600 mb-6"
        >
          About Us
        </motion.h1>

        <p
          data-aos="fade-up"
          className="text-gray-700 text-lg leading-relaxed mb-10 max-w-3xl mx-auto"
        >
          SaveSpecies is a conservation-driven initiative dedicated to protecting endangered species across the globe.
          Through data, awareness, and community pledges, we aim to ensure a thriving future for wildlife and ecosystems.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-emerald-600 text-white rounded-2xl py-10 px-6">
          <Heart className="w-8 h-8 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold mb-2">
            Join the Movement
          </h2>
          <p className="max-w-2xl mx-auto text-emerald-100">
            Every pledge, donation, and share counts. Together, we can make a lasting impact on the future of wildlife conservation.
          </p>
        </div>
      </div>
    </section>
  );
}
