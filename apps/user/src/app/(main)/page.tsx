import CTASection from '@/components/site/pages/home/CTASection';
import FeatureSection from '@/components/site/pages/home/FeatureSection';
import HeroSection from '@/components/site/pages/home/HeroSection';
import TestimonialSection from '@/components/site/pages/home/TestimonialSection';
import React from 'react';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
