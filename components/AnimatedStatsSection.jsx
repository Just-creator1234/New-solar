"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Home, Zap, TrendingUp, Award, Leaf } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Link from "next/link";

const AnimatedStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounter = (id, target, duration, delay = 0) => {
      const el = document.getElementById(id);
      if (!el) return;

      let start = 0;
      const increment = target / (duration * 60);

      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(start).toLocaleString();
          }
        }, 16);
      }, delay);

      return () => clearTimeout(timer);
    };

    animateCounter("stat-customers", 2500, 2.5);
    animateCounter("stat-homes", 320, 2.5, 400);
    animateCounter("stat-energy", 850, 2.5, 800);
    animateCounter("stat-satisfaction", 98, 2.5, 1200);
  }, [isVisible]);

  const stats = [
    {
      id: "stat-customers",
      label: "Happy Customers",
      icon: <Users className="w-8 h-8" />,
      suffix: "+",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Worldwide",
    },
    {
      id: "stat-homes",
      label: "Homes Illuminated",
      icon: <Home className="w-8 h-8" />,
      suffix: "+",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Globally",
    },
    {
      id: "stat-energy",
      label: "Clean Energy Generated",
      icon: <Zap className="w-8 h-8" />,
      suffix: "kW",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      description: "Daily",
    },
    {
      id: "stat-satisfaction",
      label: "Customer Satisfaction",
      icon: <Award className="w-8 h-8" />,
      suffix: "%",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Rating",
    },
  ];

  return (
    <ScrollFadeIn>
      <section
        ref={sectionRef}
        className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50  dark:from-sky-light-900 dark:via-sky-light-800 dark:to-sky-light-700 py-20 px-4 relative overflow-hidden transition-colors shadow-2xl duration-500"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-orange-200 to-yellow-200 dark:from-orange-600/30 dark:to-yellow-600/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-600/30 dark:to-orange-600/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full font-medium mb-4 border border-orange-200/50 dark:border-orange-700/50">
              <TrendingUp className="w-4 h-4" />
              <span>Our Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Lighting Up Lives
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-yellow-400">
                Across the Globe
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've transformed their
              spaces with our innovative solar lighting solutions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/50 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "forwards",
                }}
              >
                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${stat.color} blur-xl`}
                />

                {/* Icon container */}
                <div
                  className={`relative w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 border border-white/20 dark:border-gray-600/30`}
                >
                  <div
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.icon}
                  </div>

                  {/* Animated ring */}
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-all duration-500 animate-spin-slow"
                    style={{
                      borderImage: `linear-gradient(45deg, transparent, currentColor, transparent) 1`,
                    }}
                  />
                </div>

                {/* Counter */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span
                      id={stat.id}
                      className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
                    >
                      0
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold text-gray-600 dark:text-gray-300">
                      {stat.suffix}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {stat.label}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {stat.description}
                  </p>
                </div>

                {/* Animated particles */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-orange-400 dark:bg-orange-300 rounded-full animate-bounce shadow-lg" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="w-1.5 h-1.5 bg-yellow-400 dark:bg-yellow-300 rounded-full animate-bounce shadow-lg"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-600 dark:to-yellow-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-600/30 transition-all duration-300 hover:scale-105 cursor-pointer border border-orange-400/20 dark:border-orange-500/30">
              <Leaf className="w-5 h-5" />
              <Link href={"https://facebook.com/sunlinksolarenterprise"}>
                <span>Join the Solar Revolution</span>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }

          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </section>
    </ScrollFadeIn>
  );
};

export default AnimatedStatsSection;
