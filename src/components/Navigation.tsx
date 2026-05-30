import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from './ui/Button';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Sync local query if URL changes (e.g. back button, or coming from Hero)
  useEffect(() => {
    if (isSearchPage) {
      setQuery(searchParams.get('q') || '');
    }
  }, [searchParams, isSearchPage]);

  // Debounce pushing query to URL params
  useEffect(() => {
    if (!isSearchPage) return;
    const currentParam = searchParams.get('q') || '';
    if (query === currentParam) return;

    const timer = setTimeout(() => {
      setSearchParams(query ? { q: query } : {});
    }, 500);

    return () => clearTimeout(timer);
  }, [query, isSearchPage, searchParams, setSearchParams]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal bg-peach-cream">
      <div className="layout-container">
        <div className="relative flex h-16 items-center justify-between">
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-charcoal">
            <Link to="/" className="transition-colors hover:text-mandarin">Explore</Link>
            <Link to="/search" className="transition-colors hover:text-mandarin">Recipes</Link>
          </nav>
          
          <div className="md:hidden"></div>

          {isSearchPage ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal opacity-50"><MagnifyingGlass size={18} weight="bold" /></span>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                       setSearchParams(query.trim() ? { q: query.trim() } : {});
                    }
                  }}
                  className="w-full rounded-full border-2 border-charcoal bg-white py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-mandarin"
                  placeholder="Search recipes or ingredients…"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setSearchParams({});
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal opacity-50 hover:opacity-100"
                  >
                    <X size={16} weight="bold" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="text-[32px] font-bold tracking-tight">
                <span className="text-charcoal">Recipe</span><span className="text-mandarin">Finder</span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-6 text-sm font-medium text-charcoal">
            <Link to="/favourites" className="hidden md:block transition-colors hover:text-mandarin">Favorites</Link>
            <Link to="/about" className="hidden md:block transition-colors hover:text-mandarin">About</Link>
            <Link to="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  );
};
