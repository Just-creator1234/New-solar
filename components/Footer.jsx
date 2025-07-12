"use client";
import React from "react";
import { Sun, Facebook, Twitter, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";

import { motion } from "framer-motion";

const Footer = () => {
  const productLinks = [
    { name: "Solar Panels", href: "#solar-panels" },
    { name: "LED Lights", href: "#led-lights", badge: "Pro" },
    { name: "Energy Storage", href: "#energy-storage" },
    { name: "Smart Controls", href: "#smart-controls" },
  ];

  const resourceLinks = [
    { name: "Blog", href: "#blog" },
    { name: "Webinars", href: "#webinars", badge: "New" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Help Center", href: "#help-center" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers", badge: "Hiring" },
    { name: "Partners", href: "#partners" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    {
      icon: <Instagram />,
      href: "https://www.instagram.com/sunlinksolarenterprise/",
    },
    { icon: <Twitter />, href: "https://x.com/Sunlinksolarent" },
    { icon: <Facebook />, href: "https://facebook.com/sunlinksolarenterprise" },
    { icon: <SiTiktok />, href: "https://www.tiktok.com/@sunlinksolarenter" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-comfort-cream shadow-2xl dark:bg-slate-900  border-t border-gray-200 dark:border-gray-700 py-12 px-4 text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-yellow-500">
                <Sun className="w-5 h-5 text-white" />
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SolarLight
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering homes to achieve energy independence through effective
              solar management and innovation.
            </p>
            <div className="flex gap-3">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Products section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          link.badge === "Pro"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
