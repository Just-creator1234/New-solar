"use client";
import { useRef, useState, useEffect } from "react";
import { Menu, X, Sun, ChevronDown } from "lucide-react";

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href, name) => {
    setActiveSection(name.toLowerCase());
    setIsMobileMenuOpen(false);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
              onClick={() => setActiveSection("home")}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                  <Sun className="w-7 h-7 text-white group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  SunLink Solar
                </h1>
                <p className="text-sm text-orange-600 font-medium">
                  Enterprise
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.name.toLowerCase()
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transform origin-left transition-all duration-300 ${
                      activeSection === item.name.toLowerCase()
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden bg-white/95 backdrop-blur-md border-t border-orange-100`}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href, item.name)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeSection === item.name.toLowerCase()
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMobileMenuOpen
                    ? "slideInRight 0.3s ease-out forwards"
                    : "none",
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-orange-100">
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
