// import React, { useState, useRef } from "react";
// import { ArrowRight, Zap, Shield, Leaf, Star, Play } from "lucide-react";

// const KeyProduct = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const imageRef = useRef(null);

//   const handleMouseMove = (e) => {
//     if (!imageRef.current) return;

//     const rect = imageRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width;
//     const y = (e.clientY - rect.top) / rect.height;

//     setMousePosition({ x, y });
//   };

//   const features = [
//     {
//       icon: <Zap className="w-5 h-5" />,
//       title: "High Efficiency",
//       description: "Advanced solar cells with 22% efficiency rating",
//     },
//     {
//       icon: <Shield className="w-5 h-5" />,
//       title: "Weather Resistant",
//       description: "IP67 rated for all weather conditions",
//     },
//     {
//       icon: <Leaf className="w-5 h-5" />,
//       title: "Eco-Friendly",
//       description: "Zero carbon footprint with renewable energy",
//     },
//   ];

//   const SolarIcon = () => (
//     <div className="relative">
//       <svg
//         className={`w-16 h-16 transition-transform duration-700 ${
//           isHovered ? "rotate-180 scale-110" : ""
//         }`}
//         viewBox="0 0 120 120"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* Outer glow */}
//         <circle cx="60" cy="60" r="30" fill="rgba(255, 213, 79, 0.3)" />

//         {/* Main sun body */}
//         <circle cx="60" cy="60" r="25" fill="#FFD54F" />
//         <circle cx="60" cy="60" r="20" fill="#FFC107" />
//         <circle cx="60" cy="60" r="15" fill="#FF9800" />

//         {/* Sun rays */}
//         <g
//           className={`transition-transform duration-1000 ${
//             isHovered ? "scale-125" : ""
//           }`}
//         >
//           <path d="M60 5 L65 20 L60 25 L55 20 Z" fill="#FF9800" />
//           <path d="M60 115 L65 100 L60 95 L55 100 Z" fill="#FF9800" />
//           <path d="M5 60 L20 55 L25 60 L20 65 Z" fill="#FF9800" />
//           <path d="M115 60 L100 65 L95 60 L100 55 Z" fill="#FF9800" />
//           <path d="M21 21 L31 31 L26 36 L16 26 Z" fill="#FF9800" />
//           <path d="M99 99 L89 89 L94 84 L104 94 Z" fill="#FF9800" />
//           <path d="M21 99 L31 89 L36 94 L26 104 Z" fill="#FF9800" />
//           <path d="M99 21 L89 31 L84 26 L94 16 Z" fill="#FF9800" />
//         </g>
//       </svg>

//       {/* Animated rings */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div
//           className={`w-20 h-20 rounded-full border-2 border-orange-300/30 dark:border-orange-400/40 transition-all duration-1000 ${
//             isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
//           }`}
//         />
//         <div
//           className={`absolute w-24 h-24 rounded-full border border-orange-200/20 dark:border-orange-300/30 transition-all duration-1000 delay-300 ${
//             isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
//           }`}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <section className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-24 px-6 md:px-16 relative overflow-hidden text-gray-900 dark:text-white transition-colors duration-500">
//       {/* Background decoration */}
//       <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 dark:from-orange-600/30 dark:to-yellow-600/30 rounded-full blur-3xl" />
//         <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-600/30 dark:to-orange-600/30 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto relative">
//         <div className="flex flex-col lg:flex-row items-center gap-16">
//           {/* Left Content */}
//           <div className="w-full lg:w-5/12 space-y-8">
//             {/* Hero Card */}
//             <div
//               className="relative bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white p-8 rounded-3xl shadow-2xl dark:shadow-slate-900/50 hover:shadow-orange-500/25 dark:hover:shadow-orange-600/30 transition-all duration-500 transform hover:scale-105 border border-orange-400/20 dark:border-orange-500/30"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {/* Animated background pattern */}
//               <div className="absolute inset-0 overflow-hidden rounded-3xl">
//                 <div
//                   className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full transition-transform duration-1000"
//                   style={{
//                     transform: isHovered ? "scale(1.5)" : "scale(1)",
//                   }}
//                 />
//                 <div
//                   className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full transition-transform duration-1000"
//                   style={{
//                     transform: isHovered ? "scale(1.5)" : "scale(1)",
//                     transitionDelay: "0.2s",
//                   }}
//                 />
//               </div>
//               <div className="relative z-10 space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div
//                     className="transition-transform duration-700"
//                     style={{
//                       transform: isHovered
//                         ? "rotate(180deg) scale(1.1)"
//                         : "rotate(0deg) scale(1)",
//                     }}
//                   >
//                     <SolarIcon />
//                   </div>
//                   <div>
//                     <h2 className="text-4xl font-bold mb-2">Our Key Product</h2>
//                     <div className="flex items-center gap-2 text-orange-200 dark:text-orange-100">
//                       <Star className="w-5 h-5 fill-current" />
//                       <span className="text-sm font-medium">
//                         Premium Solar Solution
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-xl leading-relaxed text-orange-50 dark:text-orange-100">
//                   Experience the perfect fusion of design and efficiency. Our
//                   solar light units are built to shine bright, last long, and
//                   save energy — all while looking stunning in your space.
//                 </p>
//                 {/* Stats */}
//                 <div className="grid grid-cols-3 gap-4 pt-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-yellow-300 dark:text-yellow-200">
//                       98%
//                     </div>
//                     <div className="text-sm text-orange-200 dark:text-orange-100">
//                       Efficiency
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-yellow-300 dark:text-yellow-200">
//                       12hr
//                     </div>
//                     <div className="text-sm text-orange-200 dark:text-orange-100">
//                       Runtime
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-yellow-300 dark:text-yellow-200">
//                       IP67
//                     </div>
//                     <div className="text-sm text-orange-200 dark:text-orange-100">
//                       Rating
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg dark:shadow-slate-900/30 border border-orange-100 dark:border-slate-700 hover:scale-105 hover:shadow-orange-100/20 dark:hover:shadow-orange-600/20 transition-all duration-300"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl flex items-center justify-center text-white shadow-lg">
//                       {feature.icon}
//                     </div>
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-200">
//                       {feature.title}
//                     </h3>
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="group bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-600/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border border-orange-400/20 dark:border-orange-500/30">
//                 <span>Explore More</span>
//                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//               </button>
//               <button className="group border-2 border-orange-500 dark:border-orange-600 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
//                 <Play className="w-5 h-5" />
//                 <span>Watch Demo</span>
//               </button>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="w-full lg:w-7/12">
//             <div
//               ref={imageRef}
//               className="relative group cursor-pointer"
//               onMouseMove={handleMouseMove}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {/* Image container with 3D effect */}
//               <div
//                 className="relative rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-900/50 transition-all duration-500"
//                 style={{
//                   transform: isHovered
//                     ? `perspective(1000px) rotateX(${
//                         (mousePosition.y - 0.5) * -5
//                       }deg) rotateY(${
//                         (mousePosition.x - 0.5) * 5
//                       }deg) scale(1.02)`
//                     : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
//                   boxShadow: isHovered
//                     ? "0 12px 48px 0 rgba(255, 140, 0, 0.15)"
//                     : "0 8px 32px 0 rgba(255, 140, 0, 0.08)",
//                 }}
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
//                   alt="Key Solar Light Product"
//                   className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 {/* Overlay gradient */}
//                 <div
//                   className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500"
//                   style={{
//                     opacity: isHovered ? 1 : 0,
//                   }}
//                 />
//                 {/* Floating elements */}
//                 <div
//                   className="absolute top-6 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-all duration-500"
//                   style={{
//                     opacity: isHovered ? 1 : 0,
//                     transform: isHovered ? "translateY(0)" : "translateY(10px)",
//                   }}
//                 >
//                   <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
//                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
//                     Active
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative elements */}
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 dark:from-orange-500/60 dark:to-yellow-500/60 rounded-full blur-xl opacity-20" />
//               <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 dark:from-yellow-500/60 dark:to-orange-500/60 rounded-full blur-xl opacity-20" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default KeyProduct;

"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Shield, Leaf, Star, Play } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Link from "next/link";

const KeyProduct = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        <circle cx="60" cy="60" r="30" fill="rgba(255, 213, 79, 0.3)" />
        <circle cx="60" cy="60" r="25" fill="#FFD54F" />
        <circle cx="60" cy="60" r="20" fill="#FFC107" />
        <circle cx="60" cy="60" r="15" fill="#FF9800" />
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

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-20 h-20 rounded-full border-2 border-orange-300/30 dark:border-orange-400/40 transition-all duration-1000 ${
            isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <div
          className={`absolute w-24 h-24 rounded-full border border-orange-200/20 dark:border-orange-300/30 transition-all duration-1000 delay-300 ${
            isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </div>
    </div>
  );

  return (
    <ScrollFadeIn>
      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 shadow-2xl dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-24 px-6 md:px-16 relative overflow-hidden text-gray-900 dark:text-white transition-colors duration-500"
      >
        <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 dark:from-orange-600/30 dark:to-yellow-600/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-600/30 dark:to-orange-600/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content with animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full lg:w-5/12 space-y-8"
            >
              <div
                className="relative bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white p-8 rounded-3xl shadow-2xl dark:shadow-slate-900/50 hover:shadow-orange-500/25 dark:hover:shadow-orange-600/30 transition-all duration-500 transform hover:scale-105 border border-orange-400/20 dark:border-orange-500/30"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full transition-transform duration-1000"
                    style={{
                      transform: isHovered ? "scale(1.5)" : "scale(1)",
                    }}
                  />
                  <div
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full transition-transform duration-1000"
                    style={{
                      transform: isHovered ? "scale(1.5)" : "scale(1)",
                      transitionDelay: "0.2s",
                    }}
                  />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="transition-transform duration-700"
                      style={{
                        transform: isHovered
                          ? "rotate(180deg) scale(1.1)"
                          : "rotate(0deg) scale(1)",
                      }}
                    >
                      <SolarIcon />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">
                        Our Key Product
                      </h2>
                      <div className="flex items-center gap-2 text-orange-200 dark:text-orange-100">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-sm font-medium">
                          Premium Solar Solution
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl leading-relaxed text-orange-50 dark:text-orange-100">
                    Experience the perfect fusion of design and efficiency. Our
                    solar light units are built to shine bright, last long, and
                    save energy — all while looking stunning in your space.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300 dark:text-yellow-200">
                        98%
                      </div>
                      <div className="text-sm text-orange-200 dark:text-orange-100">
                        Efficiency
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300 dark:text-yellow-200">
                        12hr
                      </div>
                      <div className="text-sm text-orange-200 dark:text-orange-100">
                        Runtime
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300 dark:text-yellow-200">
                        IP67
                      </div>
                      <div className="text-sm text-orange-200 dark:text-orange-100">
                        Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg dark:shadow-slate-900/30 border border-orange-100 dark:border-slate-700 hover:scale-105 hover:shadow-orange-100/20 dark:hover:shadow-orange-600/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-600/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border border-orange-400/20 dark:border-orange-500/30">
                  <Link href={"/Solarlink-Blogs"}>
                    <span>Explore More</span>
                  </Link>

                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="group border-2 border-orange-500 dark:border-orange-600 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>

            {/* Right Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full lg:w-7/12"
            >
              <div
                ref={imageRef}
                className="relative group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-900/50 transition-all duration-500"
                  style={{
                    transform: isHovered
                      ? `perspective(1000px) rotateX(${
                          (mousePosition.y - 0.5) * -5
                        }deg) rotateY(${
                          (mousePosition.x - 0.5) * 5
                        }deg) scale(1.02)`
                      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                    boxShadow: isHovered
                      ? "0 12px 48px 0 rgba(255, 140, 0, 0.15)"
                      : "0 8px 32px 0 rgba(255, 140, 0, 0.08)",
                  }}
                >
                  <img
                    src="/IMAGE2.jpg"
                    alt="Key Solar Light Product"
                    className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500"
                    style={{
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                  <div
                    className="absolute top-6 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-all duration-500"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? "translateY(0)"
                        : "translateY(10px)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </ScrollFadeIn>
  );
};

export default KeyProduct;
