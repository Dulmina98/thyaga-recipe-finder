import React from 'react';
import { Button } from './ui/Button';

export const Navigation: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal bg-peach-cream">
      <div className="layout-container">
        <div className="relative flex h-16 items-center justify-between">
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-charcoal">
            <a href="#" className="transition-colors hover:text-mandarin">Explore</a>
            <a href="#" className="transition-colors hover:text-mandarin">Recipes</a>
          </nav>
          
          <div className="md:hidden"></div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/" className="text-[32px] font-bold tracking-tight">
              <span className="text-charcoal">Recipe</span><span className="text-mandarin">Finder</span>
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-charcoal">
            <a href="#" className="hidden md:block transition-colors hover:text-mandarin">Favorites</a>
            <a href="#" className="hidden md:block transition-colors hover:text-mandarin">About</a>
            <Button  size="sm">Sign up</Button>
          </div>
          
        </div>
      </div>
    </header>
  );
};
