"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import EnhancedProductModal from "@/components/EnhancedProductModal";
import Link from "next/link";

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
export default function DiagonalHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    // You can add additional logic here, like opening a modal
    console.log("Selected product:", product);
  };

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

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  return (
    <ScrollFadeIn>
      <section
        className={`relative w-full rounded-t-2xl bg-gradient-to-br shadow-2xl from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 mt-10 mx-auto px-4 overflow-hidden text-gray-900 dark:text-white ${
          isMobile ? "min-h-[100vh] py-8" : "h-screen py-16"
        }`}
      >
        {/* Desktop Layout */}
        <div className={`${isMobile ? "hidden" : "flex"} items-center h-full`}>
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
              We offer cutting-edge solar design, installation, and maintenance
              for homes and businesses. Seamlessly integrate renewable energy,
              reduce your bills, and power a sustainable future.
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
              premium solar lighting solutions. Efficient, elegant, and designed
              for the modern home.
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

        <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-orange-100/80 via-orange-50/40 to-transparent dark:from-gray-900/90 dark:via-gray-800/40" />
        </div>

        <div className="absolute top-8 right-8 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br from-orange-500 to-orange-700" />
        <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full opacity-10 bg-gradient-to-br from-orange-600 to-red-600" />
        {selectedProduct && (
          <EnhancedProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onFavoriteToggle={() => toggleFavorite(selectedProduct.id)}
          />
        )}
      </section>
    </ScrollFadeIn>
  );
}

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
      // Horizontal animation for mobile
      let scrollPosition = 0;
      const speed = 0.8;

      const animate = () => {
        scrollPosition += speed * direction;

        // Get the total width of content (including duplicated images)
        const totalWidth = container.scrollWidth;
        const visibleWidth = container.parentElement.clientWidth;
        const maxScroll = totalWidth - visibleWidth;

        // Reset position when reaching the end
        if (direction > 0 && scrollPosition >= maxScroll / 2) {
          scrollPosition = 0;
        } else if (direction < 0 && scrollPosition <= -maxScroll / 2) {
          scrollPosition = 0;
        }

        container.style.transform = `translateX(-${Math.abs(
          scrollPosition
        )}px)`;
        animationRef.current = requestAnimationFrame(animate);
      };

      // Start animation after a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 100);

      const handleMouseEnter = () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
      const handleMouseLeave = () => {
        animationRef.current = requestAnimationFrame(animate);
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
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
    return null; // Not used anymore for mobile
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
