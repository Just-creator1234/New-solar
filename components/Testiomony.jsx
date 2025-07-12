// "use client";
// import { motion } from "framer-motion";

// const testimonials = [
//   {
//     name: "Ama Boateng",
//     quote:
//       "Sunlink turned my dark evenings into peaceful nights. Their installation was smooth and their support, top-notch!",
//     location: "Cape Coast",
//     audio: "/audio/ama-boateng.mp3",
//   },
//   {
//     name: "Kwame Mensah",
//     quote:
//       "I never imagined solar could look this good. My garden lights up beautifully every evening without any bills.",
//     location: "Kumasi",
//     audio: "/audio/ama-boateng.mp3",
//   },
//   {
//     name: "Esi Armah",
//     quote:
//       "Efficient, reliable, and truly transformative. I recommend Sunlink to everyone I know!",
//     location: "Accra",
//     audio: "/audio/ama-boateng.mp3",
//   },
// ];

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };

// export default function TestimonialSection() {
//   return (
//     <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
//           What Our{" "}
//           <span className=" text-orange-400 dark:text-orange-400">
//             Customers Say
//           </span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((t, i) => {
//             return (
//               <motion.div
//                 key={i}
//                 custom={i}
//                 initial="hidden"
//                 whileInView="visible"
//                 whileHover={{
//                   scale: 1.03,
//                   boxShadow: "0px 12px 25px rgba(255, 166, 0, 0.25)",
//                   transition: { duration: 0.4, ease: "easeOut" },
//                 }}
//                 viewport={{ once: true, amount: 0.4 }}
//                 variants={cardVariants}
//                 className="relative bg-white/60 dark:bg-gradient-to-br dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/30 backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all duration-500 overflow-hidden group"
//               >
//                 <motion.div
//                   className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-60 rounded-3xl transition-opacity duration-700 blur-2xl"
//                   style={{
//                     background:
//                       "radial-gradient(circle at center, rgba(255,123,0,0.4), transparent 60%)",
//                   }}
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 0.2 }}
//                   viewport={{ once: true, amount: 0.4 }}
//                   transition={{ delay: i * 0.2, duration: 0.8 }}
//                 />
//                 {/* Dark mode accent glow */}
//                 <motion.div
//                   className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent dark:block hidden rounded-t-3xl"
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   viewport={{ once: true, amount: 0.4 }}
//                   transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
//                 />
//                 {/* Subtle inner glow for dark mode */}
//                 <div className="absolute inset-0 rounded-3xl dark:bg-gradient-to-br dark:from-orange-400/8 dark:via-transparent dark:to-orange-400/15 hidden dark:block" />
//                 <div className="relative z-10 flex flex-col justify-center h-[320px] px-4 py-6">
//                   <div className="space-y-4 text-center">
//                     <div className="text-5xl text-[--color-home-warm-900] dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
//                       "
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-100 italic leading-relaxed font-medium">{`"${t.quote}"`}</p>

//                     {/* Avatar Section */}
//                     <div className="flex justify-center my-4">
//                       <div className="relative">
//                         {t.avatar ? (
//                           <img
//                             src={t.avatar}
//                             alt={`${t.name} avatar`}
//                             className="w-16 h-16 rounded-full object-cover border-2 border-orange-300/50 dark:border-orange-400/60 shadow-lg dark:shadow-orange-400/20"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-400/40 dark:to-orange-500/60 border-2 border-orange-300/50 dark:border-orange-400/60 shadow-lg dark:shadow-orange-400/20 flex items-center justify-center">
//                             <span className="text-white dark:text-orange-100 font-semibold text-lg">
//                               {t.name.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="text-orange-600 font-semibold text-lg dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
//                       {t.name}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-orange-200/90 font-medium">
//                       {t.location}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// const testimonials = [
//   {
//     name: "Ama Boateng",
//     quote:
//       "Sunlink turned my dark evenings into peaceful nights. Their installation was smooth and their support, top-notch!",
//     location: "Cape Coast",
//     audio: "/audio/ama-boateng.mp3",
//   },
//   {
//     name: "Kwame Mensah",
//     quote:
//       "I never imagined solar could look this good. My garden lights up beautifully every evening without any bills.",
//     location: "Kumasi",
//     audio: "/audio/ama-boateng.mp3",
//   },
//   {
//     name: "Esi Armah",
//     quote:
//       "Efficient, reliable, and truly transformative. I recommend Sunlink to everyone I know!",
//     location: "Accra",
//     audio: "/audio/ama-boateng.mp3",
//   },
// ];

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };

// // Animation positions for the floating text
// const floatingTextPositions = [
//   { top: "15%", left: "5%" },
//   { top: "25%", right: "5%" },
//   { bottom: "20%", left: "8%" },
//   { bottom: "15%", right: "8%" },
//   { top: "35%", left: "3%" },
//   { top: "45%", right: "3%" },
// ];

// export default function TestimonialSection() {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors relative overflow-hidden">
//       {/* Floating text animation */}
//       <AnimatePresence>
//         {hoveredCard !== null && (
//           <motion.div
//             key={hoveredCard}
//             initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               rotate: 0,
//               transition: { duration: 0.5, ease: "easeOut" },
//             }}
//             exit={{
//               opacity: 0,
//               scale: 0.8,
//               rotate: 5,
//               transition: { duration: 0.3, ease: "easeIn" },
//             }}
//             className="absolute z-20 pointer-events-none"
//             style={
//               floatingTextPositions[hoveredCard % floatingTextPositions.length]
//             }
//           >
//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//                 rotate: [0, 2, -2, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="relative"
//             >
//               <div className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 dark:from-orange-500 dark:via-amber-500 dark:to-yellow-500 bg-clip-text text-transparent font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg">
//                 These words are gold to us
//               </div>
//               {/* Subtle glow effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-yellow-400/20 dark:from-orange-500/30 dark:via-amber-500/30 dark:to-yellow-500/30 blur-sm -z-10 rounded-lg" />
//               {/* Sparkle effect */}
//               <motion.div
//                 animate={{
//                   scale: [0.8, 1.2, 0.8],
//                   opacity: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 dark:bg-yellow-300 rounded-full shadow-lg"
//               />
//               <motion.div
//                 animate={{
//                   scale: [1.2, 0.8, 1.2],
//                   opacity: [0.3, 0.8, 0.3],
//                 }}
//                 transition={{
//                   duration: 2.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 0.5,
//                 }}
//                 className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 dark:bg-orange-300 rounded-full shadow-lg"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-6xl mx-auto text-center relative z-10">
//         <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
//           What Our{" "}
//           <span className=" text-orange-400 dark:text-orange-400">
//             Customers Say
//           </span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((t, i) => {
//             return (
//               <motion.div
//                 key={i}
//                 custom={i}
//                 initial="hidden"
//                 whileInView="visible"
//                 whileHover={{
//                   scale: 1.03,
//                   boxShadow: "0px 12px 25px rgba(255, 166, 0, 0.25)",
//                   transition: { duration: 0.4, ease: "easeOut" },
//                 }}
//                 viewport={{ once: true, amount: 0.4 }}
//                 variants={cardVariants}
//                 onMouseEnter={() => setHoveredCard(i)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 className="relative bg-white/60 dark:bg-gradient-to-br dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/30 backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all duration-500 overflow-hidden group"
//               >
//                 <motion.div
//                   className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-60 rounded-3xl transition-opacity duration-700 blur-2xl"
//                   style={{
//                     background:
//                       "radial-gradient(circle at center, rgba(255,123,0,0.4), transparent 60%)",
//                   }}
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 0.2 }}
//                   viewport={{ once: true, amount: 0.4 }}
//                   transition={{ delay: i * 0.2, duration: 0.8 }}
//                 />
//                 {/* Dark mode accent glow */}
//                 <motion.div
//                   className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent dark:block hidden rounded-t-3xl"
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   viewport={{ once: true, amount: 0.4 }}
//                   transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
//                 />
//                 {/* Subtle inner glow for dark mode */}
//                 <div className="absolute inset-0 rounded-3xl dark:bg-gradient-to-br dark:from-orange-400/8 dark:via-transparent dark:to-orange-400/15 hidden dark:block" />
//                 <div className="relative z-10 flex flex-col justify-center h-[320px] px-4 py-6">
//                   <div className="space-y-4 text-center">
//                     <div className="text-5xl text-[--color-home-warm-900] dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
//                       "
//                     </div>
//                     <p className="text-gray-700 dark:text-gray-100 italic leading-relaxed font-medium">{`"${t.quote}"`}</p>

//                     {/* Avatar Section */}
//                     <div className="flex justify-center my-4">
//                       <div className="relative">
//                         {t.avatar ? (
//                           <img
//                             src={t.avatar}
//                             alt={`${t.name} avatar`}
//                             className="w-16 h-16 rounded-full object-cover border-2 border-orange-300/50 dark:border-orange-400/60 shadow-lg dark:shadow-orange-400/20"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-400/40 dark:to-orange-500/60 border-2 border-orange-300/50 dark:border-orange-400/60 shadow-lg dark:shadow-orange-400/20 flex items-center justify-center">
//                             <span className="text-white dark:text-orange-100 font-semibold text-lg">
//                               {t.name.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="text-orange-600 font-semibold text-lg dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
//                       {t.name}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-orange-200/90 font-medium">
//                       {t.location}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const testimonials = [
  {
    name: "Ama Boateng",
    quote:
      "Sunlink turned my dark evenings into peaceful nights. Their installation was smooth and their support, top-notch!",
    location: "Cape Coast",
    audio: "/audio/ama-boateng.mp3",
  },
  {
    name: "Kwame Mensah",
    quote:
      "I never imagined solar could look this good. My garden lights up beautifully every evening without any bills.",
    location: "Kumasi",
    audio: "/audio/ama-boateng.mp3",
  },
  {
    name: "Esi Armah",
    quote:
      "Efficient, reliable, and truly transformative. I recommend Sunlink to everyone I know!",
    location: "Accra",
    audio: "/audio/ama-boateng.mp3",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// Animation positions for the floating text
const floatingTextPositions = [
  { top: "15%", left: "5%" },
  { top: "25%", right: "5%" },
  { bottom: "20%", left: "8%" },
  { bottom: "15%", right: "8%" },
  { top: "35%", left: "3%" },
  { top: "45%", right: "3%" },
];

// Array of different texts for variation
const floatingTexts = [
  "These words are gold to us",
  "We are happy to serve",
  "We are happy you are satisfied with our product",
  "Your feedback lights up our day",
  "Customer satisfaction is our priority",
  "Thank you for trusting Sunlink",
  "Your success is our success",
  "We value your testimonial",
];

export default function TestimonialSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const handleCardHover = (cardIndex) => {
    setHoveredCard(cardIndex);
    // Generate a random text index when hovering
    setCurrentTextIndex(Math.floor(Math.random() * floatingTexts.length));
  };

  return (
    <ScrollFadeIn>
      <section className="py-10 px-6 bg-gradient-to-br shadow-2xs from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors relative overflow-hidden">
        {/* Floating text animation */}
        <AnimatePresence>
          {hoveredCard !== null && (
            <motion.div
              key={hoveredCard}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotate: 5,
                transition: { duration: 0.3, ease: "easeIn" },
              }}
              className="absolute z-20 pointer-events-none"
              style={
                floatingTextPositions[
                  hoveredCard % floatingTextPositions.length
                ]
              }
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 dark:from-orange-500 dark:via-amber-500 dark:to-yellow-500 bg-clip-text text-transparent font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                  {floatingTexts[currentTextIndex]}
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-yellow-400/20 dark:from-orange-500/30 dark:via-amber-500/30 dark:to-yellow-500/30 blur-sm -z-10 rounded-lg" />
                {/* Sparkle effect */}
                <motion.div
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 dark:bg-yellow-300 rounded-full shadow-lg"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 dark:bg-orange-300 rounded-full shadow-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
            What Our{" "}
            <span className=" text-orange-400 dark:text-orange-400">
              Customers Say
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => {
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 12px 25px rgba(255, 166, 0, 0.25)",
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  variants={cardVariants}
                  onMouseEnter={() => handleCardHover(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative bg-white/60 dark:bg-gradient-to-br dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/30 backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all duration-500 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-60 rounded-3xl transition-opacity duration-700 blur-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255,123,0,0.4), transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                  />
                  {/* Dark mode accent glow */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent dark:block hidden rounded-t-3xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                  />
                  {/* Subtle inner glow for dark mode */}
                  <div className="absolute inset-0 rounded-3xl dark:bg-gradient-to-br dark:from-orange-400/8 dark:via-transparent dark:to-orange-400/15 hidden dark:block" />
                  <div className="relative z-10 flex flex-col justify-center h-[320px] px-4 py-6">
                    <div className="space-y-4 text-center">
                      <div className="text-5xl text-[--color-home-warm-900] dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
                        "
                      </div>
                      <p className="text-gray-700 dark:text-gray-100 italic leading-relaxed font-medium">{`"${t.quote}"`}</p>

                      {/* Avatar Section */}
                      <div className="flex justify-center my-4">
                        <div className="relative">
                          {t.avatar ? (
                            <img
                              src={t.avatar}
                              alt={`${t.name} avatar`}
                              className="w-16 h-16 rounded-full object-cover border-2 border-orange-300/50 dark:border-orange-400/60 shadow-lg dark:shadow-orange-400/20"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-400/40 dark:to-orange-500/60 border-2 border-orange-300/50 dark:border-orange-400/60 shadow-lg dark:shadow-orange-400/20 flex items-center justify-center">
                              <span className="text-white dark:text-orange-100 font-semibold text-lg">
                                {t.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-orange-600 font-semibold text-lg dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
                        {t.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-orange-200/90 font-medium">
                        {t.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
