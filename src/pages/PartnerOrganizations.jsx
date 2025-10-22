import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "WWF", logo: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760697855/wwf_waw5gl.png" },
  { name: "Wildlife Conservation Society", logo: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760697855/wlc_yzdhy9.jpg" },
  { name: "National Geographic", logo: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760697855/NATGEO_pe9j4j.png" },
  { name: "IUCN", logo: "https://res.cloudinary.com/decgjhtlb/image/upload/v1760697855/IUCN_vwibrh.jpg" },
];

export default function PartnerOrganizations() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-6 md:px-16 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-emerald-700 mb-10 text-center"
      >
        Partner Organizations
      </motion.h1>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        We collaborate with global conservation partners committed to protecting
        wildlife and their natural habitats.
      </p>

      <div className="overflow-hidden relative w-full py-10">
        <motion.div
          className="flex gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...partners, ...partners].map((org, idx) => (
            <div key={idx} className="min-w-[200px] flex flex-col items-center">
              <img
                src={org.logo}
                alt={org.name}
                className="h-24 object-contain mb-3"
              />
              <p className="font-semibold text-gray-700">{org.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
