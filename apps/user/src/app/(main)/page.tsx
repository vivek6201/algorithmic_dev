import FounderSection from '@/components/site/pages/home/FounderSection';
import FeatureSection from '@/components/site/pages/home/FeatureSection';
import HeroSection from '@/components/site/pages/home/HeroSection';
import React from 'react';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeatureSection />
      <FounderSection />
    </div>
  );
}
