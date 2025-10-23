import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-emerald-600 mb-10 text-center"
        >
          Contact Us
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions, suggestions, or want to collaborate? Reach out to us—we'd love to hear from you.
            </p>

            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-emerald-500" />
              <span>support@savespecies.org</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-emerald-500" />
              <span>+234 9035667678</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span>Kwara, Nigeria</span>
            </div>
          </div>

          {/* Contact Form */}
          <form
            action="https://formsubmit.co/abdulateefdoyinsolaabdulmubeen@gmail.com"
            method="POST"
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Contact Form Submission - SaveSpecies" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}