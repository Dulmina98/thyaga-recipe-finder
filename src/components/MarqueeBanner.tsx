import React from 'react';

const ITEMS = ["Fresh Ingredients", "Seasonal Picks", "Discover New Flavors"];
const COPIES = 10;

export const MarqueeBanner: React.FC = () => {
    return (
        <div className="relative overflow-hidden py-5 bg-faded-cream border-t-2 border-b-2 border-ghost-ash">
            <div className="flex w-max animate-marquee whitespace-nowrap">
                {[...Array(COPIES)].map((_, i) => (
                    <div key={i} className="flex shrink-0">
                        {ITEMS.map((text) => (
                            <span key={text} className="mx-8 text-[16px] uppercase tracking-widest text-black/50">
                {text} •
              </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};