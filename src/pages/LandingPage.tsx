import React from 'react';
import { Hero } from '../components/Hero';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { SearchSection } from '../components/SearchSection';
import { TrendingRecipes } from '../components/TrendingRecipes';
import { WhySection } from '../components/WhySection';
import { CTASection } from '../components/CTASection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <Hero />
      <MarqueeBanner />
      <SearchSection />
      <TrendingRecipes />
      <WhySection />
      <CTASection />
    </div>
  );
};
