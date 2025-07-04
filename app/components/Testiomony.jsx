// import React from "react";

// const Testiomony = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-b from-[#fff7ed] to-[#fef3e8]">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-900 mb-12">
//           What Our{" "}
//           <span className="text-[--color-home-warm-900]">Customers Say</span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[
//             {
//               name: "Ama Boateng",
//               quote:
//                 "Sunlink turned my dark evenings into peaceful nights. Their installation was smooth and their support, top-notch!",
//               location: "Cape Coast",
//             },
//             {
//               name: "Kwame Mensah",
//               quote:
//                 "I never imagined solar could look this good. My garden lights up beautifully every evening without any bills.",
//               location: "Kumasi",
//             },
//             {
//               name: "Esi Armah",
//               quote:
//                 "Efficient, reliable, and truly transformative. I recommend Sunlink to everyone I know!",
//               location: "Accra",
//             },
//           ].map((t, i) => (
//             <div
//               key={i}
//               className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30"
//             >
//               <div className="text-5xl text-[--color-home-warm-900] mb-4">
//                 “
//               </div>
//               <p className="text-gray-700 mb-4 italic">"{t.quote}"</p>
//               <div className="text-gray-900 font-semibold">{t.name}</div>
//               <div className="text-sm text-gray-500">{t.location}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testiomony;
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
    <section className="py-10 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          What Our{" "}
          <span className="text-[--color-home-warm-900]">Customers Say</span>
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
                viewport={{ once: true, amount: 0.4 }}
                variants={cardVariants}
                className="relative bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-700 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,123,0,0.4), transparent 60%)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                />
                <div className="relative z-10 border-amber-600 flex flex-col justify-between h-[340px] px-4 py-6">
                  <div className="space-y-3">
                    <div className="text-5xl text-[--color-home-warm-900]">
                      “
                    </div>
                    <p className="text-gray-700 italic">{`"${t.quote}"`}</p>
                    <div className="text-gray-900 font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.location}</div>
                  </div>

                  {/* Audio controls at the bottom */}
                  <div className="mt-6">
                    <button
                      onClick={toggleAudio}
                      className="flex items-center gap-2 text-[--color-home-warm-900] hover:text-orange-500 transition"
                    >
                      {isPlaying ? (
                        <PauseCircle size={24} />
                      ) : (
                        <PlayCircle size={24} />
                      )}
                      <span>{isPlaying ? "Pause" : "Play"} Testimonial</span>
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
