// import React from "react";

// const KeyProduct = () => {
//   return (
//     <section className="w-full bg-[--color-home-warm-100] py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12">
//       {/* Left Text */}
//       <div className="w-full md:w-5/12 space-y-8">
//         <div className="bg-[var(--color-sunlink-orange-500)] text-[var(--color-sunlink-blue-50)] p-6 rounded-2xl shadow-xl space-y-4">
//           <h2 className="text-3xl font-bold flex items-center gap-2">
//             <span className="inline-block hover:animate-spin-slow">
//               <svg
//                 className="w-12 h-12"
//                 viewBox="0 0 120 120"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="60" cy="60" r="25" fill="#FFD54F" />
//                 <circle cx="60" cy="60" r="20" fill="#FFC107" />
//                 <path d="M60 5 L65 20 L60 25 L55 20 Z" fill="#FF9800" />
//                 <path d="M60 115 L65 100 L60 95 L55 100 Z" fill="#FF9800" />
//                 <path d="M5 60 L20 55 L25 60 L20 65 Z" fill="#FF9800" />
//                 <path d="M115 60 L100 65 L95 60 L100 55 Z" fill="#FF9800" />
//                 <path d="M21 21 L31 31 L26 36 L16 26 Z" fill="#FF9800" />
//                 <path d="M99 99 L89 89 L94 84 L104 94 Z" fill="#FF9800" />
//                 <path d="M21 99 L31 89 L36 94 L26 104 Z" fill="#FF9800" />
//                 <path d="M99 21 L89 31 L84 26 L94 16 Z" fill="#FF9800" />
//               </svg>
//             </span>
//             <span>Our Key Product</span>
//           </h2>

//           <p className="text-lg leading-relaxed">
//             Experience the perfect fusion of design and efficiency. Our solar
//             light units are built to shine bright, last long, and save energy —
//             all while looking stunning in your space.
//           </p>
//         </div>
//         <button
//           className="px-6 py-3 rounded-xl font-medium border"
//           style={{
//             color: "#ff7b00",
//             borderColor: "#ff7b00",
//             background: "rgba(255, 123, 0, 0.05)",
//           }}
//         >
//           Explore More
//         </button>
//       </div>

//       {/* Right Image */}
//       <div className="w-full md:w-1/2">
//         <img
//           src="/solar.png"
//           alt="Key Solar Light Product"
//           className="w-full  mx-auto rounded-2xl object-cover"
//         />
//       </div>
//     </section>
//   );
// };

// export default KeyProduct;

import React, { useState, useRef } from "react";
import { ArrowRight, Zap, Shield, Leaf, Star, Play } from "lucide-react";
import { motion } from "framer-motion";

const KeyProduct = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "High Efficiency",
      description: "Advanced solar cells with 22% efficiency rating",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Weather Resistant",
      description: "IP67 rated for all weather conditions",
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Eco-Friendly",
      description: "Zero carbon footprint with renewable energy",
    },
  ];

  const SolarIcon = () => (
    <div className="relative">
      <svg
        className={`w-16 h-16 transition-transform duration-700 ${
          isHovered ? "rotate-180 scale-110" : ""
        }`}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow */}
        <circle cx="60" cy="60" r="30" fill="rgba(255, 213, 79, 0.3)" />

        {/* Main sun body */}
        <circle cx="60" cy="60" r="25" fill="#FFD54F" />
        <circle cx="60" cy="60" r="20" fill="#FFC107" />
        <circle cx="60" cy="60" r="15" fill="#FF9800" />

        {/* Sun rays */}
        <g
          className={`transition-transform duration-1000 ${
            isHovered ? "scale-125" : ""
          }`}
        >
          <path d="M60 5 L65 20 L60 25 L55 20 Z" fill="#FF9800" />
          <path d="M60 115 L65 100 L60 95 L55 100 Z" fill="#FF9800" />
          <path d="M5 60 L20 55 L25 60 L20 65 Z" fill="#FF9800" />
          <path d="M115 60 L100 65 L95 60 L100 55 Z" fill="#FF9800" />
          <path d="M21 21 L31 31 L26 36 L16 26 Z" fill="#FF9800" />
          <path d="M99 99 L89 89 L94 84 L104 94 Z" fill="#FF9800" />
          <path d="M21 99 L31 89 L36 94 L26 104 Z" fill="#FF9800" />
          <path d="M99 21 L89 31 L84 26 L94 16 Z" fill="#FF9800" />
        </g>
      </svg>

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-20 h-20 rounded-full border-2 border-orange-300/30 transition-all duration-1000 ${
            isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <div
          className={`absolute w-24 h-24 rounded-full border border-orange-200/20 transition-all duration-1000 delay-300 ${
            isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </div>
    </div>
  );

  return (
    <section className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24 px-6 md:px-16 relative overflow-hidden text-gray-900">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute inset-0"
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12 space-y-8"
          >
            {/* Hero Card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <motion.div
                  animate={{ scale: isHovered ? 1.5 : 1 }}
                  transition={{ duration: 1 }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                />
                <motion.div
                  animate={{ scale: isHovered ? 1.5 : 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full"
                />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <SolarIcon />
                  </motion.div>
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-4xl font-bold mb-2"
                    >
                      Our Key Product
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="flex items-center gap-2 text-orange-200"
                    >
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium">
                        Premium Solar Solution
                      </span>
                    </motion.div>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-xl leading-relaxed text-orange-50"
                >
                  Experience the perfect fusion of design and efficiency. Our
                  solar light units are built to shine bright, last long, and
                  save energy — all while looking stunning in your space.
                </motion.p>
                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="grid grid-cols-3 gap-4 pt-4"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">
                      98%
                    </div>
                    <div className="text-sm text-orange-200">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">
                      12hr
                    </div>
                    <div className="text-sm text-orange-200">Runtime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">
                      IP67
                    </div>
                    <div className="text-sm text-orange-200">Rating</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(255, 140, 0, 0.10)" }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <span>Explore More</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="group border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </motion.div>
          {/* Right Image */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-7/12"
          >
            <div
              ref={imageRef}
              className="relative group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image container with 3D effect */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.03 : 1,
                  boxShadow: isHovered
                    ? "0 12px 48px 0 rgba(255, 140, 0, 0.15)"
                    : "0 8px 32px 0 rgba(255, 140, 0, 0.08)",
                }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg) scale(1.02)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                  alt="Key Solar Light Product"
                  className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100"
                />
                {/* Floating elements */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    Active
                  </div>
                </motion.div>
              </motion.div>
              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KeyProduct;
