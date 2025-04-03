import CTASection from "@/components/site/pages/home/CTASection";
import FeatureSection from "@/components/site/pages/home/FeatureSection";
import HeroSection from "@/components/site/pages/home/HeroSection";
import TestimonialSection from "@/components/site/pages/home/TestimonialSection";
import React from "react";

export default function Home() {
  return (
    <div className="w-full px-5 md:px-10 max-w-[1400px] mx-auto">
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
