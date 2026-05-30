import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WarningCircle, SmileyXEyes } from '@phosphor-icons/react';
import { SearchSidebar } from '../components/search/SearchSidebar';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { smartSearch, searchByCategory } from '../services/mealdb';
import type { RecipeSummary } from '../services/mealdb';

// ─── Quick filter config ───────────────────────────────────────────────────
const QUICK_FILTERS = [
  { label: 'All',        type: 'name',     value: '' },
  { label: 'Chicken',    type: 'category', value: 'Chicken' },
  { label: 'Seafood',    type: 'category', value: 'Seafood' },
  { label: 'Vegetarian', type: 'category', value: 'Vegetarian' },
  { label: 'Pasta',      type: 'category', value: 'Pasta' },
  { label: 'Dessert',    type: 'category', value: 'Dessert' },
];

// Categories to sample from for the discovery feed
const DISCOVERY_CATEGORIES = ['Chicken', 'Seafood', 'Vegetarian', 'Pasta', 'Dessert', 'Beef'];

// ─── Skeleton card ─────────────────────────────────────────────────────────
const SkeletonCard: React.FC = () => (
  <div className="flex flex-col overflow-hidden border border-[#1a1a1a] bg-white animate-pulse">
    <div className="h-52 bg-[#E8E2D8]" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-[#E8E2D8] rounded w-1/3" />
      <div className="h-5 bg-[#E8E2D8] rounded w-3/4" />
      <div className="h-4 bg-[#E8E2D8] rounded w-full" />
      <div className="h-4 bg-[#E8E2D8] rounded w-2/3" />
      <div className="flex justify-between pt-2">
        <div className="h-4 bg-[#E8E2D8] rounded w-1/4" />
        <div className="h-7 bg-[#E8E2D8] rounded w-1/3" />
      </div>
    </div>
  </div>
);

// ─── Empty state ───────────────────────────────────────────────────────────
const EmptyState: React.FC<{ query: string }> = ({ query }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
    <SmileyXEyes size={64} weight="thin" className="text-[#CDCBC0]" />
    <h3 className="text-xl font-bold text-[#1a1a1a]">No recipes found</h3>
    <p className="text-sm text-[#1a1a1a] opacity-60 max-w-xs">
      We couldn't find any results for <span className="font-semibold">"{query}"</span>.
      Try a different ingredient or dish name.
    </p>
  </div>
);

// ─── Error state ───────────────────────────────────────────────────────────
const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
    <WarningCircle size={64} weight="thin" className="text-[#E8500B]" />
    <h3 className="text-xl font-bold text-[#1a1a1a]">Something went wrong</h3>
    <p className="text-sm text-[#1a1a1a] opacity-60 max-w-xs">
      Failed to fetch recipes. Check your connection and try again.
    </p>
    <button
      onClick={onRetry}
      className="border-2 border-[#E8500B] bg-[#E8500B] text-white px-6 py-2.5 text-sm font-bold hover:bg-[#c94008] transition-colors"
    >
      Retry
    </button>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────
export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [committedQuery, setCommittedQuery] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');

  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDiscovery, setIsDiscovery] = useState(false);

  // Sidebar state
  const [mealTypes, setMealTypes] = useState<Record<string, boolean>>({ Breakfast: true, Lunch: false, Dinner: true, Snack: false });
  const [cookTime, setCookTime] = useState('15–30 min');
  const [diets, setDiets] = useState<Record<string, boolean>>({ Vegetarian: false, Vegan: false, 'Gluten-Free': false, Keto: false });
  const [difficulty, setDifficulty] = useState('Easy');
  const [minRating, setMinRating] = useState(4);

  // ── Discovery feed: sample a few recipes from each popular category ────
  const fetchDiscovery = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRecipes([]);
    setIsDiscovery(true);
    try {
      // Fetch from all discovery categories in parallel, take first 3 from each
      const batches = await Promise.all(
        DISCOVERY_CATEGORIES.map(cat => searchByCategory(cat))
      );
      // Interleave: pick up to 3 from each category, then shuffle
      const mixed: RecipeSummary[] = [];
      batches.forEach(batch => {
        mixed.push(...batch.slice(0, 3));
      });
      // Simple shuffle (Fisher-Yates)
      for (let i = mixed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
      }
      setRecipes(mixed);
    } catch {
      setError('fetch-failed');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Targeted search fetch ──────────────────────────────────────────────
  const fetchRecipes = useCallback(async (query: string, filter: typeof QUICK_FILTERS[0]) => {
    setLoading(true);
    setError(null);
    setRecipes([]);
    setIsDiscovery(false);
    try {
      let results: RecipeSummary[];
      if (filter.type === 'category' && filter.value) {
        results = await searchByCategory(filter.value);
      } else {
        results = await smartSearch(query);
      }
      setRecipes(results);
    } catch {
      setError('fetch-failed');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Decide what to load ────────────────────────────────────────────────
  useEffect(() => {
    const filter = QUICK_FILTERS.find(f => f.label === activeFilter) ?? QUICK_FILTERS[0];
    const isCategoryFilter = filter.type === 'category' && filter.value;

    if (!committedQuery.trim() && !isCategoryFilter) {
      // No query and no category pill — show discovery feed
      fetchDiscovery();
    } else {
      fetchRecipes(committedQuery, filter);
    }
  }, [committedQuery, activeFilter, fetchRecipes, fetchDiscovery]);

  // ── Sync with URL query param ──────────────────────────────────────────
  useEffect(() => {
    if (queryParam !== committedQuery) {
      setCommittedQuery(queryParam);
      setActiveFilter('All');
    }
  }, [queryParam, committedQuery]);

  // ── Quick filter pill click ────────────────────────────────────────────
  const handleFilterClick = (label: string) => {
    setActiveFilter(label);
    if (label === 'All') {
      setCommittedQuery(queryParam);
    }
  };

  // ── Sort (client-side) ─────────────────────────────────────────────────
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'A → Z') return a.title.localeCompare(b.title);
    if (sortBy === 'Z → A') return b.title.localeCompare(a.title);
    return 0;
  });

  const displayQuery = queryParam;
  const hasNoQuery = !committedQuery.trim() && activeFilter === 'All';

  // ── Heading logic ──────────────────────────────────────────────────────
  const heading = activeFilter !== 'All'
    ? <><span className="text-[#E8500B]">{activeFilter}</span> Recipes</>
    : displayQuery
      ? <>Results for <span className="text-[#E8500B]">"{displayQuery}"</span></>
      : <>Discover <span className="text-[#E8500B]">Recipes</span></>;

  const subheading = loading
    ? 'Loading recipes…'
    : error
      ? 'Error fetching results'
      : hasNoQuery && isDiscovery
        ? 'A hand-picked mix across popular categories — search above to find something specific'
        : `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} found`;

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF6EF' }}>
      <main className="pt-16 layout-container">

        {/* ── Header ── */}
        <div className="pt-10 pb-6">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">{heading}</h1>
          <p className="mt-1 text-sm text-[#1a1a1a] opacity-60">{subheading}</p>

          {/* Quick filter pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {QUICK_FILTERS.map(f => (
              <button
                key={f.label}
                onClick={() => handleFilterClick(f.label)}
                className={`rounded-full border-2 px-5 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  activeFilter === f.label
                    ? 'bg-[#E8500B] border-[#E8500B] text-white'
                    : 'border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Two-col layout ── */}
        <div className="flex gap-10 pb-20">

          <SearchSidebar
            mealTypes={mealTypes} setMealTypes={setMealTypes}
            cookTime={cookTime} setCookTime={setCookTime}
            diets={diets} setDiets={setDiets}
            difficulty={difficulty} setDifficulty={setDifficulty}
            minRating={minRating} setMinRating={setMinRating}
          />

          {/* ── Results ── */}
          <div className="flex-1 min-w-0">

            {/* Results bar */}
            {!loading && !error && recipes.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#1a1a1a] opacity-70">
                  Showing <span className="font-bold text-[#000]">{sortedRecipes.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#1a1a1a] opacity-70 font-medium">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border-2 border-[#1a1a1a] bg-white text-sm font-semibold text-[#1a1a1a] py-1.5 px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E8500B] cursor-pointer"
                  >
                    {['Relevance', 'A → Z', 'Z → A'].map(opt => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <ErrorState onRetry={() => hasNoQuery ? fetchDiscovery() : fetchRecipes(committedQuery, QUICK_FILTERS.find(f => f.label === activeFilter) ?? QUICK_FILTERS[0])} />
            )}

            {/* Empty */}
            {!loading && !error && recipes.length === 0 && !hasNoQuery && (
              <EmptyState query={displayQuery} />
            )}

            {/* Results grid */}
            {!loading && !error && sortedRecipes.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedRecipes.map(recipe => (
                  <SearchResultCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}

            {/* Footer hint */}
            {!loading && !error && recipes.length > 0 && (
              <p className="mt-10 text-center text-xs text-[#1a1a1a] opacity-40">
                {isDiscovery
                  ? 'Showing a curated discovery mix — search above for specific results'
                  : `Showing all ${recipes.length} results from TheMealDB`}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResultsPage;
