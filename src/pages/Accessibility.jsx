// src/pages/Accessibility.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Accessibility() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">Accessibility Statement</h1>
          <p className="text-sm text-gray-600 mb-6">Last updated: <strong>October 27, 2025</strong></p>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Our commitment</h2>
            <p className="text-gray-700">
              SaveSpecies is committed to making content accessible to as many people as possible,
              including those with disabilities. We follow established accessibility best practices.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Accessibility features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Keyboard navigable UI</li>
              <li>Semantic HTML and ARIA attributes where applicable</li>
              <li>High contrast colors and scalable text</li>
              <li>Alt text for meaningful images</li>
            </ul>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Ongoing improvements</h2>
            <p className="text-gray-700">
              We continuously test and update the site for accessibility. If you encounter barriers,
              please contact us with details and we will respond within 3 business days.
            </p>
          </section>

          <section className="mt-6 text-sm text-gray-500">
            <p>To report accessibility issues, email: <strong>abdulateefdoyinsolaabdulmubeen@gmail.com</strong></p>
          </section>
        </div>
      </div>
    </motion.main>
  );
}
