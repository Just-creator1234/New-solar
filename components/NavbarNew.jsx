"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";

const NavbarNew = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // avoid hydration mismatch
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/Blogs/Solarlink-Blogs" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("#")) return false;
    return pathname.toLowerCase().startsWith(href.toLowerCase());
  };

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null; // Prevent theme mismatch flash

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[999999999999999999999999] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-orange-100 dark:border-gray-800 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 lg:h-20">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg dark:shadow-orange-800/30 group-hover:shadow-orange-500/25 transition-all duration-300">
            <Sun className="w-7 h-7 text-white group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
              SunLink Solar
            </h1>
            <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">
              Enterprise
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                isActive(item.href)
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              }`}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transform origin-left transition-all duration-300 ${
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="text-sm hidden sm:inline">
              {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-orange-600 dark:text-orange-300 text-2xl lg:hidden"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-orange-100 dark:border-gray-800 shadow-md py-4 px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarNew;
