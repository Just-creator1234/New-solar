
"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AnimatedDividerWithCenter = () => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative origin-left w-full h-16 my-20 flex items-center justify-center"
    >
      {/* Glowing pulse background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 opacity-20 blur-md rounded-full animate-pulse" />

      {/* Divider line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-sunlink-orange-500)] via-[var(--color-energy-yellow)] to-[var(--color-sunlink-orange-500)] rounded-full" />

      {/* Centered icon and text */}
      <div className="relative z-10 px-6 py-1 bg-white rounded-full border border-yellow-300 shadow-md flex items-center gap-2">
        <Sparkles className="text-orange-500 w-5 h-5" />
        <span className="text-sm font-medium text-gray-800 tracking-wide uppercase">
          Let the Sun Power You
        </span>
      </div>
    </motion.div>
  );
};

export default AnimatedDividerWithCenter;
