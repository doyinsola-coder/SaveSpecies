import React from "react";
import { Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <Heart
                  className="h-5 w-5 text-emerald-600"
                  fill="currentColor"
                />
              </div>
              <span className="font-bold text-xl tracking-wide">
                SaveSpecies
              </span>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              Protecting biodiversity and ensuring every species thrives.{" "}
              Supporting{" "}
              <span className="font-semibold text-emerald-300">
                UN SDG 14 & 15
              </span>
              .
            </p>

            <div className="flex gap-3">
              {[
                { icon: <FaTwitter />, url: "https://twitter.com" },
                { icon: <FaGithub />, url: "https://github.com" },
                { icon: <FaInstagram />, url: "https://instagram.com" },
                { icon: <FaLinkedin />, url: "https://linkedin.com" },
                { icon: <FaYoutube />, url: "https://youtube.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-emerald-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", link: "/" },
                { name: "Explore Species", link: "/explore" },
                { name: "Take a Pledge", link: "/pledge" },
                { name: "About Us", link: "/about" },
                { name: "Contact", link: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="text-white/70 hover:text-emerald-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-emerald-300">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                {
                  name: "IUCN Red List",
                  path: "https://www.iucnredlist.org/",
                  external: true,
                },
                { name: "Conservation Tips", path: "/tips" },
                { name: "Educational Resources", path: "/resources" },
                { name: "Partner Organizations", path: "/partners" },
                { name: "Research Articles", path: "/research" },
              ].map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-emerald-300 transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-white/70 hover:text-emerald-300 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-emerald-300">
              Stay Updated
            </h4>
            <p className="text-sm text-white/80 mb-4">
              Get conservation news, stories, and updates straight to your
              inbox.
            </p>

            <form
              action="https://formsubmit.co/abdulateefdoyinsolaabdulmubeen@gmail.com"
              method="POST"
              className="flex flex-col sm:flex-row gap-2"
            >
              <input type="hidden" name="_subject" value="New Newsletter Subscription!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-lg transition flex items-center justify-center"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/20" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/70"
        >
          <p>
            © {currentYear}{" "}
            <span className="font-semibold text-emerald-300">SaveSpecies</span>
            . All rights reserved.
          </p>
<div className="flex flex-wrap justify-center gap-6">
  {[
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookie" },
    { name: "Accessibility", path: "/access" },
  ].map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="hover:text-emerald-300 transition-colors"
    >
      {item.name}
    </Link>
  ))}
</div>

        </motion.div>
      </div>
    </footer>
  );
}