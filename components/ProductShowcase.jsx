// "use client";
// import { useState, useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Eye, Star } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const products = [
//   {
//     id: 1,
//     title: "Solar Lamp Series A",
//     description: "Compact solar lamp ideal for indoor use with 8hr runtime.",
//     image:
//       "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
//     price: "$49.99",
//     rating: 4.8,
//     features: ["8hr runtime", "USB charging", "Dimmer control"],
//   },
//   {
//     id: 2,
//     title: "Garden Light X2",
//     description: "Weatherproof garden light with auto-on dusk sensor.",
//     image:
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
//     price: "$79.99",
//     rating: 4.9,
//     features: ["Weatherproof", "Auto sensor", "LED technology"],
//   },
//   {
//     id: 3,
//     title: "Wall Mount Z",
//     description: "Sleek solar wall mount light with motion sensor.",
//     image:
//       "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
//     price: "$89.99",
//     rating: 4.7,
//     features: ["Motion sensor", "Wall mount", "360° rotation"],
//   },
//   {
//     id: 4,
//     title: "Pathway Pro",
//     description: "Professional-grade pathway lighting with smart controls.",
//     image:
//       "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop",
//     price: "$129.99",
//     rating: 4.9,
//     features: ["Smart controls", "App integration", "Weather resistant"],
//   },
//   {
//     id: 5,
//     title: "Deck Accent",
//     description: "Ambient deck lighting with color-changing capabilities.",
//     image:
//       "https://images.unsplash.com/photo-1493946740644-2d8a1a6aff?w=400&h=400&fit=crop",
//     price: "$64.99",
//     rating: 4.6,
//     features: ["Color changing", "Deck mount", "Remote control"],
//   },
// ];

// export default function ProductShowcase() {
//   const [activeProduct, setActiveProduct] = useState(products[0]);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const containerRef = useRef(null);
//   const imageRef = useRef(null);

//   const handleProductChange = (product) => {
//     if (product.id === activeProduct.id) return;

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setActiveProduct(product);
//       setIsTransitioning(false);
//     }, 200);
//   };

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width;
//     const y = (e.clientY - rect.top) / rect.height;

//     setMousePosition({ x, y });
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setMousePosition({ x: 0.5, y: 0.5 });
//   };

//   const nextProduct = () => {
//     const currentIndex = products.findIndex((p) => p.id === activeProduct.id);
//     const nextIndex = (currentIndex + 1) % products.length;
//     handleProductChange(products[nextIndex]);
//   };

//   const prevProduct = () => {
//     const currentIndex = products.findIndex((p) => p.id === activeProduct.id);
//     const prevIndex = (currentIndex - 1 + products.length) % products.length;
//     handleProductChange(products[prevIndex]);
//   };

//   return (
//     <section
//       id="product-showcase"
//       className="w-full min-h-screen shadow-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-20 px-4 overflow-hidden text-gray-900 dark:text-gray-100 transition-colors duration-300"
//     >
//       <style jsx>{`
//         :root {
//           --color-sky-light-700: #334155;
//           --color-sky-light-800: #1e293b;
//           --color-sky-light-900: #0f172a;
//         }

//         .dark-sky-700 {
//           background-color: var(--color-sky-light-700);
//         }

//         .dark-sky-800 {
//           background-color: var(--color-sky-light-800);
//         }

//         .dark-sky-900 {
//           background-color: var(--color-sky-light-900);
//         }

//         .dark-border-sky-700 {
//           border-color: var(--color-sky-light-700);
//         }

//         .dark-shadow-sky {
//           box-shadow: 0 8px 32px 0 rgba(51, 65, 85, 0.25);
//         }

//         .dark-text-sky-300 {
//           color: #cbd5e1;
//         }
//       `}</style>

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-5xl font-bold text-orange-400 dark:text-orange-300 mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-orange-300 dark:to-yellow-300 bg-clip-text transition-colors duration-300">
//             Premium Solar Collection
//           </h2>
//           <p className="text-xl text-orange-600 dark:text-orange-200 max-w-2xl mx-auto transition-colors duration-300">
//             Illuminate your space with our cutting-edge solar lighting solutions
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-12 gap-8 items-center">
//           {/* Left Thumbnails */}
//           <motion.div
//             initial={{ x: -40, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="col-span-2 space-y-4"
//           >
//             {products.map((product, index) => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{
//                   scale: 1.07,
//                   boxShadow: "0 8px 32px 0 rgba(255, 140, 0, 0.10)",
//                 }}
//                 className={`relative group cursor-pointer transition-all duration-300 ${
//                   activeProduct.id === product.id
//                     ? "scale-105 shadow-2xl shadow-orange-500/25 dark:shadow-orange-400/20"
//                     : "hover:scale-102 opacity-70 hover:opacity-100"
//                 }`}
//                 onClick={() => handleProductChange(product)}
//               >
//                 <div
//                   className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
//                     activeProduct.id === product.id
//                       ? "border-orange-500 dark:border-orange-400 shadow-lg shadow-orange-500/25 dark:shadow-orange-400/20"
//                       : "border-slate-600 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-400"
//                   }`}
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                 </div>
//                 {activeProduct.id === product.id && (
//                   <motion.div
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute -right-2 -top-2 w-6 h-6 bg-orange-500 dark:bg-orange-400 rounded-full flex items-center justify-center"
//                   >
//                     <Eye className="w-3 h-3 text-white dark:text-slate-900" />
//                   </motion.div>
//                 )}
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Center Product Display */}
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="col-span-8"
//           >
//             <div
//               ref={containerRef}
//               className="relative w-full aspect-square max-w-2xl mx-auto perspective-1000"
//               onMouseMove={handleMouseMove}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               {/* Main Product Image */}
//               <motion.div
//                 className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
//                   isHovered
//                     ? "shadow-orange-500/30 dark:shadow-orange-400/25"
//                     : "shadow-slate-900/50 dark:shadow-slate-800/60"
//                 }`}
//                 style={{
//                   transform: isHovered
//                     ? `rotateX(${(mousePosition.y - 0.5) * -10}deg) rotateY(${
//                         (mousePosition.x - 0.5) * 10
//                       }deg) scale(1.02)`
//                     : "rotateX(0deg) rotateY(0deg) scale(1)",
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 {/* Animated Background */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-yellow-500/20 dark:from-orange-400/15 dark:via-transparent dark:to-yellow-400/15 opacity-0 transition-opacity duration-700"
//                   animate={{
//                     opacity: isHovered ? 1 : 0,
//                     background: `radial-gradient(circle at ${
//                       mousePosition.x * 100
//                     }% ${
//                       mousePosition.y * 100
//                     }%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)`,
//                   }}
//                   transition={{ duration: 0.7 }}
//                 />
//                 {/* Product Image */}
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={activeProduct.id}
//                     ref={imageRef}
//                     src={activeProduct.image}
//                     alt={activeProduct.title}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.4 }}
//                     className={`w-full h-full object-cover transition-all duration-500 ${
//                       isTransitioning
//                         ? "opacity-0 scale-95"
//                         : "opacity-100 scale-100"
//                     }`}
//                   />
//                 </AnimatePresence>
//                 {/* Navigation Arrows */}
//                 <motion.button
//                   whileTap={{ scale: 1.15 }}
//                   onClick={prevProduct}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 dark:bg-slate-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-110"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </motion.button>
//                 <motion.button
//                   whileTap={{ scale: 1.15 }}
//                   onClick={nextProduct}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 dark:bg-slate-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-110"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </motion.button>
//                 {/* Product Info Overlay */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.7, delay: 0.2 }}
//                   className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-slate-900/90 dark:via-slate-900/50 dark:to-transparent p-8 text-white"
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-medium">
//                         {activeProduct.rating}
//                       </span>
//                     </div>
//                     <span className="text-2xl font-bold text-orange-400 dark:text-orange-300">
//                       {activeProduct.price}
//                     </span>
//                   </div>
//                   <h3 className="text-3xl font-bold mb-2">
//                     {activeProduct.title}
//                   </h3>
//                   <p className="text-slate-300 dark:text-slate-200 mb-4 text-lg">
//                     {activeProduct.description}
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {activeProduct.features.map((feature, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-orange-500/20 dark:bg-orange-400/20 backdrop-blur-sm rounded-full text-sm border border-orange-500/30 dark:border-orange-400/30"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Right Product Grid */}
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="col-span-2 space-y-4"
//           >
//             {products
//               .slice()
//               .reverse()
//               .map((product) => (
//                 <motion.div
//                   key={`right-${product.id}`}
//                   whileHover={{
//                     scale: 1.07,
//                     boxShadow: "0 8px 32px 0 rgba(255, 140, 0, 0.10)",
//                   }}
//                   className={`relative group cursor-pointer transition-all duration-300 ${
//                     activeProduct.id === product.id
//                       ? "scale-105 shadow-2xl shadow-orange-500/25 dark:shadow-orange-400/20"
//                       : "hover:scale-102 opacity-70 hover:opacity-100"
//                   }`}
//                   onClick={() => handleProductChange(product)}
//                 >
//                   <div
//                     className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
//                       activeProduct.id === product.id
//                         ? "border-orange-500 dark:border-orange-400 shadow-lg shadow-orange-500/25 dark:shadow-orange-400/20"
//                         : "border-slate-600 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-400"
//                     }`}
//                   >
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                   </div>
//                   {activeProduct.id === product.id && (
//                     <motion.div
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       exit={{ scale: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="absolute -left-2 -top-2 w-6 h-6 bg-orange-500 dark:bg-orange-400 rounded-full flex items-center justify-center"
//                     >
//                       <Eye className="w-3 h-3 text-white dark:text-slate-900" />
//                     </motion.div>
//                   )}
//                 </motion.div>
//               ))}
//           </motion.div>
//         </div>

//         {/* Product Indicators */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.5 }}
//           className="flex justify-center mt-12 space-x-3"
//         >
//           {products.map((product) => (
//             <motion.button
//               key={product.id}
//               onClick={() => handleProductChange(product)}
//               whileHover={{ scale: 1.2 }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 activeProduct.id === product.id
//                   ? "bg-orange-500 dark:bg-orange-400 w-8"
//                   : "bg-slate-600 dark:bg-slate-500 hover:bg-slate-400 dark:hover:bg-slate-400"
//               }`}
//             >
//               {/* Optional content inside button, or leave empty */}
//             </motion.button>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Star } from "lucide-react";
const products = [
  {
    id: 1,
    title: "Solar Lamp Series A",
    type: "Indoor Solar Lamp",
    description:
      "Compact solar lamp designed for indoor use, featuring energy-efficient LEDs and a dimmer control. Great for desks, bedrooms, and emergency lighting.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    price: "$49.99",
    originalPrice: "$59.99",
    rating: 4.8,
    features: ["8hr runtime", "USB charging", "Dimmer control"],
    power: "5W",
    efficiency: "18%",
    warranty: "1 year",
    inStock: true,
    stockCount: 12,
    specifications: {
      dimensions: "6 × 6 × 10 inches",
      weight: "1.2 lbs",
      battery: "2000mAh Li-ion",
      chargingTime: "6 hrs (sunlight)",
      mount: "Tabletop or wall-mount",
    },
  },
  {
    id: 2,
    title: "Garden Light X2",
    type: "Outdoor Garden Light",
    description:
      "Weatherproof garden light with LED technology, ideal for landscaping and pathways. Equipped with an automatic dusk-to-dawn sensor.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    price: "$79.99",
    originalPrice: "$89.99",
    rating: 4.9,
    features: ["Weatherproof", "Auto sensor", "LED technology"],
    power: "7W",
    efficiency: "20%",
    warranty: "2 years",
    inStock: true,
    stockCount: 8,
    specifications: {
      dimensions: "4 × 4 × 16 inches",
      weight: "2.1 lbs",
      sensor: "Dusk-to-dawn",
      material: "ABS + Aluminum",
      battery: "2500mAh NiMH",
    },
  },
  {
    id: 3,
    title: "Wall Mount Z",
    type: "Motion Wall Light",
    description:
      "Sleek and modern solar wall light with motion detection and a 360° adjustable head. Ideal for entrances and perimeter lighting.",
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    price: "$89.99",
    originalPrice: "$99.99",
    rating: 4.7,
    features: ["Motion sensor", "Wall mount", "360° rotation"],
    power: "8W",
    efficiency: "21%",
    warranty: "2 years",
    inStock: true,
    stockCount: 6,
    specifications: {
      dimensions: "5 × 3 × 11 inches",
      weight: "2.4 lbs",
      sensorRange: "120° / 20ft",
      battery: "3000mAh Li-ion",
      lightingModes: "Dim/Full/Motion",
    },
  },
  {
    id: 4,
    title: "Pathway Pro",
    type: "Smart Pathway Light",
    description:
      "Professional-grade pathway lighting with app integration and smart scheduling. Built to withstand tough outdoor environments.",
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop",
    price: "$129.99",
    originalPrice: "$149.99",
    rating: 4.9,
    features: ["Smart controls", "App integration", "Weather resistant"],
    power: "10W",
    efficiency: "22%",
    warranty: "3 years",
    inStock: true,
    stockCount: 10,
    specifications: {
      dimensions: "6 × 6 × 18 inches",
      weight: "3.5 lbs",
      connectivity: "Bluetooth / Wi-Fi",
      smartApp: "iOS / Android",
      waterproof: "IP65",
    },
  },
  {
    id: 5,
    title: "Deck Accent",
    type: "RGB Deck Light",
    description:
      "Subtle deck lighting with customizable RGB colors and remote control. Adds ambiance and safety to your outdoor space.",
    image:
      "https://images.unsplash.com/photo-1493946740644-2d8a1a6aff86?w=400&h=400&fit=crop",
    price: "$64.99",
    originalPrice: "$74.99",
    rating: 4.6,
    features: ["Color changing", "Deck mount", "Remote control"],
    power: "4W",
    efficiency: "19%",
    warranty: "1 year",
    inStock: false,
    stockCount: 0,
    specifications: {
      dimensions: "3 × 3 × 1 inches",
      weight: "0.8 lbs",
      battery: "1000mAh Li-ion",
      colors: "16 RGB presets",
      waterproof: "IP67",
    },
  },
];

// Component for the left slider
function LeftSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative w-full h-full">
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-4 h-4 rotate-90" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-4 h-4 rotate-90" />
      </button>

      {/* Slider container */}
      <div className="h-full overflow-hidden">
        <div
          className="flex flex-col transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateY(-${currentIndex * 20}%)`,
            height: `${products.length * 20}%`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full h-1/5 relative group"
            >
              <div className="w-full h-full p-1">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {product.rating}
                        </span>
                        <span className="text-sm font-bold text-orange-400 ml-auto">
                          {product.price}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold truncate">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Position indicator */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-orange-500 h-4"
                : "bg-slate-400 hover:bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Component for the right slider
function RightSlider() {
  const [currentIndex, setCurrentIndex] = useState(2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative w-full h-full">
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-4 h-4 rotate-90" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-4 h-4 rotate-90" />
      </button>

      {/* Slider container */}
      <div className="h-full overflow-hidden">
        <div
          className="flex flex-col transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateY(-${currentIndex * 20}%)`,
            height: `${products.length * 20}%`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full h-1/5 relative group"
            >
              <div className="w-full h-full p-1">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full min-h-[160px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {product.rating}
                        </span>
                        <span className="text-sm font-bold text-orange-400 ml-auto">
                          {product.price}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold truncate">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Position indicator */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-orange-500 h-4"
                : "bg-slate-400 hover:bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Main center product display
function CenterDisplay() {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const nextProduct = () => {
    const currentIndex = products.findIndex((p) => p.id === activeProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    setActiveProduct(products[nextIndex]);
  };

  const prevProduct = () => {
    const currentIndex = products.findIndex((p) => p.id === activeProduct.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setActiveProduct(products[prevIndex]);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-2xl mx-auto perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0.5, y: 0.5 });
        }}
      >
        {/* Main Product Image */}
        <div
          className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
            isHovered
              ? "shadow-orange-500/30 dark:shadow-orange-400/25"
              : "shadow-slate-900/50 dark:shadow-slate-800/60"
          }`}
          style={{
            transform: isHovered
              ? `rotateX(${(mousePosition.y - 0.5) * -10}deg) rotateY(${
                  (mousePosition.x - 0.5) * 10
                }deg) scale(1.02)`
              : "rotateX(0deg) rotateY(0deg) scale(1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated Background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-yellow-500/20 dark:from-orange-400/15 dark:via-transparent dark:to-yellow-400/15 opacity-0 transition-opacity duration-700"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at ${
                mousePosition.x * 100
              }% ${
                mousePosition.y * 100
              }%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)`,
            }}
          />

          {/* Product Image */}
          <img
            src={activeProduct.image}
            alt={activeProduct.title}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevProduct}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 dark:bg-slate-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProduct}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 dark:bg-slate-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Product Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-slate-900/90 dark:via-slate-900/50 dark:to-transparent p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {activeProduct.rating}
                </span>
              </div>
              <span className="text-2xl font-bold text-orange-400 dark:text-orange-300">
                {activeProduct.price}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{activeProduct.title}</h3>
            <p className="text-slate-300 dark:text-slate-200 mb-4 text-lg">
              {activeProduct.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeProduct.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/20 dark:bg-orange-400/20 backdrop-blur-sm rounded-full text-sm border border-orange-500/30 dark:border-orange-400/30"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setActiveProduct(product)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
              activeProduct.id === product.id
                ? "bg-orange-500 dark:bg-orange-400 w-8"
                : "bg-slate-600 dark:bg-slate-500 hover:bg-slate-400 dark:hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Main component
export default function ProductShowcase() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-20 px-4 overflow-hidden text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-orange-400 dark:text-orange-300 mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-orange-300 dark:to-yellow-300 bg-clip-text transition-colors duration-300">
            Premium Solar Collection
          </h2>
          <p className="text-xl text-orange-600 dark:text-orange-200 max-w-2xl mx-auto transition-colors duration-300">
            Illuminate your space with our cutting-edge solar lighting solutions
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 items-stretch">
          {/* Left Independent Slider */}
          <div className="col-span-2 h-full">
            <LeftSlider />
          </div>

          {/* Center Product Display */}
          <div className="col-span-8">
            <CenterDisplay />
          </div>

          {/* Right Independent Slider */}
          <div className="col-span-2 h-full">
            <RightSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
