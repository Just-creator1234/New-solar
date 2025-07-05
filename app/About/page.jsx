"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Sun,
  Users,
  Award,
  Heart,
  Lightbulb,
  Shield,
  ArrowRight,
} from "lucide-react";
import NavbarNew from "@/components/NavbarNew";
import Footer from "@/components/Footer";

const SunLinkAboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Sun,
      title: "Innovation",
      description:
        "Leading the future with cutting-edge solar technology and sustainable energy solutions.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building stronger communities through accessible renewable energy for everyone.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "Delivering reliable, high-quality solutions with transparency and integrity.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Sustainability",
      description:
        "Committed to protecting our planet for future generations through clean energy.",
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  const founder = {
    name: "Alex Johnson",
    role: "Founder & Solar Specialist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Passionate solar energy expert with over 12 years of experience helping homeowners transition to clean, renewable energy solutions.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light-50 to-home-warm-100 overflow-hidden">
      {/* Custom Styles */}
      <NavbarNew />
      <style jsx>{`
        @keyframes energy-flow {
          0% {
            transform: translateX(-100%) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gentle-bounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes solar-glow {
          0% {
            box-shadow: 0 0 20px rgba(255, 123, 0, 0.3);
          }
          100% {
            box-shadow: 0 0 40px rgba(255, 123, 0, 0.6);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-energy-flow {
          animation: energy-flow 3s ease-in-out infinite;
        }
        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-solar-glow {
          animation: solar-glow 2s ease-in-out infinite alternate;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-gradient {
          background: linear-gradient(135deg, #ff7b00 0%, #00bfff 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-500">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sunlink-orange-400/20 to-sunlink-blue-400/20 dark:from-sunlink-orange-400/10 dark:to-sunlink-blue-400/10 rounded-full blur-3xl animate-gentle-bounce"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-sunlink-blue-400/20 to-home-warm-400/20 dark:from-sunlink-blue-400/10 dark:to-home-warm-400/10 rounded-full blur-3xl animate-gentle-bounce"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-energy-yellow dark:bg-yellow-300/70 rounded-full animate-energy-flow"></div>
          <div
            className="absolute bottom-40 left-20 w-3 h-3 bg-sunlink-blue-400 dark:bg-blue-300/70 rounded-full animate-energy-flow"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-5 h-5 bg-trust-green dark:bg-green-300/70 rounded-full animate-energy-flow"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transition-all duration-1000" id="hero">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sunlink-orange-500 to-sunlink-blue-500 rounded-full mb-6 animate-solar-glow">
                <Sun className="w-10 h-10 text-white animate-spin-slow" />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sunlink-orange-600 to-sunlink-blue-600 bg-clip-text text-transparent leading-tight">
              Powering Tomorrow
            </h1>

            <p className="text-xl md:text-2xl text-sky-light-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Hi, I'm Alex! I'm passionate about helping homeowners harness the
              power of the sun to create a cleaner, more sustainable future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-sunlink-orange-500 to-sunlink-orange-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                My Story <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 glass-effect text-sky-light-700 dark:text-slate-200 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all border-2 border-sky-light-800 duration-300">
                Get to Know Me
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
          <ChevronDown className="w-8 h-8 text-sky-light-400 dark:text-slate-400" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-700 ${
                isVisible.mission ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="mission"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-sunlink-orange-600 to-sunlink-blue-600 bg-clip-text text-transparent">
                Our Mission
              </h2>

              <div className="text-xl text-sky-light-600 dark:text-slate-300 leading-relaxed space-y-6">
                <p>
                  Founded in 2012, SunLink started as my personal mission to
                  make clean, renewable energy accessible to homeowners in our
                  community. After working in the renewable energy sector for
                  several years, I saw an opportunity to provide more
                  personalized, dedicated service.
                </p>

                <p>
                  What began as a one-person operation has grown into a trusted
                  local solar installation service. I believe in building
                  lasting relationships with my clients, taking the time to
                  understand their unique energy needs, and providing customized
                  solutions that make sense for their homes and budgets.
                </p>

                <p>
                  Every project I take on is personal to me. When you choose
                  SunLink, you're not just getting solar panels – you're getting
                  my commitment to quality, transparency, and service that goes
                  above and beyond your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-sky-light-50 to-home-warm-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sunlink-orange-600 to-sunlink-blue-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-sky-light-600 dark:text-slate-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 ${
                    isVisible.values ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  id="values"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => setActiveValue(index)}
                >
                  <div className="glass-effect dark:bg-white/5 rounded-2xl p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.gradient} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-sky-light-800 dark:text-white">
                      {value.title}
                    </h3>

                    <p className="text-sky-light-600 dark:text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sunlink-orange-600 to-sunlink-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-sky-light-600 dark:text-slate-300 max-w-2xl mx-auto">
              The person behind SunLink Solar
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
                isVisible.about ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="about"
            >
              <div className="order-2 md:order-1">
                <div className="glass-effect dark:bg-white/5 rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4 text-sky-light-800 dark:text-white">
                  {founder.name}
                </h3>
                <p className="text-sunlink-orange-600 dark:text-orange-300 font-semibold mb-6 text-lg">
                  {founder.role}
                </p>
                <p className="text-sky-light-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  {founder.bio}
                </p>
                <p className="text-sky-light-600 dark:text-slate-300 leading-relaxed">
                  When I'm not designing solar systems, you can find me hiking
                  local trails, volunteering at community events, or spending
                  time with my family. I believe that the relationships we build
                  in our community are just as important as the clean energy we
                  create.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Footer />
    </div>
  );
};

export default SunLinkAboutPage;
