"use client";
import ContactForm from "@/app/contact/ContactForm";

import NavbarNew from "@/components/NavbarNew";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sun,
  Zap,
  CheckCircle,
  Clock,
  Award,
  Shield,
} from "lucide-react";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
});

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+233 241926409"],
      color: "var(--color-sunlink-orange-500)",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@sunlinkpower.com", "sunlinksolarenterterprise@gmail.com"],
      color: "var(--color-sunlink-blue-500)",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["123 Solar Street", "Sunshine City, SC 12345"],
      color: "var(--color-trust-green)",
    },
  ];

  const features = [
    { icon: Clock, text: "15+ Years of Solar Expertise" },
    { icon: Award, text: "Certified & Licensed Professionals" },
    { icon: Shield, text: "25-Year Warranty on All Systems" },
    { icon: Zap, text: "Free Energy Consultation" },
  ];

  const FloatingElement = ({ className, style, delay = 0 }) => (
    <div
      className={`absolute rounded-lg opacity-20 dark:opacity-30 ${className}`}
      style={{
        ...style,
        animation: `gentle-bounce 2s ease-in-out infinite ${delay}s`,
      }}
    />
  );

  const ContactCard = ({ icon: Icon, title, details, color }) => (
    <div className="flex items-start space-x-4">
      <div
        className="rounded-full p-3 flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-lg text-sky-800 dark:text-slate-100">
          {title}
        </h3>
        {details.map((detail, idx) => (
          <p key={idx} className="break-words text-sky-600 dark:text-slate-300">
            {detail}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-amber-50 dark:bg-slate-900 transition-colors duration-300">
      <NavbarNew />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light Rays */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 opacity-30 dark:opacity-20"
          style={{
            background: `linear-gradient(45deg, transparent, var(--color-sunlink-orange-200), transparent)`,
            animation: "light-ray-1 8s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-80 h-80 opacity-25 dark:opacity-15"
          style={{
            background: `linear-gradient(-12deg, transparent, var(--color-sunlink-blue-200), transparent)`,
            animation: "light-ray-2 10s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        />

        {/* Floating Solar Panels */}
        <FloatingElement
          className="top-20 left-10 w-16 h-12 bg-slate-700 dark:bg-slate-600"
          delay={0}
        />
        <FloatingElement
          className="top-40 right-20 w-12 h-8 bg-orange-600 dark:bg-orange-500"
          delay={1}
        />
        <FloatingElement
          className="bottom-32 left-20 w-14 h-10 bg-green-600 dark:bg-green-500"
          delay={2}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sun
                className="w-12 h-12 mr-3 text-orange-500 dark:text-orange-400"
                style={{
                  animation: "spin-slow 4s linear infinite",
                }}
              />
              <h1 className="text-4xl md:text-5xl font-bold text-sky-800 dark:text-slate-100">
                Get In Touch
              </h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-sky-600 dark:text-slate-300">
              Ready to harness the power of the sun? Let's discuss your solar
              energy solutions.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pb-16 max-sm:px-2">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto  ">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-orange-50 dark:bg-slate-800/90 border border-orange-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-sky-800 dark:text-slate-100">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <ContactCard key={idx} {...info} />
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-blue-50 dark:bg-slate-800/90 border border-blue-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-sky-800 dark:text-slate-100">
                Why Choose Sunlink?
              </h2>

              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 flex-shrink-0 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-sm sm:text-base text-sky-700 dark:text-slate-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gentle-bounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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

        @keyframes light-ray-1 {
          0% {
            transform: rotate(45deg) scale(1) translateX(-50%);
            opacity: 0.3;
          }
          50% {
            transform: rotate(50deg) scale(1.05) translateX(-50%);
            opacity: 0.5;
          }
          100% {
            transform: rotate(45deg) scale(1) translateX(-50%);
            opacity: 0.3;
          }
        }

        @keyframes light-ray-2 {
          0% {
            transform: rotate(-12deg) scale(1) translateX(-50%);
            opacity: 0.25;
          }
          50% {
            transform: rotate(-15deg) scale(1.05) translateX(-50%);
            opacity: 0.4;
          }
          100% {
            transform: rotate(-12deg) scale(1) translateX(-50%);
            opacity: 0.25;
          }
        }
      `}</style>

      <div className="mb-10">
        <LiveMap />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
