"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Link from "next/link";

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
    return (
      <div className="w-full h-48 overflow-hidden relative">
        <div ref={containerRef} className="flex space-x-4 w-max">
          {[...images, ...images, ...images].map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: tileDelay + idx * 0.05,
                ease: "easeOut",
              }}
              className="flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Solar lighting solution ${idx + 1}`}
                width={144} // same as w-36
                height={176} // same as h-44
                className="w-36 h-44 object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
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

export default function DiagonalHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const images1 = [
    "/IMAGE2.jpg",
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE4.jpg",
    "/IMAGE1.jpg",
    "/IMAGE4.jpg", // fixed
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE4.jpg",
    "/IMAGE1.jpg",
  ];

  const images2 = [
    "/IMAGE4.jpg", // fixed
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE4.jpg",
    "/IMAGE1.jpg",
    "/IMAGE4.jpg", // fixed
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE4.jpg",
    "/IMAGE1.jpg",
  ];

  const images3 = [
    "/IMAGE4.jpg", // fixed
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE1.jpg",
    "/IMAGE1.jpg",
    "/IMAGE4.jpg", // fixed
    "/IMAGE2.jpg",
    "/IMAGE3.jpg",
    "/IMAGE1.jpg",
    "/IMAGE1.jpg",
  ];

  return (
    <ScrollFadeIn>
      <section
        className={`relative w-full rounded-t-2xl bg-gradient-to-br shadow-2xl from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 mt-10 mx-auto px-4 overflow-hidden text-gray-900 dark:text-white ${
          isMobile ? "min-h-[140vh] py-8" : "h-screen py-16"
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
                images={images1}
                duration={20}
                direction={1}
                tileDelay={0.2}
                isMobile={false}
              />
              <DiagonalSlider
                images={images2}
                duration={24}
                direction={-1}
                tileDelay={0.5}
                isMobile={false}
              />
              <DiagonalSlider
                images={images3}
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
          } flex-col items-center justify-center text-center space-y-8`}
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
                <span className="relative z-10">Get Free Quote</span>
              </button>
              <button className="group px-8 py-4 rounded-2xl font-semibold border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-600 bg-orange-100/20 dark:bg-orange-900/10 hover:scale-105 hover:shadow-md transition-all">
                Learn More →
              </button>
            </div>
          </motion.div>

          {/* Mobile Sliders */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full space-y-4 px-4"
          >
            <DiagonalSlider
              images={images1}
              duration={20}
              direction={1}
              tileDelay={0.2}
              isMobile={true}
            />
            <DiagonalSlider
              images={images2}
              duration={24}
              direction={-1}
              tileDelay={0.5}
              isMobile={true}
            />
            <DiagonalSlider
              images={images3}
              duration={28}
              direction={1}
              tileDelay={0.8}
              isMobile={true}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-orange-100/80 via-orange-50/40 to-transparent dark:from-gray-900/90 dark:via-gray-800/40" />
        </div>

        <div className="absolute top-8 right-8 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br from-orange-500 to-orange-700" />
        <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full opacity-10 bg-gradient-to-br from-orange-600 to-red-600" />
      </section>
    </ScrollFadeIn>
  );
}
