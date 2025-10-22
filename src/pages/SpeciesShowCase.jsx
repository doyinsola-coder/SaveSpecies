import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const speciesData = [
  {
    name: "African Elephant",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694798/nam-anh-QJbyG6O0ick-unsplash_1_aropzk.jpg",
    status: "Endangered",
    description:
      "The largest land mammal on Earth, African elephants are under threat from poaching and habitat loss.",
  },
  {
    name: "Green Sea Turtle",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694779/randall-ruiz-LVnJlyfa7Zk-unsplash_qfi5le.jpg",
    status: "Endangered",
    description:
      "These gentle creatures are threatened by pollution, bycatch, and illegal egg collection.",
  },
  {
    name: "Snow Leopard",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694811/robert-sachowski-HFIvhaOcHVA-unsplash_db7pzm.jpg",
    status: "Vulnerable",
    description:
      "Elusive mountain predators facing habitat loss and poaching in Central and South Asia.",
  },
];

const endangeredAnimals = [
  {
    name: "Amur Leopard",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694798/uriel-soberanes-oMvtVzcFPlU-unsplash_igrc4p.jpg",
    status: "Critically Endangered",
    description:
      "One of the rarest big cats in the world, found in the forests of eastern Russia and China.",
  },
  {
    name: "Javan Rhino",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694774/aurelia-santos-8AjBQux_yQk-unsplash_xcak0o.jpg",
    status: "Critically Endangered",
    description:
      "With fewer than 80 individuals left, the Javan Rhino is one of the rarest mammals on Earth.",
  },
  {
    name: "Sumatran Tiger",
    image:
      "/sumatrantiger.avif",
    status: "Critically Endangered",
    description:
      "This tiger subspecies faces extinction due to deforestation and poaching in Indonesia.",
  },
  {
    name: "Hawksbill Turtle",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694774/abner-abiu-castillo-diaz-N5ByCirHVqw-unsplash_iupgpg.jpg",
    status: "Critically Endangered",
    description:
      "Known for their beautiful shells, they are heavily poached for the illegal trade market.",
  },
  {
    name: "Sumatran Orangutan",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694799/chuttersnap-_83fyG9rzx4-unsplash_d2qsns.jpg",
    status: "Critically Endangered",
    description:
      "Native to the rainforests of Sumatra, their homes are being lost to palm oil plantations.",
  },
  {
    name: "Mountain Gorilla",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694778/caterina-sanders-8EHl7ahIyFM-unsplash_vkz8ba.jpg",
    status: "Endangered",
    description:
      "Conservation efforts have improved their numbers, but habitat loss still threatens them.",
  },
  {
    name: "Vaquita",
    image:
      "/Vaquita.jpg",
    status: "Critically Endangered",
    description:
      "The world’s rarest marine mammal, found only in Mexico’s Gulf of California.",
  },
  {
    name: "Red Panda",
    image:
      "/redpanda.avif",
    status: "Endangered",
    description:
      "These adorable creatures are losing their bamboo forests to deforestation.",
  },
  {
    name: "Polar Bear",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1760694750/hans-jurgen-mager-qQWV91TTBrE-unsplash_vhkfvw.jpg",
    status: "Vulnerable",
    description:
      "Rapid ice loss from climate change threatens the polar bear’s hunting grounds.",
  },
];

export default function SpeciesShowcase() {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleDonate = (species) => {
    navigate("/donation", { state: { species } });
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white py-16 px-6 md:px-12">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center text-emerald-700 mb-12"
      >
        Endangered Species You Can Support
      </motion.h2>

      {/* Main Species Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16">
        {speciesData.map((species, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex-1 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all"
          >
            <img
              src={species.image}
              alt={species.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {species.name}
              </h3>
              <p className="text-sm text-emerald-600 font-medium mb-3">
                Conservation Status: {species.status}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {species.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleDonate(species)}
                className="w-full bg-emerald-600 text-white px-5 py-3 rounded-full font-medium hover:bg-emerald-700 transition"
              >
                Donate to Save {species.name}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Endangered Animals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {endangeredAnimals.map((animal, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer group"
            onClick={() => setSelectedAnimal(animal)}
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full aspect-square object-cover rounded-xl shadow-md group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg opacity-80">
              {animal.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {selectedAnimal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative"
            >
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedAnimal.name}
                </h3>
                <p className="text-sm text-emerald-600 font-medium mb-3">
                  {selectedAnimal.status}
                </p>
                <p className="text-gray-600 mb-6">{selectedAnimal.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedAnimal(null);
                    handleDonate(selectedAnimal);
                  }}
                  className="w-full bg-emerald-600 text-white px-5 py-3 rounded-full font-medium hover:bg-emerald-700 transition"
                >
                  Donate to Help {selectedAnimal.name}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
