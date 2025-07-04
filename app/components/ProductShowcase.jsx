// "use client";
// import { useState } from "react";
// import gsap from "gsap";
// import { useRef } from "react";

// const products = [
//   {
//     id: 1,
//     title: "Solar Lamp Series A",
//     description: "Compact solar lamp ideal for indoor use with 8hr runtime.",
//     image: "/solar.png",
//   },
//   {
//     id: 2,
//     title: "Garden Light X2",
//     description: "Weatherproof garden light with auto-on dusk sensor.",
//     image: "/solar.png",
//   },
//   {
//     id: 3,
//     title: "Wall Mount Z",
//     description: "Sleek solar wall mount light with motion sensor.",
//     image: "/solar.png",
//   },
// ];

// export default function ProductShowcase() {
//   const [activeProduct, setActiveProduct] = useState(products[0]);
//   const bgRef = useRef(null);
//   const containerRef = useRef(null);

//   const handleEnter = () => {
//     gsap.to(bgRef.current, {
//       scale: 2,
//       opacity: 1,
//       duration: 1.2,
//       ease: "power2.out",
//     });
//   };

//   const handleLeave = () => {
//     gsap.to(bgRef.current, {
//       scale: 0,
//       opacity: 0,
//       duration: 1,
//       ease: "power2.inOut",
//     });

//     gsap.to(containerRef.current, {
//       rotateX: 0,
//       rotateY: 0,
//       duration: 0.6,
//       ease: "power3.out",
//     });
//   };

//   const handleMove = (e) => {
//     const bounds = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - bounds.left;
//     const y = e.clientY - bounds.top;

//     const rotateY = (x / bounds.width - 0.5) * 20;
//     const rotateX = (y / bounds.height - 0.5) * -20;

//     gsap.to(containerRef.current, {
//       rotateX,
//       rotateY,
//       transformPerspective: 1000,
//       transformOrigin: "center",
//       duration: 0.6,
//       ease: "power2.out",
//     });
//   };

//   const renderThumbnails = () => (
//     <div className="flex flex-col gap-4 overflow-x-auto">
//       {products.map((product) => (
//         <div
//           key={product.id}
//           className={`w-28 min-h-[7rem] rounded-xl border-2 overflow-hidden ${
//             activeProduct.id === product.id
//               ? "border-[var(--color-sunlink-orange-500)]"
//               : "border-transparent"
//           } hover:scale-105 transition cursor-pointer`}
//           onClick={() => setActiveProduct(product)}
//         >
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <section
//       id="product-showcase"
//       className="w-full py-10 px-4 bg-[--color-comfort-cream]"
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 items-start">
//         {/* Left thumbnails */}
//         <div className="col-span-2 flex flex-col items-center h-full justify-center  ">
//           {renderThumbnails()}
//         </div>

//         {/* Center preview */}
//         <div
//           className="relative w-full min-h-[20rem] overflow-hidden shadow col-span-8 rounded-full"
//           onMouseEnter={handleEnter}
//           onMouseLeave={handleLeave}
//         >
//           {/* Animated radial background */}
//           <div
//             ref={bgRef}
//             className="absolute inset-0 z-0 rounded-2xl"
//             style={{
//               background:
//                 "radial-gradient(circle, var(--color-home-warm-900) 0%, transparent 70%)",
//               transform: "scale(0)",
//               opacity: 0,
//               transition: "none",
//             }}
//           />

//           {/* Image layer */}
//           <div className="relative z-10 w-full h-full">
//             <img
//               src={activeProduct.image}
//               alt={activeProduct.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Right thumbnails */}
//         <div className="col-span-2 flex flex-col items-center justify-center  h-full">
//           {renderThumbnails()}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    title: "Solar Lamp Series A",
    description: "Compact solar lamp ideal for indoor use with 8hr runtime.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    price: "$49.99",
    rating: 4.8,
    features: ["8hr runtime", "USB charging", "Dimmer control"],
  },
  {
    id: 2,
    title: "Garden Light X2",
    description: "Weatherproof garden light with auto-on dusk sensor.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    price: "$79.99",
    rating: 4.9,
    features: ["Weatherproof", "Auto sensor", "LED technology"],
  },
  {
    id: 3,
    title: "Wall Mount Z",
    description: "Sleek solar wall mount light with motion sensor.",
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    price: "$89.99",
    rating: 4.7,
    features: ["Motion sensor", "Wall mount", "360° rotation"],
  },
  {
    id: 4,
    title: "Pathway Pro",
    description: "Professional-grade pathway lighting with smart controls.",
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop",
    price: "$129.99",
    rating: 4.9,
    features: ["Smart controls", "App integration", "Weather resistant"],
  },
  {
    id: 5,
    title: "Deck Accent",
    description: "Ambient deck lighting with color-changing capabilities.",
    image:
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=400&h=400&fit=crop",
    price: "$64.99",
    rating: 4.6,
    features: ["Color changing", "Deck mount", "Remote control"],
  },
];

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleProductChange = (product) => {
    if (product.id === activeProduct.id) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProduct(product);
      setIsTransitioning(false);
    }, 200);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const nextProduct = () => {
    const currentIndex = products.findIndex((p) => p.id === activeProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    handleProductChange(products[nextIndex]);
  };

  const prevProduct = () => {
    const currentIndex = products.findIndex((p) => p.id === activeProduct.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    handleProductChange(products[prevIndex]);
  };

  return (
    <section id="product-showcase" className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 px-4 overflow-hidden text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-orange-400 mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text ">
            Premium Solar Collection
          </h2>
          <p className="text-xl text-home-warm-600 max-w-2xl mx-auto">
            Illuminate your space with our cutting-edge solar lighting solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Thumbnails */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-2 space-y-4"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 8px 32px 0 rgba(255, 140, 0, 0.10)",
                }}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeProduct.id === product.id
                    ? "scale-105 shadow-2xl shadow-orange-500/25"
                    : "hover:scale-102 opacity-70 hover:opacity-100"
                }`}
                onClick={() => handleProductChange(product)}
              >
                <div
                  className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    activeProduct.id === product.id
                      ? "border-orange-500 shadow-lg shadow-orange-500/25"
                      : "border-slate-600 hover:border-slate-400"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                {activeProduct.id === product.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -right-2 -top-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Eye className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Center Product Display */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-8"
          >
            <div
              ref={containerRef}
              className="relative w-full aspect-square max-w-2xl mx-auto perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main Product Image */}
              <motion.div
                className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
                  isHovered ? "shadow-orange-500/30" : "shadow-slate-900/50"
                }`}
                style={{
                  transform: isHovered
                    ? `rotateX(${(mousePosition.y - 0.5) * -10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg) scale(1.02)`
                    : "rotateX(0deg) rotateY(0deg) scale(1)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-yellow-500/20 opacity-0 transition-opacity duration-700"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)`,
                  }}
                  transition={{ duration: 0.7 }}
                />
                {/* Product Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProduct.id}
                    ref={imageRef}
                    src={activeProduct.image}
                    alt={activeProduct.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isTransitioning
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  />
                </AnimatePresence>
                {/* Navigation Arrows */}
                <motion.button
                  whileTap={{ scale: 1.15 }}
                  onClick={prevProduct}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 1.15 }}
                  onClick={nextProduct}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
                {/* Product Info Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {activeProduct.rating}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-orange-400">
                      {activeProduct.price}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {activeProduct.title}
                  </h3>
                  <p className="text-slate-300 mb-4 text-lg">
                    {activeProduct.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm rounded-full text-sm border border-orange-500/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Product Grid */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-2 space-y-4"
          >
            {products
              .slice()
              .reverse()
              .map((product) => (
                <motion.div
                  key={`right-${product.id}`}
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0 8px 32px 0 rgba(255, 140, 0, 0.10)",
                  }}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    activeProduct.id === product.id
                      ? "scale-105 shadow-2xl shadow-orange-500/25"
                      : "hover:scale-102 opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => handleProductChange(product)}
                >
                  <div
                    className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      activeProduct.id === product.id
                        ? "border-orange-500 shadow-lg shadow-orange-500/25"
                        : "border-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {activeProduct.id === product.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -left-2 -top-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Eye className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
          </motion.div>
        </div>

        {/* Product Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center mt-12 space-x-3"
        >
          {products.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => handleProductChange(product)}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeProduct.id === product.id
                  ? "bg-orange-500 w-8"
                  : "bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
