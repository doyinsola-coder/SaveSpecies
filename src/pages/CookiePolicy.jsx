// src/pages/CookiePolicy.jsx
import React from "react";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">Cookie Policy</h1>
          <p className="text-sm text-gray-600 mb-6">Effective date: <strong>October 27, 2025</strong></p>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">What are cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files stored on your device to help websites remember information
              about your visit (preferences, login status, analytics).
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">How we use cookies</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Essential cookies:</strong> required for site functionality (sessions, auth).</li>
              <li><strong>Performance cookies:</strong> anonymous analytics that help us improve the site.</li>
              <li><strong>Functional cookies:</strong> remember UI preferences and language.</li>
              <li><strong>Third-party cookies:</strong> used by embedded services such as analytics or maps.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Managing cookies</h2>
            <p className="text-gray-700">
              You can change or withdraw consent for cookies via your browser settings. Blocking cookies
              may affect site functionality. For analytics opt-out, consider using a browser privacy plugin.
            </p>
          </section>

          <section className="mt-6 text-sm text-gray-500">
            <p>Questions? Contact: <strong>abdulateefdoyinsolaabdulmubeen@gmail.com</strong></p>
          </section>
        </div>
      </div>
    </motion.main>
  );
}
