"use client";
import Hero from "@/components/Hero";
import AnimatedStatsSection from "@/components/AnimatedStatsSection";
import AnimatedDivider from "@/components/AnimatedDivider";
import ProductShowcase from "@/components/ProductShowcase";
import KeyProduct from "@/components/KeyProduct";
import NavbarNew from "@/components/NavbarNew";
import SolarProductShowcase from "@/components/SolarProductShowcase";
import Service from "@/components/Service";
import Testiomony from "@/components/Testiomony";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="bg-gradient-to-br max-sm:px-0 from-orange-50 via-amber-50 to-yellow-50 px-10 py-7 text-gray-900 dark:from-sky-light-900 dark:via-sky-light-800 dark:to-sky-light-700 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <NavbarNew />
      <Hero />
      <AnimatedStatsSection />
      <KeyProduct />
      <SolarProductShowcase />
      <Service />
      <Testiomony />
      <Footer />
    </div>
  );
}
