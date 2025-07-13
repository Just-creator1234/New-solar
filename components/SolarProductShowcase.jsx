import React, { useState } from "react";
import EnhancedProductModal from "@/components/EnhancedProductModal";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Sun,
  Battery,
  Home,
  Building2,
} from "lucide-react";

const SolarProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: "all", name: "All Products", icon: Sun },
    { id: "panels", name: "Solar Panels", icon: Zap },
    { id: "inverters", name: "Inverters", icon: Battery },
    { id: "residential", name: "Residential", icon: Home },
    { id: "commercial", name: "Commercial", icon: Building2 },
  ];

  const products = [
    {
      id: 1,
      name: "300W Round Solar Ceiling Light",
      category: "panels",
      type: "Solar Panel JA-CL-01S300W",
      power: "300W",
      efficiency: "22.1%",
      price: "$299",
      originalPrice: "$349",
      rating: 4.8,
      reviews: 112,
      warranty: "25 years",
      inStock: true,
      stockCount: 9,
      image: "/IMAGE1.jpg",
      features: [
        "Easy installation",
        "Weather Resistant",
        "Can sustain multiple weather conditions",
      ],
      gradient: "from-blue-500 to-cyan-500",
      description:
        "Illuminate your space with the powerful and energy-efficient 300W LED, providing ample brightness for various applications",
      specifications: {
        dimensions: "79.1 × 39.1 × 1.4 inches",
        weight: "44.1 lbs",
        cells: "144 half-cut",
        connector: "MC4",
        frame: "Anodized aluminum",
      },
    },
    {
      id: 2,
      name: "PowerInvert 5000",
      category: "inverters",
      type: "Smart Inverter",
      power: "5000W",
      efficiency: "98.5%",
      price: "$1,299",
      originalPrice: "$1,499",
      rating: 4.9,
      reviews: 57,
      warranty: "5 years",
      inStock: true,
      stockCount: 4,
      image: "/IMAGE2.jpg",
      features: ["WiFi Monitoring", "Grid Tie", "Compact Design"],
      gradient: "from-green-500 to-emerald-500",
      description:
        "High-efficiency inverter for smooth solar-to-grid power conversion with smart monitoring.",
      specifications: {
        inputVoltage: "48V DC",
        outputVoltage: "230V AC",
        connectivity: "WiFi, RS232",
        cooling: "Smart Fan",
        size: "17 x 12 x 6 in",
        weight: "24 lbs",
      },
    },
    {
      id: 3,
      name: "HomeSolar Kit",
      category: "residential",
      type: "Complete System",
      power: "6.4kW",
      efficiency: "21.8%",
      price: "$8,999",
      originalPrice: "$10,499",
      rating: 4.7,
      reviews: 83,
      warranty: "20 years",
      inStock: true,
      stockCount: 3,
      image: "/IMAGE3.jpg",
      features: ["DIY Installation", "Complete Kit", "App Control"],
      gradient: "from-orange-500 to-red-500",
      description:
        "All-in-one solar solution for households. Easy setup, high output, and smart-enabled.",
      specifications: {
        panelsIncluded: "16 x 400W",
        inverter: "Hybrid 6kW",
        batteryBank: "10kWh Lithium",
        monitoring: "Mobile App",
        footprint: "Roof area: 30m²",
      },
    },
    {
      id: 4,
      name: "Solobesafe Outdoor Ceiling Lamp",
      category: "panels",
      type: "Flexible Panel",
      power: "380W",
      efficiency: "20.4%",
      price: "$249",
      originalPrice: "$279",
      rating: 4.6,
      reviews: 91,
      warranty: "1 years",
      inStock: false,
      stockCount: 0,
      image: "/IMAGE4.jpg",
      features: ["Bendable", "Lightweight", "Marine Grade"],
      gradient: "from-purple-500 to-pink-500",
      description:
        "✨ Elevate Your Outdoor Ambiance with Energy-Efficient Solar Lighting!",
      specifications: {
        thickness: "37cm x 34.5cm x 39.5cm",
        weight: "11 lbs",
        curvature: "30°",
        junctionBox: "IP67 rated",
        mounting: "PSE, RoHS, CE",
      },
    },
    {
      id: 5,
      name: "BrandCryfokt",
      category: "commercial",
      type: "Electric fan designFloor Fan",
      power: "---",
      efficiency: "23.2%",
      price: "$24,999",
      originalPrice: "$28,000",
      rating: 4.9,
      reviews: 36,
      warranty: "30 years",
      inStock: true,
      stockCount: 2,
      image: "/FAN1.jpg",
      features: ["EFFECTIVE COOLING", "MULTIPLE USES", "WITH LITHIUM BATTERY"],
      gradient: "from-indigo-500 to-blue-500",
      description:
        "his fan is solar power or charging dual use, the phone with USB, with small night light; The switching is delicate, quiet and comfortable, with multi function buttons",
      specifications: {
        modules: "64 x 390W",
        controller: "‎Button Control",
        gridSupport: "-------",
        monitoring: "-----",
        backup: "-----",
      },
    },
    {
      id: 6,
      name: "Binatone Durable Electric Standing Fan ",
      category: "inverters",
      type: "Electric fan designFloor Fan",
      power: " 70W ",
      efficiency: "96.8%",
      price: "$149",
      originalPrice: "$179",
      rating: 4.7,
      reviews: 77,
      warranty: "3 years",
      inStock: true,
      stockCount: 22,
      image: "/FAN2.jpg",
      features: [
        "Durable Construction",
        "Energy Efficient",
        "Oscillating Function",
      ],
      gradient: "from-teal-500 to-cyan-500",
      description:
        "This standing fan is highly mobile, unlike ceiling fans which are stationed in one place. The 3-speed push button selector allows you to get absolute control over the fan.",
      specifications: {
        inputVoltage: "70W",
        outputVoltage: "120/240V AC",
        communication: "Zigbee / WiFi",
        compliance: "UL 1741 / NEC 2017",
        weight: "3.2 lbs",
      },
    },
    {
      id: 7,
      name: "14 INCH Portable Wireless Rechargeable Table Fan",
      category: "residential",
      type: "Integrated Tile Panel",
      power: "400W",
      efficiency: "20.9%",
      price: "$399",
      originalPrice: "$449",
      rating: 4.6,
      reviews: 64,
      warranty: "25 years",
      inStock: true,
      stockCount: 11,
      image: "/FAN3.jpg",
      features: [
        "Durable Construction",
        "Energy Efficient",
        "Oscillating Function",
      ],
      gradient: "from-yellow-500 to-orange-500",
      description:
        "14 INCH Portable Wireless Rechargeable Table Fan with Solar Panel Powered and AC Charger Dual Input for Household, Camping, Fishing Outdoors",
      specifications: {
        tileType: "Interlock",
        dimensions: "45 x 15 in",
        weight: "30 lbs",
        material: "-----",
        connector: "Snap-fit",
      },
    },
    {
      id: 8,
      name: "Solar Electric Fan Home Floor",
      category: "commercial",
      type: "Solar Fan",
      power: "----",
      efficiency: "Boosts 35%",
      price: "$5,999",
      originalPrice: "$6,500",
      rating: 4.9,
      reviews: 21,
      warranty: "10 years",
      inStock: true,
      stockCount: 5,
      image: "/FAN4.jpg",
      features: [
        "Durable Construction",
        "Energy Efficient",
        "Oscillating Function",
      ],
      gradient: "from-gray-500 to-blue-500",
      description:
        "Solar Electric Fan Home Floor Fan Large Air Volume Table And Floor Dual-use Can Shake The Head Softly And Low Noise",
      specifications: {
        motion: "Dual-axis",
        motor: "Hydraulic",
        angleRange: "180° horizontal",
        material: "Steel Frame",
        warranty: "1 years",
      },
    },
    {
      id: 9,
      name: " Pedestal Fan",
      category: "residential",
      type: "Solar Battery",
      power: "50W",
      efficiency: "95%",
      price: "$4,499",
      originalPrice: "$5,199",
      rating: 4.8,
      reviews: 88,
      warranty: "10 years",
      inStock: true,
      stockCount: 6,
      image: "/FAN5.jpg",
      features: ["Lithium-Ion", "Smart Charging", "Compact Design"],
      gradient: "from-gray-800 to-blue-800",
      description: "A great way to keep your home cool during the summer",
      specifications: {
        capacity: "10 kWh",
        voltage: "48V",
        chemistry: "-----",
        cycles: "6000+",
        size: "45 x 25 x 10 in",
      },
    },
    {
      id: 10,
      name: "Eversecu Solar Motion Sensor ",
      category: "residential",
      type: "Wireless Floodlight IP66 Waterproof Security Camera ",
      power: "10W",
      efficiency: "LED 180lm",
      price: "$49",
      originalPrice: "$59",
      rating: 4.7,
      reviews: 200,
      warranty: "2 years",
      inStock: true,
      stockCount: 28,
      image: "/CAM1.jpg",
      features: ["Portable", "USB Charging", "12hr Runtime"],
      gradient: "from-green-400 to-lime-500",
      description:
        "With 800 lumens and 8 LED spotlights, these solar lights provide exceptional brightness, effectively illuminating outdoor areas like porches and gardens.",
      specifications: {
        battery: "5000mAh",
        brightness: "180 lumens",
        ports: "USB-C",
        runtime: "12 hours",
        modes: "3 Brightness Levels",
      },
    },
    {
      id: 11,
      name: "WALI Solar Fake Camera",
      category: "panels",
      type: "Wireless Simulated Surveillance Security",
      power: "120W",
      efficiency: "19.2%",
      price: "$119",
      originalPrice: "$149",
      rating: 4.5,
      reviews: 41,
      warranty: "12 years",
      inStock: true,
      stockCount: 18,
      image: "/CAM2.jpg",
      features: ["Compact Design", "Quick Install", "Off-Grid Ready"],
      gradient: "from-sky-500 to-indigo-500",
      description:
        "Equipped with solar charging capabilities, this dummy camera operates without electricity, offering an eco-friendly and low-maintenance security solution suitable for any outdoor environment.",
      specifications: {
        frame: "Aluminum",
        connector: "Anderson",
        surface: "Tempered Glass",
        efficiency: "19.2%",
        size: "48 x 18 x 1.5 in",
      },
    },
    {
      id: 12,
      name: "1080P HD Solar Panel Outdoor Surveillanc",
      category: "inverters",
      type: " Waterproof CCTV Camera",
      power: "10kW",
      efficiency: "99.1%",
      price: "$2,199",
      originalPrice: "$2,599",
      rating: 4.9,
      reviews: 55,
      warranty: "7 years",
      inStock: true,
      stockCount: 7,
      image: "/CAM3.jpg",
      features: ["Smart Metering", "Anti-Islanding", "Cloud Sync"],
      gradient: "from-rose-500 to-red-500",
      description:
        "Uninterrupted Monitoring: With a combination of the solar-powered system and a 12000mAh battery, you get reliable, continuous surveillance day and night.Advanced Features: From motion detection alerts to high-definition video and two-way audio, this camera is equipped with everything you need for enhanced security.",
      specifications: {
        phases: "Single / Split Phase",
        communication: "WiFi, LAN",
        input: "DC 120-600V",
        output: "AC 240V",
        compliance: "UL 1741, IEEE 1547",
      },
    },
  ];

  const filteredByCategory =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const filteredProducts = showAll
    ? filteredByCategory
    : filteredByCategory.slice(0, 6);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 via-amber-50 shadow-2xl to-yellow-50  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 ">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-orange-300 dark:border-orange-700 bg-orange-100/20 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 mb-4">
            <Sun className="w-4 h-4 mr-2" />
            Complete Solar Collection
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Premium Solar
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">
              Products & Solutions
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our comprehensive range of high-performance solar products
            designed to meet every energy need from residential to commercial
            applications.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{
                animationName: "slideInUp",
                animationDuration: "0.6s",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Product Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover  object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Floating Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${product.gradient} shadow-lg`}
                  >
                    {product.efficiency}
                  </div>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                    {product.type}
                  </span>
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {product.power}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Shield className="w-4 h-4 mr-1" />
                    Warranty
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Details
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4">
            <div className="text-center ">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {showAll ? "Show Less" : "View All Products"}
              </button>
            </div>

            <Link
              href={"/contact"}
              className="border-2 border-orange-500 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Product Details Modal */}
      {selectedProduct && (
        <EnhancedProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={favorites.includes(selectedProduct.id)}
          onFavoriteToggle={() => toggleFavorite(selectedProduct.id)}
        />
      )}
    </section>
  );
};

export default SolarProductShowcase;
