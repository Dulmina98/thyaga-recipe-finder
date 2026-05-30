import React from 'react';
import { Button } from './ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-peach-cream">
      <div className="layout-container">
        <div
          className="border-2 px-8 py-16 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-mandarin" >Ready to Cook?</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-charcoal">
            Start Your<br />Culinary Journey
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-charcoal" >
            Join 50,000+ home cooks discovering new flavors every day. Free forever. No credit card required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">Get Started Free</Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Browse Recipes</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
