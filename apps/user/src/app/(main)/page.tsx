import FounderSection from '@/components/site/pages/home/FounderSection';
import FeatureSection from '@/components/site/pages/home/FeatureSection';
import HeroSection from '@/components/site/pages/home/HeroSection';
import React from 'react';
import NewsletterSection from '@/components/site/pages/home/NewsletterSection';

export default function Home() {
  return (
    <div className="w-full pt-5">
      <HeroSection />
      <FeatureSection />
      <NewsletterSection />
      <FounderSection />
    </div>
  );
}
