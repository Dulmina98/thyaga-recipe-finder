import React from 'react';
import { Button } from './ui/Button';
import { Play } from '@phosphor-icons/react';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-peach-cream flex items-stretch"
    >
      <div className="relative layout-container w-full flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-1/2 pt-32 pb-20 lg:pt-48 lg:pb-32 lg:pr-12">
          <div className="max-w-2xl">
              <p className="inline-block border border-mandarin px-3 rounded-full mb-4 text-sm font-semibold tracking-wider uppercase text-mandarin">
                  ● Now Live — 10,000+ Recipes
              </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-charcoal">
              Cook <br /> <span className={"text-mandarin"}>Bold.</span><br />
              <span className="text-charcoal">Eat Well.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-charcoal">
              Discover chef-curated recipes tailored to your pantry, your mood, and your moment. From weeknight fast to weekend feast.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg">Find Your Recipe</Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Play weight="fill" className="h-5 w-5 text-mandarin" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/68.jpg',
                  'https://randomuser.me/api/portraits/men/46.jpg',
                ].map((src, i) => (
                  <img key={i} src={src} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-medium text-charcoal">Loved by 50k+ home cooks</p>
                <div className="flex items-center gap-1">
                  <span className="text-mandarin">★</span>
                    <span className="text-mandarin">★</span>
                    <span className="text-mandarin">★</span>
                    <span className="text-mandarin">★</span>
                    <span className="text-mandarin">★</span>
                  <span className="font-bold text-charcoal">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full lg:w-1/2 relative mt-16 lg:mt-0">
          <div className="absolute inset-y-0 left-0 right-0 py-6 lg:py-0">
            <div className="absolute"></div>
            <img 
              src="/images/hero-bg.jpg" 
              alt="Delicious food spread" 
              className="relative w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
