"use client";

import Hero from "@/app/components/Hero";
import AnimatedStatsSection from "@/app/components/AnimatedStatsSection";
import AnimatedDivider from "@/app/components/AnimatedDivider";
import ProductShowcase from "@/app/components/ProductShowcase";
import KeyProduct from "@/app/components/KeyProduct";
import Navbar from "@/app/components/Navbar";
import Service from "@/app/components/Service";
import Testiomony from "@/app/components/Testiomony";
import Footer from "@/app/components/Footer";

const page = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-10 py-7 text-gray-900">
      <Navbar />
      <Hero />

      <AnimatedStatsSection />
      <KeyProduct />
      <ProductShowcase />
      <AnimatedDivider />

      <Service />
      <Testiomony />
      <Footer />
    </div>
  );
};

export default page;
