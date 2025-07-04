"use client";
import { motion } from "framer-motion";
import {
  Sun,
  Wrench,
  Sparkles,
  Building2,
  TreePalm,
  Target,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: <Sun className="w-8 h-8 text-white" />,
    title: "Solar Installations",
    description:
      "Custom solar systems for homes, schools & businesses with lasting efficiency.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: <Wrench className="w-8 h-8 text-white" />,
    title: "Maintenance & Repairs",
    description:
      "On-demand service to keep your solar system performing at its best.",
    color: "from-yellow-600 to-orange-400",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-white" />,
    title: "Smart Solar Lighting",
    description:
      "Motion-sensitive, aesthetic lighting solutions for gardens, walls, & pathways.",
    color: "from-amber-600 to-yellow-500",
  },
  {
    icon: <TreePalm className="w-8 h-8 text-white" />,
    title: "Street & Garden Lighting",
    description: "Auto-sensing solar lights to brighten public spaces.",
    color: "from-green-600 to-lime-500",
  },
  {
    icon: <Building2 className="w-8 h-8 text-white" />,
    title: "Commercial Solutions",
    description: "Robust, scalable systems for shops and businesses.",
    color: "from-indigo-600 to-blue-500",
  },
  // {
  //   icon: <Target className="w-8 h-8 text-white" />,
  //   title: "Custom Solutions",
  //   description: "Need something unique? We’ll build a solar plan for it.",
  //   color: "from-purple-600 to-pink-500",
  // },
  {
    icon: <BarChart3 className="w-8 h-8 text-white" />,
    title: "Energy Audits",
    description: "We assess your energy usage and optimize your savings.",
    color: "from-sky-600 to-cyan-500",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function ServiceSection() {
  return (
    <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Our{" "}
          <span className="text-[--color-home-warm-900]">
            Solar Services
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`relative overflow-hidden rounded-2xl p-6 shadow-md bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-transform hover:scale-[1.02] group`}
            >
              {/* Softer decorative ring */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-40 pointer-events-none z-0" />
              {/* Softer glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-[rgba(255,255,255,0.08)] opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0" />
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-md mb-3 border-2 border-white/20 group-hover:scale-105 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-home-warm-900 mb-2 drop-shadow-xs">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mt-1 relative z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
