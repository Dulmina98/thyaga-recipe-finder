import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Pizza, Fire, Plant, Fish, Cake, Coffee, MagnifyingGlass } from '@phosphor-icons/react';

const searchTags = [
  { label: 'Pizza', Icon: Pizza },
  { label: 'Spicy', Icon: Fire },
  { label: 'Vegan', Icon: Plant },
  { label: 'Seafood', Icon: Fish },
  { label: 'Desserts', Icon: Cake },
  { label: 'Breakfast', Icon: Coffee },
];

export const SearchSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 lg:pt-28 bg-peach-cream">
      <div className="layout-container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-charcoal">What are you craving?</h2>
        <p className="mt-4 text-charcoal">
          Search from thousands of handpicked recipes, filtered to your taste.
        </p>
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <MagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal" size={24} weight="bold" />
            <input
              type="text"
              placeholder="Search"
              className="bg-white w-full rounded-full py-4 pl-14 pr-14 focus:outline-none focus:ring-2 focus:ring-mandarin border-2 border-space-black"
            />
            <Button size="icon" className="absolute px-4 right-2 top-1/2 -translate-y-1/2" onClick={() => navigate('/search')}>
              Search
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {searchTags.map(({ label, Icon }) => (
            <Button key={label} variant="outline" className="flex items-center gap-2">
              <Icon weight="fill" size={18} className="text-mandarin" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
