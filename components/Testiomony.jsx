// "use client";
// import { motion } from "framer-motion";
// import { PlayCircle, PauseCircle } from "lucide-react";
// import { useState, useRef } from "react";

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
//     <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-gray-900">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-900 mb-12">
//           What Our{" "}
//           <span className="text-[--color-home-warm-900]">Customers Say</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((t, i) => {
//             const audioRef = useRef(null);
//             const [isPlaying, setIsPlaying] = useState(false);
//             const toggleAudio = () => {
//               if (!audioRef.current) return;
//               if (audioRef.current.paused) {
//                 audioRef.current.play();
//                 setIsPlaying(true);
//               } else {
//                 audioRef.current.pause();
//                 setIsPlaying(false);
//               }
//             };
//             return (
//               <motion.div
//                 key={i}
//                 custom={i}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.4 }}
//                 variants={cardVariants}
//                 className="relative bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 overflow-hidden group"
//               >
//                 <motion.div
//                   className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-700 blur-2xl"
//                   style={{
//                     background:
//                       "radial-gradient(circle at center, rgba(255,123,0,0.4), transparent 60%)",
//                   }}
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 0.2 }}
//                   viewport={{ once: true, amount: 0.4 }}
//                   transition={{ delay: i * 0.2, duration: 0.8 }}
//                 />
//                 <div className="relative z-10 border-amber-600 flex flex-col justify-between h-[340px] px-4 py-6">
//                   <div className="space-y-3">
//                     <div className="text-5xl text-[--color-home-warm-900]">
//                       “
//                     </div>
//                     <p className="text-gray-700 italic">{`"${t.quote}"`}</p>
//                     <div className="text-gray-900 font-semibold">{t.name}</div>
//                     <div className="text-sm text-gray-500">{t.location}</div>
//                   </div>

//                   {/* Audio controls at the bottom */}
//                   <div className="mt-6">
//                     <button
//                       onClick={toggleAudio}
//                       className="flex items-center gap-2 text-[--color-home-warm-900] hover:text-orange-500 transition"
//                     >
//                       {isPlaying ? (
//                         <PauseCircle size={24} />
//                       ) : (
//                         <PlayCircle size={24} />
//                       )}
//                       <span>{isPlaying ? "Pause" : "Play"} Testimonial</span>
//                     </button>
//                     <audio
//                       ref={audioRef}
//                       src={t.audio}
//                       onEnded={() => setIsPlaying(false)}
//                     />
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
import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";
import { useState, useRef } from "react";

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

export default function TestimonialSection() {
  return (
    <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
          What Our{" "}
          <span className=" text-orange-400 dark:text-orange-400">
            Customers Say
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            const audioRef = useRef(null);
            const [isPlaying, setIsPlaying] = useState(false);
            const toggleAudio = () => {
              if (!audioRef.current) return;
              if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
              } else {
                audioRef.current.pause();
                setIsPlaying(false);
              }
            };
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
                <div className="relative z-10 flex flex-col justify-between h-[340px] px-4 py-6">
                  <div className="space-y-3">
                    <div className="text-5xl text-[--color-home-warm-900] dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
                      "
                    </div>
                    <p className="text-gray-700 dark:text-gray-100 italic leading-relaxed font-medium">{`"${t.quote}"`}</p>
                    <div className="text-orange-600  font-semibold text-lg dark:text-orange-300 dark:drop-shadow-[0_0_15px_rgba(253,186,116,0.4)]">
                      {t.name}
                    </div>

                    <div className="text-sm text-gray-500 dark:text-orange-200/90 font-medium">
                      {t.location}
                    </div>
                  </div>

                  {/* Audio controls at the bottom */}
                  <div className="mt-6">
                    <button
                      onClick={toggleAudio}
                      className="flex items-center gap-2 text-[--color-home-warm-900] dark:text-orange-300 hover:text-orange-500 dark:hover:text-orange-200 transition-all duration-300 dark:hover:drop-shadow-[0_0_12px_rgba(253,186,116,0.5)] group/btn"
                    >
                      <span className="dark:group-hover/btn:scale-110 transition-transform duration-300">
                        {isPlaying ? (
                          <PauseCircle size={24} />
                        ) : (
                          <PlayCircle size={24} />
                        )}
                      </span>
                      <span className="dark:group-hover/btn:translate-x-1 transition-transform duration-300">
                        {isPlaying ? "Pause" : "Play"} Testimonial
                      </span>
                    </button>
                    <audio
                      ref={audioRef}
                      src={t.audio}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
