// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import ScrollFadeIn from "@/components/ScrollFadeIn";
// import Link from "next/link";
// import EnhancedProductModal from "@/components/EnhancedProductModal";
// import { Heart } from "lucide-react";

// const ImageGrid = ({ images, isMobile = false, onImageClick }) => {
//   return (
//     <div className="grid grid-cols-2 gap-4 w-full px-4">
//       {images.slice(0, 4).map((src, idx) => (
//         <motion.div
//           key={idx}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{
//             duration: 0.6,
//             delay: idx * 0.1,
//             ease: "easeOut",
//           }}
//           whileHover={{ scale: 1.05 }}
//           className="relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer"
//           onClick={() => onImageClick(idx)}
//         >
//           <Image
//             src={src}
//             alt={`Solar lighting solution ${idx + 1}`}
//             fill
//             className="object-cover"
//             style={{
//               filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const DiagonalSlider = ({
//   images,
//   duration = 20,
//   direction = 1,
//   tileDelay = 0,
//   isMobile = false,
// }) => {
//   const containerRef = useRef(null);
//   const animationRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (isMobile) {
//       return; // Not used for mobile anymore
//     } else {
//       // Vertical animation for desktop
//       const scrollHeight = container.scrollHeight / 2;
//       let scrollPosition = 0;

//       const animate = () => {
//         scrollPosition += 0.8 * direction;
//         if (scrollPosition >= scrollHeight) scrollPosition = 0;
//         if (scrollPosition < 0) scrollPosition = scrollHeight;
//         container.style.transform = `translateY(-${scrollPosition}px)`;
//         animationRef.current = requestAnimationFrame(animate);
//       };

//       animationRef.current = requestAnimationFrame(animate);

//       const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
//       const handleMouseLeave = () => {
//         animationRef.current = requestAnimationFrame(animate);
//       };

//       container.addEventListener("mouseenter", handleMouseEnter);
//       container.addEventListener("mouseleave", handleMouseLeave);

//       return () => {
//         cancelAnimationFrame(animationRef.current);
//         container.removeEventListener("mouseenter", handleMouseEnter);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//       };
//     }
//   }, [duration, direction, isMobile]);

//   if (isMobile) {
//     return null;
//   }

//   return (
//     <div className="w-52 h-[230vh] overflow-hidden relative">
//       <div ref={containerRef} className="flex flex-col space-y-4">
//         {[...images, ...images].map((src, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: -80 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.8,
//               delay: tileDelay + idx * 0.13,
//               ease: "easeOut",
//             }}
//             className="px-2"
//           >
//             <img
//               src={src}
//               alt={`Solar lighting solution ${idx + 1}`}
//               className="w-full h-48 object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
//               style={{
//                 filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
//                 boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
//               }}
//             />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function DiagonalHeroSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [favorites, setFavorites] = useState([]);

//   const products = [
//     {
//       id: 1,
//       name: "300W Round Solar Ceiling Light",
//       category: "panels",
//       type: "Solar Panel JA-CL-01S300W",
//       power: "300W",
//       efficiency: "22.1%",
//       price: "$299",
//       originalPrice: "$349",
//       rating: 4.8,
//       reviews: 112,
//       warranty: "25 years",
//       inStock: true,
//       stockCount: 9,
//       image: "/IMAGE1.jpg",
//       features: [
//         "Easy installation",
//         "Weather Resistant",
//         "Can sustain multiple weather conditions",
//       ],
//       gradient: "from-blue-500 to-cyan-500",
//       description:
//         "Illuminate your space with the powerful and energy-efficient 300W LED, providing ample brightness for various applications",
//       specifications: {
//         dimensions: "79.1 × 39.1 × 1.4 inches",
//         weight: "44.1 lbs",
//         cells: "144 half-cut",
//         connector: "MC4",
//         frame: "Anodized aluminum",
//       },
//     },
//     {
//       id: 5,
//       name: "BrandCryfokt",
//       category: "commercial",
//       type: "Electric fan designFloor Fan",
//       power: "---",
//       efficiency: "23.2%",
//       price: "$24,999",
//       originalPrice: "$28,000",
//       rating: 4.9,
//       reviews: 36,
//       warranty: "30 years",
//       inStock: true,
//       stockCount: 2,
//       image: "/FAN2.jpg",
//       features: ["EFFECTIVE COOLING", "MULTIPLE USES", "WITH LITHIUM BATTERY"],
//       gradient: "from-indigo-500 to-blue-500",
//       description:
//         "This fan is solar power or charging dual use, the phone with USB, with small night light; The switching is delicate, quiet and comfortable, with multi function buttons",
//       specifications: {
//         modules: "64 x 390W",
//         controller: "‎Button Control",
//         gridSupport: "-------",
//         monitoring: "-----",
//         backup: "-----",
//       },
//     },
//     {
//       id: 10,
//       name: "Eversecu Solar Motion Sensor",
//       category: "residential",
//       type: "Wireless Floodlight IP66 Waterproof Security Camera",
//       power: "10W",
//       efficiency: "LED 180lm",
//       price: "$49",
//       originalPrice: "$59",
//       rating: 4.7,
//       reviews: 200,
//       warranty: "2 years",
//       inStock: true,
//       stockCount: 28,
//       image: "/CAM3.jpg",
//       features: ["Portable", "USB Charging", "12hr Runtime"],
//       gradient: "from-green-400 to-lime-500",
//       description:
//         "With 800 lumens and 8 LED spotlights, these solar lights provide exceptional brightness, effectively illuminating outdoor areas like porches and gardens.",
//       specifications: {
//         battery: "5000mAh",
//         brightness: "180 lumens",
//         ports: "USB-C",
//         runtime: "12 hours",
//         modes: "3 Brightness Levels",
//       },
//     },
//     {
//       id: 4,
//       name: "Solobesafe Outdoor Ceiling Lamp",
//       category: "panels",
//       type: "Flexible Panel",
//       power: "380W",
//       efficiency: "20.4%",
//       price: "$249",
//       originalPrice: "$279",
//       rating: 4.6,
//       reviews: 91,
//       warranty: "1 years",
//       inStock: false,
//       stockCount: 0,
//       image: "/IMAGE4.jpg",
//       features: ["Bendable", "Lightweight", "Marine Grade"],
//       gradient: "from-purple-500 to-pink-500",
//       description:
//         "✨ Elevate Your Outdoor Ambiance with Energy-Efficient Solar Lighting!",
//       specifications: {
//         thickness: "37cm x 34.5cm x 39.5cm",
//         weight: "11 lbs",
//         curvature: "30°",
//         junctionBox: "IP67 rated",
//         mounting: "PSE, RoHS, CE",
//       },
//     },
//   ];

//   const images = [
//     "/IMAGE1.jpg",
//     "/IMAGE2.jpg",
//     "/IMAGE3.jpg",
//     "/IMAGE4.jpg",
//     "/IMAGE1.jpg",
//     "/IMAGE2.jpg",
//     "/IMAGE3.jpg",
//     "/IMAGE4.jpg",
//   ];

//   const gridImages = ["/IMAGE1.jpg", "/FAN2.jpg", "/CAM3.jpg", "/IMAGE4.jpg"];

//   useEffect(() => {
//     setIsVisible(true);

//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleFavorite = (productId) => {
//     setFavorites((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const handleImageClick = (index) => {
//     setSelectedProduct(products[index]);
//   };

//   return (
//     <ScrollFadeIn>
//       <section
//         className={`relative w-full rounded-t-2xl bg-gradient-to-br shadow-2xl from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 mt-10 mx-auto px-4 overflow-hidden text-gray-900 dark:text-white ${
//           isMobile ? "min-h-[100vh] py-8" : "h-screen py-16"
//         }`}
//       >
//         {/* Desktop Layout */}
//         <div className={`${isMobile ? "hidden" : "flex"} items-center h-full`}>
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="w-full lg:w-1/2 z-10 space-y-4 text-center lg:text-left mb-6 lg:mb-0"
//           >
//             {/* Tagline */}
//             <div className="space-y-1">
//               <div className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-orange-300 dark:border-orange-700 bg-orange-100/20 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400">
//                 ✨ Sustainable Energy Solutions
//               </div>

//               {/* Heading */}
//               <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] font-bold leading-snug tracking-tight">
//                 <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
//                   Power Your Home
//                 </span>
//                 <br />
//                 <span className="text-gray-800 dark:text-white">
//                   with Solar Light
//                 </span>
//                 <br />
//                 <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
//                   Innovation
//                 </span>
//               </h1>
//             </div>

//             {/* Description */}
//             <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed font-medium">
//               We offer cutting-edge solar design, installation, and maintenance
//               for homes and businesses. Seamlessly integrate renewable energy,
//               reduce your bills, and power a sustainable future.
//             </p>

//             {/* Call to Action */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-2 items-center justify-center lg:justify-start">
//               <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all w-full sm:w-auto">
//                 <a href="#product-showcase" className="relative z-10">
//                   Our Product
//                 </a>
//               </button>

//               <Link
//                 href={"/Solarlink-Blogs"}
//                 className="group px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-600 bg-orange-100/20 dark:bg-orange-900/10 hover:scale-105 hover:shadow-md transition-all w-full sm:w-auto"
//               >
//                 Learn More →
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="w-1/2 h-full relative"
//           >
//             <div className="absolute -right-[100vh] -top-[30vh] w-[200vh] h-[200vh] rotate-[18deg] flex gap-3">
//               <DiagonalSlider
//                 images={images}
//                 duration={20}
//                 direction={1}
//                 tileDelay={0.2}
//                 isMobile={false}
//               />
//               <DiagonalSlider
//                 images={images}
//                 duration={24}
//                 direction={-1}
//                 tileDelay={0.5}
//                 isMobile={false}
//               />
//               <DiagonalSlider
//                 images={images}
//                 duration={28}
//                 direction={1}
//                 tileDelay={0.8}
//                 isMobile={false}
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Mobile Layout */}
//         <div
//           className={`${
//             isMobile ? "flex" : "hidden"
//           } flex-col items-center justify-center text-center space-y-8 py-8`}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="z-10 space-y-6 px-4 max-w-lg mx-auto"
//           >
//             <div className="space-y-4">
//               <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-orange-300 dark:border-orange-700 bg-orange-100/20 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400">
//                 ✨ Sustainable Energy Solutions
//               </div>
//               <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
//                 <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
//                   Power Your Home
//                 </span>
//                 <br />
//                 <span className="text-gray-800 dark:text-white">
//                   with Solar Light
//                 </span>
//                 <br />
//                 <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
//                   Innovation
//                 </span>
//               </h1>
//             </div>
//             <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-medium">
//               Transform your space into a sustainable energy hub with our
//               premium solar lighting solutions. Efficient, elegant, and designed
//               for the modern home.
//             </p>
//             <div className="flex flex-col gap-4 pt-4">
//               <button className="group relative px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all">
//                 <a href="#product-showcase" className="relative z-10">
//                   Our Product
//                 </a>
//               </button>
//               <Link
//                 href={"/Solarlink-Blogs"}
//                 className="group px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-600 bg-orange-100/20 dark:bg-orange-900/10 hover:scale-105 hover:shadow-md transition-all w-full sm:w-auto"
//               >
//                 Learn More →
//               </Link>
//             </div>
//           </motion.div>

//           {/* Mobile Image Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.8 }}
//             className="w-full"
//           >
//             <ImageGrid
//               images={gridImages}
//               isMobile={true}
//               onImageClick={handleImageClick}
//             />
//           </motion.div>
//         </div>

//         <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none">
//           <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-orange-100/80 via-orange-50/40 to-transparent dark:from-gray-900/90 dark:via-gray-800/40" />
//         </div>

//         <div className="absolute top-8 right-8 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br from-orange-500 to-orange-700" />
//         <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full opacity-10 bg-gradient-to-br from-orange-600 to-red-600" />
//       </section>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <EnhancedProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           isFavorite={favorites.includes(selectedProduct.id)}
//           onFavoriteToggle={() => toggleFavorite(selectedProduct.id)}
//         />
//       )}
//     </ScrollFadeIn>
//   );
// }

"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Link from "next/link";
import { Heart, X, ChevronRight, ChevronLeft } from "lucide-react";

// Mobile Product Modal Component
const MobileProductModal = ({ product, onClose, onNext, onPrev }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 w-full flex justify-between px-2 transform -translate-y-1/2">
          <button
            onClick={onPrev}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{product.type}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {product.price}
              </p>
              {product.originalPrice && (
                <p className="text-sm line-through text-gray-400">
                  {product.originalPrice}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Features
            </h4>
            <ul className="mt-2 space-y-1">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-6 w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Image Grid Component
const ImageGrid = ({ products, isMobile = false, onImageClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full px-4">
      {products.slice(0, 4).map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: idx * 0.1,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.05 }}
          className="relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          onClick={() => onImageClick(product)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            style={{
              filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
};

// Diagonal Slider Component
const DiagonalSlider = ({
  images,
  duration = 20,
  direction = 1,
  tileDelay = 0,
  isMobile = false,
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isMobile) {
      return; // Not used for mobile
    } else {
      // Vertical animation for desktop
      const scrollHeight = container.scrollHeight / 2;
      let scrollPosition = 0;

      const animate = () => {
        scrollPosition += 0.8 * direction;
        if (scrollPosition >= scrollHeight) scrollPosition = 0;
        if (scrollPosition < 0) scrollPosition = scrollHeight;
        container.style.transform = `translateY(-${scrollPosition}px)`;
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
      const handleMouseLeave = () => {
        animationRef.current = requestAnimationFrame(animate);
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cancelAnimationFrame(animationRef.current);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [duration, direction, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div className="w-52 h-[230vh] overflow-hidden relative">
      <div ref={containerRef} className="flex flex-col space-y-4">
        {[...images, ...images].map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: tileDelay + idx * 0.13,
              ease: "easeOut",
            }}
            className="px-2"
          >
            <img
              src={src}
              alt={`Solar lighting solution ${idx + 1}`}
              className="w-full h-48 object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function DiagonalHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const gridProducts = [
    {
      id: 1,
      name: "300W Round Solar Ceiling Light",
      category: "panels",
      type: "Solar Panel JA-CL-01S300W",
      power: "300W",
      efficiency: "22.1%",
      price: "$299",
      originalPrice: "$349",
      rating: 4.8,
      reviews: 112,
      warranty: "25 years",
      inStock: true,
      stockCount: 9,
      image: "/IMAGE1.jpg",
      features: [
        "Easy installation",
        "Weather Resistant",
        "Can sustain multiple weather conditions",
      ],
      gradient: "from-blue-500 to-cyan-500",
      description:
        "Illuminate your space with the powerful and energy-efficient 300W LED, providing ample brightness for various applications",
      specifications: {
        dimensions: "79.1 × 39.1 × 1.4 inches",
        weight: "44.1 lbs",
        cells: "144 half-cut",
        connector: "MC4",
        frame: "Anodized aluminum",
      },
    },
    {
      id: 5,
      name: "BrandCryfokt",
      category: "commercial",
      type: "Electric fan designFloor Fan",
      power: "---",
      efficiency: "23.2%",
      price: "$24,999",
      originalPrice: "$28,000",
      rating: 4.9,
      reviews: 36,
      warranty: "30 years",
      inStock: true,
      stockCount: 2,
      image: "/FAN2.jpg",
      features: ["EFFECTIVE COOLING", "MULTIPLE USES", "WITH LITHIUM BATTERY"],
      gradient: "from-indigo-500 to-blue-500",
      description:
        "This fan is solar power or charging dual use, the phone with USB, with small night light; The switching is delicate, quiet and comfortable, with multi function buttons",
      specifications: {
        modules: "64 x 390W",
        controller: "‎Button Control",
        gridSupport: "-------",
        monitoring: "-----",
        backup: "-----",
      },
    },
    {
      id: 10,
      name: "Eversecu Solar Motion Sensor",
      category: "residential",
      type: "Wireless Floodlight IP66 Waterproof Security Camera",
      power: "10W",
      efficiency: "LED 180lm",
      price: "$49",
      originalPrice: "$59",
      rating: 4.7,
      reviews: 200,
      warranty: "2 years",
      inStock: true,
      stockCount: 28,
      image: "/CAM3.jpg",
      features: ["Portable", "USB Charging", "12hr Runtime"],
      gradient: "from-green-400 to-lime-500",
      description:
        "With 800 lumens and 8 LED spotlights, these solar lights provide exceptional brightness, effectively illuminating outdoor areas like porches and gardens.",
      specifications: {
        battery: "5000mAh",
        brightness: "180 lumens",
        ports: "USB-C",
        runtime: "12 hours",
        modes: "3 Brightness Levels",
      },
    },
    {
      id: 4,
      name: "Solobesafe Outdoor Ceiling Lamp",
      category: "panels",
      type: "Flexible Panel",
      power: "380W",
      efficiency: "20.4%",
      price: "$249",
      originalPrice: "$279",
      rating: 4.6,
      reviews: 91,
      warranty: "1 years",
      inStock: false,
      stockCount: 0,
      image: "/IMAGE4.jpg",
      features: ["Bendable", "Lightweight", "Marine Grade"],
      gradient: "from-purple-500 to-pink-500",
      description:
        "✨ Elevate Your Outdoor Ambiance with Energy-Efficient Solar Lighting!",
      specifications: {
        thickness: "37cm x 34.5cm x 39.5cm",
        weight: "11 lbs",
        curvature: "30°",
        junctionBox: "IP67 rated",
        mounting: "PSE, RoHS, CE",
      },
    },
  ];

  const images = [
    "/IMAGE1.jpg",
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE4.jpg",
    "/IMAGE1.jpg",
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE4.jpg",
  ];

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageClick = (product) => {
    if (!isMobile) return; // Only show modal on mobile

    const index = gridProducts.findIndex((p) => p.id === product.id);
    setCurrentProductIndex(index);
    setSelectedProduct(product);
  };

  const handleNextProduct = () => {
    const nextIndex = (currentProductIndex + 1) % gridProducts.length;
    setCurrentProductIndex(nextIndex);
    setSelectedProduct(gridProducts[nextIndex]);
  };

  const handlePrevProduct = () => {
    const prevIndex =
      (currentProductIndex - 1 + gridProducts.length) % gridProducts.length;
    setCurrentProductIndex(prevIndex);
    setSelectedProduct(gridProducts[prevIndex]);
  };

  return (
    <>
      <ScrollFadeIn>
        <section
          className={`relative w-full rounded-t-2xl bg-gradient-to-br shadow-2xl from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 mt-10 mx-auto px-4 overflow-hidden text-gray-900 dark:text-white ${
            isMobile ? "min-h-[100vh] py-8" : "h-screen py-16"
          }`}
        >
          {/* Desktop Layout */}
          <div
            className={`${isMobile ? "hidden" : "flex"} items-center h-full`}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full lg:w-1/2 z-10 space-y-4 text-center lg:text-left mb-6 lg:mb-0"
            >
              {/* Tagline */}
              <div className="space-y-1">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-orange-300 dark:border-orange-700 bg-orange-100/20 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400">
                  ✨ Sustainable Energy Solutions
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] font-bold leading-snug tracking-tight">
                  <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
                    Power Your Home
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-white">
                    with Solar Light
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Innovation
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed font-medium">
                We offer cutting-edge solar design, installation, and
                maintenance for homes and businesses. Seamlessly integrate
                renewable energy, reduce your bills, and power a sustainable
                future.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 items-center justify-center lg:justify-start">
                <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all w-full sm:w-auto">
                  <a href="#product-showcase" className="relative z-10">
                    Our Product
                  </a>
                </button>

                <Link
                  href={"/Solarlink-Blogs"}
                  className="group px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-600 bg-orange-100/20 dark:bg-orange-900/10 hover:scale-105 hover:shadow-md transition-all w-full sm:w-auto"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-1/2 h-full relative"
            >
              <div className="absolute -right-[100vh] -top-[30vh] w-[200vh] h-[200vh] rotate-[18deg] flex gap-3">
                <DiagonalSlider
                  images={images}
                  duration={20}
                  direction={1}
                  tileDelay={0.2}
                  isMobile={false}
                />
                <DiagonalSlider
                  images={images}
                  duration={24}
                  direction={-1}
                  tileDelay={0.5}
                  isMobile={false}
                />
                <DiagonalSlider
                  images={images}
                  duration={28}
                  direction={1}
                  tileDelay={0.8}
                  isMobile={false}
                />
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div
            className={`${
              isMobile ? "flex" : "hidden"
            } flex-col items-center justify-center text-center space-y-8 py-8`}
          >
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="z-10 space-y-6 px-4 max-w-lg mx-auto"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-orange-300 dark:border-orange-700 bg-orange-100/20 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400">
                  ✨ Sustainable Energy Solutions
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
                    Power Your Home
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-white">
                    with Solar Light
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Innovation
                  </span>
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-medium">
                Transform your space into a sustainable energy hub with our
                premium solar lighting solutions. Efficient, elegant, and
                designed for the modern home.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <button className="group relative px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all">
                  <a href="#product-showcase" className="relative z-10">
                    Our Product
                  </a>
                </button>
                <Link
                  href={"/Solarlink-Blogs"}
                  className="group px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-600 bg-orange-100/20 dark:bg-orange-900/10 hover:scale-105 hover:shadow-md transition-all w-full sm:w-auto"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>

            {/* Mobile Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-full"
            >
              <ImageGrid
                products={gridProducts}
                isMobile={true}
                onImageClick={handleImageClick}
              />
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-orange-100/80 via-orange-50/40 to-transparent dark:from-gray-900/90 dark:via-gray-800/40" />
          </div>
          <div className="absolute top-8 right-8 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br from-orange-500 to-orange-700" />
          <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full opacity-10 bg-gradient-to-br from-orange-600 to-red-600" />
        </section>
      </ScrollFadeIn>

      {/* Mobile Product Modal - Only shows on mobile */}
      {isMobile && selectedProduct && (
        <MobileProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNext={handleNextProduct}
          onPrev={handlePrevProduct}
        />
      )}
    </>
  );
}
