import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

interface SearchNavigationProps {
  query: string;
  setQuery: (val: string) => void;
}

export const SearchNavigation: React.FC<SearchNavigationProps> = ({ query, setQuery }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#FAF6EF]">
      <div className="layout-container">
        <div className="relative flex h-16 items-center justify-between">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
            <Link to="/" className="transition-colors hover:text-[#E8500B]">Explore</Link>
            <Link to="/search" className="transition-colors hover:text-[#E8500B]">Recipes</Link>
          </nav>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-50"><MagnifyingGlass size={18} weight="bold" /></span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full rounded-full border-2 border-[#1a1a1a] bg-white py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500B]"
                placeholder="Search recipes…"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-50 hover:opacity-100"
                >
                  <X size={16} weight="bold" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
            <Link to="/favourites" className="hidden md:block hover:text-[#E8500B] transition-colors">Favorites</Link>
            <Link to="/about" className="hidden md:block hover:text-[#E8500B] transition-colors">About</Link>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
