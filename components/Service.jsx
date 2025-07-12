// "use client";
// import { motion } from "framer-motion";
// import {
//   Sun,
//   Wrench,
//   Sparkles,
//   Building2,
//   TreePalm,
//   Target,
//   BarChart3,
// } from "lucide-react";

// const services = [
//   {
//     icon: <Sun className="w-8 h-8 text-white" />,
//     title: "Solar Installations",
//     description:
//       "Custom solar systems for homes, schools & businesses with lasting efficiency.",
//     color: "from-orange-500 to-amber-500",
//   },
//   {
//     icon: <Wrench className="w-8 h-8 text-white" />,
//     title: "Maintenance & Repairs",
//     description:
//       "On-demand service to keep your solar system performing at its best.",
//     color: "from-yellow-600 to-orange-400",
//   },
//   {
//     icon: <Sparkles className="w-8 h-8 text-white" />,
//     title: "Smart Solar Lighting",
//     description:
//       "Motion-sensitive, aesthetic lighting solutions for gardens, walls, & pathways.",
//     color: "from-amber-600 to-yellow-500",
//   },
//   {
//     icon: <TreePalm className="w-8 h-8 text-white" />,
//     title: "Street & Garden Lighting",
//     description: "Auto-sensing solar lights to brighten public spaces.",
//     color: "from-green-600 to-lime-500",
//   },
//   {
//     icon: <Building2 className="w-8 h-8 text-white" />,
//     title: "Commercial Solutions",
//     description: "Robust, scalable systems for shops and businesses.",
//     color: "from-indigo-600 to-blue-500",
//   },
//   {
//     icon: <BarChart3 className="w-8 h-8 text-white" />,
//     title: "Energy Audits",
//     description: "We assess your energy usage and optimize your savings.",
//     color: "from-sky-600 to-cyan-500",
//   },
// ];

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };

// export default function ServiceSection() {
//   return (
//     <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 transition-colors duration-300">
//           Our{" "}
//           <span className=" text-orange-400 dark:text-orange-400">
//             Solar Services
//           </span>
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, i) => (
//             <motion.div
//               key={i}
//               custom={i}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className={`relative overflow-hidden rounded-2xl p-6 shadow-md bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:shadow-lg dark:hover:shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02] group`}
//             >
//               {/* Softer decorative ring */}
//               <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-white/20 dark:from-slate-600/20 to-transparent rounded-full blur-xl opacity-40 pointer-events-none z-0" />
//               {/* Softer glow on hover */}
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-[rgba(255,255,255,0.08)] dark:from-slate-700/0 dark:to-slate-600/10 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0" />
//               <div className="flex items-center gap-3 relative z-10">
//                 <div
//                   className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-md mb-3 border-2 border-white/20 dark:border-slate-700/30 group-hover:scale-105 transition-transform duration-300`}
//                 >
//                   {service.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-2 drop-shadow-xs transition-colors duration-300">
//                   {service.title}
//                 </h3>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mt-1 relative z-10 transition-colors duration-300">
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";
import ScrollFadeIn from "@/components/ScrollFadeIn";
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
  {
    icon: <BarChart3 className="w-8 h-8 text-white" />,
    title: "Energy Audits",
    description: "We assess your energy usage and optimize your savings.",
    color: "from-sky-600 to-cyan-500",
  },
];

// Container animation with staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Card animation with diagonal cascade effect
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    x: -30,
    scale: 0.8,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

// Icon animation with separate timing
const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      delay: 0.2,
    },
  },
};

// Text animation with different delay
const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};

export default function ServiceSection() {
  return (
    <ScrollFadeIn>
      <section id="services" className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 shadow-2xl to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 transition-colors duration-300"
          >
            Our{" "}
            <span className=" text-orange-400 dark:text-orange-400">
              Solar Services
            </span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className={`relative overflow-hidden rounded-2xl p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 transition-all duration-300 group cursor-pointer`}
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                whileHoverStyle={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                {/* Enhanced decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-white/20 dark:from-slate-600/20 to-transparent rounded-full blur-xl opacity-40 pointer-events-none z-0" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-[rgba(255,255,255,0.08)] dark:from-slate-700/0 dark:to-slate-600/10 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0"
                />

                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    variants={iconVariants}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 },
                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-md mb-3 border-2 border-white/20 dark:border-slate-700/30 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </motion.div>

                  <motion.h3
                    variants={textVariants}
                    className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-2 drop-shadow-xs transition-colors duration-300"
                  >
                    {service.title}
                  </motion.h3>
                </div>

                <motion.p
                  variants={textVariants}
                  className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mt-1 relative z-10 transition-colors duration-300"
                >
                  {service.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
