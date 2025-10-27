// src/pages/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-6">
            Effective date: <strong>October 27, 2025</strong>
          </p>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-gray-700">
              SaveSpecies.. we are committed to protecting your privacy.
              This policy explains how we collect, use, store, and disclose personal information
              when you use the SaveSpecies website and services.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Account information: name, email, password (hashed) and profile details.</li>
              <li>Pledges and activity: species you pledge for and timestamps.</li>
              <li>Contact and newsletter emails if you subscribe.</li>
              <li>Technical data: IP address, browser type, cookies and usage analytics.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">How We Use Your Data</h2>
            <p className="text-gray-700">
              We use data to provide and improve services, to communicate with you, and to
              personalize the user experience. Examples include: sending transactional emails,
              showing relevant species or content, and measuring engagement.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Sharing & Disclosure</h2>
            <p className="text-gray-700">
              We do not sell personal data. We may share data with service providers (hosting,
              email, analytics) under contract to help operate the site. We may disclose data
              when required by law or to protect rights and safety.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Cookies & Tracking</h2>
            <p className="text-gray-700">
              We use cookies for session management and analytics. You can control cookie
              preferences via your browser settings. See our Cookie Policy for more details.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Data Retention & Security</h2>
            <p className="text-gray-700">
              We retain personal data only as long as necessary. We use industry-standard
              security practices (TLS, hashed passwords) but no system is 100% secure.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p className="text-gray-700">
              Depending on your location, you may have rights to access, correct, or delete
              your data. Contact us at <strong>abdulateefdoyinsolaabdulmubeen@gmail.com</strong> to exercise these rights.
            </p>
          </section>

          <section className="mt-6">
            <p className="text-sm text-gray-500">
              For questions about this policy contact: <strong>abdulateefdoyinsolaabdulmubeen@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  );
}
