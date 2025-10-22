// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// export default function IUCNRedList() {
//   const [species, setSpecies] = useState([]);

//   useEffect(() => {
//     // Example fetch (use your backend route)
//     const fetchSpecies = async () => {
//       try {
//         const res = await axios.get("/api/species");
//         setSpecies(res.data);
//       } catch (err) {
//         console.error("Error fetching species:", err);
//       }
//     };
//     fetchSpecies();
//   }, []);

//   return (
//     <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-6 md:px-16 py-16">
//       <motion.h1
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-4xl md:text-5xl font-bold text-emerald-700 mb-10 text-center"
//       >
//         IUCN Red List
//       </motion.h1>

//       <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//         Explore global species and their current conservation status. Learn
//         about the most endangered and vulnerable animals on Earth.
//       </p>

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {species.map((item, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ scale: 1.05 }}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="h-48 w-full object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {item.name}
//               </h3>
//               <p
//                 className={`text-sm font-medium mt-1 ${
//                   item.status === "Endangered"
//                     ? "text-red-600"
//                     : item.status === "Vulnerable"
//                     ? "text-orange-500"
//                     : "text-green-600"
//                 }`}
//               >
//                 {item.status}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

