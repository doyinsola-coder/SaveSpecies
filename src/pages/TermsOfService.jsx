// src/pages/TermsOfService.jsx
import React from "react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-6">
            Last updated: <strong>October 27, 2025</strong>
          </p>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Agreement to Terms</h2>
            <p className="text-gray-700">
              These Terms govern your use of SaveSpecies. By accessing or using the service, you
              agree to be bound by these Terms. If you don’t agree, do not use the service.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Accounts</h2>
            <p className="text-gray-700">
              You are responsible for the accuracy of account information and for protecting
              your account credentials. We may suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Acceptable Use</h2>
            <p className="text-gray-700">
              Do not use the service to post illegal, abusive, or infringing content. Respect
              copyright and privacy of others.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Intellectual Property</h2>
            <p className="text-gray-700">
              All content provided by SaveSpecies is owned or licensed by us. You may not copy
              or reuse content without permission.
            </p>
          </section>

          <section className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p className="text-gray-700">
              To the extent permitted by law, SaveSpecies will not be liable for indirect,
              incidental, or consequential damages arising from use of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Governing Law</h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of Nigeria. Any disputes will be
              handled in the appropriate courts.
            </p>
          </section>

          <footer className="mt-6 text-sm text-gray-500">
            <p>Contact: <strong>abdulateefdoyinsolaabdulmubeen@gmail.com</strong></p>
          </footer>
        </div>
      </div>
    </motion.main>
  );
}
