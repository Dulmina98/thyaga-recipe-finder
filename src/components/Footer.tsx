import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-8 bg-space-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="text-[32px] font-bold">
              <span className={"text-white"}>Recipe</span><span className={"text-mandarin"}>Finder</span>
            </h3>
            <p className="mt-[8px] text-[18px] leading-6 max-w-xs text-peach-cream">
              Your personal culinary companion. Discover, cook, and share recipes that move you.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-peach-cream">Platform</h4>
            <ul className="mt-4 space-y-3 text-sm text-peach-cream">
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Explore</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Recipes</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Collections</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Meal Planner</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-peach-cream">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>About</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Blog</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Careers</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-peach-cream">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Privacy</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Terms</a></li>
              <li><a href="#" className="transition-colors text-peach-cream" onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={e => (e.currentTarget.style.color = '#CDCBC0')}>Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 text-sm" style={{ borderTop: '1px solid #1A1A1A', color: '#CDCBC0' }}>
          © 2026 RecipeFinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
