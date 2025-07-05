"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const DiagonalSlider = ({
  images,
  duration = 20,
  direction = 1,
  tileDelay = 0,
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
  }, [duration, direction]);

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

export default function DiagonalHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const images1 = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
  ];

  const images2 = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
  ];

  const images3 = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
  ];

  return (
    <section className="relative w-full rounded-t-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 mt-10 h-screen mx-auto px-4 overflow-hidden flex items-center py-16 text-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-1/2 z-10 space-y-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-orange-300 dark:border-orange-700 bg-orange-100/20 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400">
            ✨ Sustainable Energy Solutions
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
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
        <p className="text-gray-600 dark:text-gray-300 max-w-lg text-lg leading-relaxed font-medium">
          Transform your space into a sustainable energy hub with our premium
          solar lighting solutions. Efficient, elegant, and designed for the
          modern home.
        </p>
        <div className="flex gap-4 pt-4">
          <button className="group relative px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all">
            <span className="relative z-10">Get Free Quote</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <button className="group px-8 py-4 rounded-2xl font-semibold border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-600 bg-orange-100/20 dark:bg-orange-900/10 hover:scale-105 hover:shadow-md transition-all">
            Learn More →
          </button>
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
            images={images1}
            duration={20}
            direction={1}
            tileDelay={0.2}
          />
          <DiagonalSlider
            images={images2}
            duration={24}
            direction={-1}
            tileDelay={0.5}
          />
          <DiagonalSlider
            images={images3}
            duration={28}
            direction={1}
            tileDelay={0.8}
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-orange-100/80 via-orange-50/40 to-transparent dark:from-gray-900/90 dark:via-gray-800/40" />
      </div>

      <div className="absolute top-8 right-8 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br from-orange-500 to-orange-700" />
      <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full opacity-10 bg-gradient-to-br from-orange-600 to-red-600" />
    </section>
  );
}
