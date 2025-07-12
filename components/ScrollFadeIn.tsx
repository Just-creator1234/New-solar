// components/animations/ScrollFadeIn.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  fromScale?: number;
  toScale?: number;
  fromOpacity?: number;
  toOpacity?: number;
}

const ScrollFadeIn = ({
  children,
  className = "",
  fromScale = 0.8,
  toScale = 1,
  fromOpacity = 0,
  toOpacity = 1,
}: ScrollFadeInProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // animates in when the component enters, out when it leaves
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [fromScale, toScale, toScale, fromScale]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [fromOpacity, toOpacity, toOpacity, fromOpacity]
  );

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;
