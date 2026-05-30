import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, SquaresFour, ListDashes, CaretDown } from '@phosphor-icons/react';
import { COLLECTIONS, CUISINE_FILTERS } from '../data/favouritesMockData';
import { FavouritesSidebar } from '../components/favourites/FavouritesSidebar';
import { FavouriteGridCard } from '../components/favourites/FavouriteGridCard';
import { FavouriteListRow } from '../components/favourites/FavouriteListRow';
import { EmptyState } from '../components/favourites/EmptyState';
import { Button } from '../components/ui/Button';
import { useFavourites } from '../context/FavouritesContext';

export const FavouritesPage: React.FC = () => {
  const { favourites, removeFavourite } = useFavourites();
  const [activeCollection, setActiveCollection] = useState('All Saved');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recently Saved');

  const removeFromFavourites = (id: string) => {
    setTimeout(() => removeFavourite(id), 310);
  };

  const filtered = favourites.filter(r => {
    const matchCuisine = activeCuisine === 'All' || r.area === activeCuisine;
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCuisine && matchSearch;
  });

  const collectionCounts: Record<string, number> = {};
  COLLECTIONS.forEach(c => {
    collectionCounts[c] = c === 'All Saved' ? favourites.length : 0;
  });

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF6EF' }}>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#FAF6EF]">
        <div className="layout-container">
          <div className="relative flex h-16 items-center justify-between">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
              <Link to="/" className="transition-colors hover:text-[#E8500B]">Explore</Link>
              <Link to="/search" className="transition-colors hover:text-[#E8500B]">Recipes</Link>
            </nav>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="text-[32px] font-bold tracking-tight">
                <span className="text-[#1a1a1a]">Recipe</span><span className="text-[#E8500B]">Finder</span>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
              <Link to="/favourites" className="hidden md:block font-bold text-[#E8500B]">Favorites</Link>
              <Link to="/about" className="hidden md:block transition-colors hover:text-[#E8500B]">About</Link>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 layout-container">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 pb-20">

          <FavouritesSidebar
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
            collectionCounts={collectionCounts}
            totalFavourites={favourites.length}
          />

          <div className="flex-1 min-w-0 lg:pt-10">

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative flex-1 min-w-48 max-w-sm">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-40">
                  <MagnifyingGlass size={16} weight="bold" />
                </span>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search your saved recipes…"
                  className="w-full rounded-full border-2 border-[#1a1a1a] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500B]"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none border-2 border-[#1a1a1a] bg-white text-sm font-semibold text-[#1a1a1a] py-2 pl-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E8500B] cursor-pointer"
                  >
                    {['Recently Saved', 'Rating', 'Cook Time', 'A → Z'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]">
                    <CaretDown size={12} weight="bold" />
                  </span>
                </div>

                <div className="flex border-2 border-[#1a1a1a] overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a] hover:bg-[#F0EAE0]'}`}
                  >
                    <SquaresFour size={16} weight="bold" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 transition-colors border-l-2 border-[#1a1a1a] ${viewMode === 'list' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a] hover:bg-[#F0EAE0]'}`}
                  >
                    <ListDashes size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {CUISINE_FILTERS.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCuisine(c)}
                  className={`rounded-full border-2 px-4 py-1.5 text-xs font-semibold transition-all ${
                    activeCuisine === c
                      ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                      : 'border-[#CDCBC0] text-[#1a1a1a] bg-white hover:border-[#1a1a1a]'
                  }`}
                >
                  {c}
                </button>
              ))}
              <span className="ml-2 text-sm text-[#1a1a1a] opacity-50 self-center">
                {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {activeCollection !== 'All Saved' && (
              <div className="mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-[#E8500B]" />
                <h3 className="text-lg font-bold text-[#1a1a1a]">{activeCollection}</h3>
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState collection={activeCollection} />
            ) : viewMode === 'grid' ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map(recipe => (
                  <FavouriteGridCard key={recipe.id} recipe={recipe} onRemove={removeFromFavourites} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map(recipe => (
                  <FavouriteListRow key={recipe.id} recipe={recipe} onRemove={removeFromFavourites} />
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="mt-12 border-2 border-[#1a1a1a] bg-[#1a1a1a] p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B]">Discover More</p>
                  <h4 className="text-xl font-bold text-white mt-1">Ready to expand your collection?</h4>
                  <p className="text-sm text-[#CDCBC0] mt-1">Browse 10,000+ recipes tailored to your taste.</p>
                </div>
                <Link
                  to="/search"
                  className="flex-shrink-0 rounded-full border-2 border-[#E8500B] bg-[#E8500B] px-6 py-3 text-sm font-bold text-white hover:bg-[#c94008] transition-colors whitespace-nowrap"
                >
                  Explore Recipes →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FavouritesPage;
