"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import with SSR disabled
const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
});

import NavbarNew from "@/components/NavbarNew";

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
  Import,
} from "lucide-react";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "solar-installation",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          service: "solar-installation",
        });
      }, 3000);
    }, 1500);
  };

  const services = [
    { value: "solar-installation", label: "Solar Installation" },
    { value: "energy-audit", label: "Energy Audit" },
    { value: "maintenance", label: "Maintenance & Repair" },
    { value: "consultation", label: "Consultation" },
    { value: "financing", label: "Financing Options" },
    { value: "other", label: "Other" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-SOLAR", "+1 (555) 123-7652"],
      color: "var(--color-sunlink-orange-500)",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@sunlinkpower.com", "sales@sunlinkpower.com"],
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
      className={`absolute rounded-lg opacity-20 ${className}`}
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
        <h3
          className="font-semibold text-lg"
          style={{ color: "var(--color-sky-light-800)" }}
        >
          {title}
        </h3>
        {details.map((detail, idx) => (
          <p
            key={idx}
            className="break-words"
            style={{ color: "var(--color-sky-light-600)" }}
          >
            {detail}
          </p>
        ))}
      </div>
    </div>
  );

  const FormField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    required = false,
    placeholder,
    rows,
    options,
    className = "",
  }) => (
    <div className={className}>
      <label
        className="block text-sm font-semibold mb-2"
        style={{ color: "var(--color-sky-light-800)" }}
      >
        {label} {required && "*"}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sunlink-orange-500 focus:outline-none transition-colors resize-none"
          style={{ backgroundColor: "var(--color-comfort-cream)" }}
          placeholder={placeholder}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sunlink-orange-500 focus:outline-none transition-colors"
          style={{ backgroundColor: "var(--color-comfort-cream)" }}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sunlink-orange-500 focus:outline-none transition-colors"
          style={{ backgroundColor: "var(--color-comfort-cream)" }}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  const SuccessMessage = () => (
    <div className="text-center py-12">
      <CheckCircle
        className="w-16 h-16 mx-auto mb-4"
        style={{ color: "var(--color-trust-green)" }}
      />
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--color-sky-light-800)" }}
      >
        Message Sent Successfully!
      </h3>
      <p style={{ color: "var(--color-sky-light-600)" }}>
        We'll get back to you within 24 hours.
      </p>
    </div>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--color-comfort-cream)" }}
    >
      <NavbarNew />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light Rays */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 opacity-30"
          style={{
            background: `linear-gradient(45deg, transparent, var(--color-sunlink-orange-200), transparent)`,
            animation: "light-ray-1 8s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-80 h-80 opacity-25"
          style={{
            background: `linear-gradient(-12deg, transparent, var(--color-sunlink-blue-200), transparent)`,
            animation: "light-ray-2 10s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        />

        {/* Floating Solar Panels */}
        <FloatingElement
          className="top-20 left-10 w-16 h-12"
          style={{ backgroundColor: "var(--color-sunlink-blue-700)" }}
          delay={0}
        />
        <FloatingElement
          className="top-40 right-20 w-12 h-8"
          style={{ backgroundColor: "var(--color-sunlink-orange-600)" }}
          delay={1}
        />
        <FloatingElement
          className="bottom-32 left-20 w-14 h-10"
          style={{ backgroundColor: "var(--color-trust-green)" }}
          delay={2}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 mt-15">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sun
                className="w-12 h-12 mr-3"
                style={{
                  color: "var(--color-sunlink-orange-500)",
                  animation: "spin-slow 4s linear infinite",
                }}
              />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "var(--color-sky-light-800)" }}
              >
                Get In Touch
              </h1>
            </div>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "var(--color-sky-light-600)" }}
            >
              Ready to harness the power of the sun? Let's discuss your solar
              energy solutions.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div
              className="rounded-2xl p-8 shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: "var(--color-sunlink-orange-50)" }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-sky-light-800)" }}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <ContactCard key={idx} {...info} />
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div
              className="rounded-2xl p-8 shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: "var(--color-sunlink-blue-50)" }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-sky-light-800)" }}
              >
                Why Choose Sunlink?
              </h2>

              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <feature.icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "var(--color-energy-yellow)" }}
                    />
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: "var(--color-sky-light-700)" }}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="rounded-2xl p-8 shadow-lg backdrop-blur-sm"
            style={{ backgroundColor: "var(--color-sky-light-50)" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-sky-light-800)" }}
            >
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <SuccessMessage />
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                  <FormField
                    label="Service Interest"
                    type="select"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    options={services}
                  />
                </div>

                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Solar Installation Inquiry"
                />

                <FormField
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your solar energy needs..."
                />

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: isSubmitting
                      ? "var(--color-sky-light-400)"
                      : "var(--color-sunlink-orange-500)",
                    boxShadow: isSubmitting
                      ? "none"
                      : "0 4px 20px rgba(255, 123, 0, 0.3)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
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

        .focus\\:border-sunlink-orange-500:focus {
          border-color: var(--color-sunlink-orange-500);
        }
      `}</style>

      <LiveMap />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
