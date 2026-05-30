import React from 'react';

const stats = [
  { value: '10K+', label: 'Curated recipes across 40+ cuisines' },
  { value: '4.9',  label: 'Average rating from verified users' },
  { value: '50K+', label: 'Active home cooks in our community' },
  { value: '50K+', label: 'Average time to find your perfect recipe' },
];

const statBoxColors = [
  { bg: 'bg-mandarin', valuColor: 'text-white', labelColor: 'text-white' },
  { bg: 'bg-charcoal', valuColor: 'text-white', labelColor: 'text-ghost-ash' },
  { bg: 'bg-mandarin', valuColor: 'text-white', labelColor: 'text-white' },
  { bg: 'bg-charcoal', valuColor: 'text-white', labelColor: 'text-ghost-ash' },
];

export const WhySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-space-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-mandarin">Why RecipeFinder</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Food Is<br />Personal.<br />We Get It.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ghost-ash">
              RecipeFinder isn't just a recipe database. It's a living, breathing culinary companion that learns your palate, respects your pantry, and elevates your cooking — one dish at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {stats.map((stat, i) => {
              const { bg, valuColor, labelColor } = statBoxColors[i];
              return (
                <div key={i} className={`p-6 ${bg}`}>
                  <p className={`text-3xl font-bold tracking-tight ${valuColor}`}>{stat.value}</p>
                  <p className={`mt-2 text-sm leading-6 ${labelColor}`}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

