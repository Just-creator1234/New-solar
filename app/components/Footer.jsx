import React from "react";
import { Sun, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "#product-showcase" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const socials = [
  { icon: <Facebook />, href: "https://facebook.com" },
  { icon: <Twitter />, href: "https://twitter.com" },
  { icon: <Instagram />, href: "https://instagram.com" },
  { icon: <Mail />, href: "mailto:info@solarlight.com" },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-t border-orange-100 py-12 px-4 mt-24">
      {/* Decorative sun icon */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-orange-200 to-yellow-100 rounded-full blur-2xl opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg">
            <Sun className="w-7 h-7 text-white" />
          </span>
          <span className="text-2xl font-bold text-orange-600 tracking-tight">
            SolarLight
          </span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-wrap gap-6 text-orange-700 font-medium text-base">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-orange-500 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
        {/* Socials */}
        <div className="flex gap-4">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 border border-orange-100 hover:bg-orange-100 hover:text-orange-600 transition-all duration-200 shadow"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Bottom */}
      <div className="mt-10 text-center text-orange-400 text-sm">
        &copy; {new Date().getFullYear()} SolarLight. All rights reserved.
      </div>
      {/* Decorative bottom ring */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-10 bg-gradient-to-r from-orange-200 to-yellow-100 rounded-full blur-2xl opacity-20 pointer-events-none" />
    </footer>
  );
};

export default Footer;
