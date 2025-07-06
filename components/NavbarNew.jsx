"use client";
import { useRef, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const NavbarNew = () => {
  const navRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "/contact" },
  ];

  // Initial theme load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleNavClick = (href, name) => {
    setActiveSection(name.toLowerCase());
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-orange-100 dark:border-gray-800 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#home"
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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.href, item.name)}
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                activeSection === item.name.toLowerCase()
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
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

        {/* Right: Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle (always visible) */}
          <button
            onClick={handleThemeToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-sm hidden sm:inline">
              {isDark ? "Light" : "Dark"} Mode
            </span>
          </button>

          {/* Mobile Menu Button (only on small screens) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-orange-600 dark:text-orange-300 text-2xl lg:hidden"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-orange-100 dark:border-gray-800 shadow-md py-4 px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.href, item.name)}
              className={`text-sm font-medium transition-all ${
                activeSection === item.name.toLowerCase()
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
