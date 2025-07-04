"use client";
import { motion } from "framer-motion";

const AnimatedDivider = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="h-1 my-16 bg-gradient-to-r from-[var(--color-sunlink-orange-500)] via-[var(--color-energy-yellow)] to-[var(--color-sunlink-orange-500)] rounded-full shadow-md"
    />
  );
};

export default AnimatedDivider;
