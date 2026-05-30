import React, { useState } from 'react';
import { SearchNavigation } from '../components/search/SearchNavigation';
import { SearchSidebar } from '../components/search/SearchSidebar';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { QUICK_FILTERS, RECIPES } from '../data/searchMockData';

export const SearchResultsPage: React.FC = () => {
  const [query, setQuery] = useState('chicken pasta');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');
  const [recipes, setRecipes] = useState(RECIPES);

  // Meal type checkboxes
  const [mealTypes, setMealTypes] = useState<Record<string, boolean>>({ Breakfast: true, Lunch: false, Dinner: true, Snack: false });
  // Cook time radios
  const [cookTime, setCookTime] = useState('15–30 min');
  // Diet checkboxes
  const [diets, setDiets] = useState<Record<string, boolean>>({ Vegetarian: false, Vegan: false, 'Gluten-Free': false, Keto: false });
  // Difficulty
  const [difficulty, setDifficulty] = useState('Easy');
  // Min rating
  const [minRating, setMinRating] = useState(4);

  const toggleSave = (id: number) =>
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, saved: !r.saved } : r));

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF6EF' }}>

      <SearchNavigation query={query} setQuery={setQuery} />

      {/* ── Page content ── */}
      <main className="pt-16 layout-container">

        {/* Header bar */}
        <div className="pt-10 pb-6">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">
            Results for{' '}
            <span className="text-[#E8500B]">"{query || '…'}"</span>
          </h1>
          <p className="mt-1 text-sm text-[#1a1a1a] opacity-60">142 recipes found</p>

          {/* Quick filter pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {QUICK_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full border-2 px-5 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  activeFilter === f
                    ? 'bg-[#E8500B] border-[#E8500B] text-white'
                    : 'border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-white'
                }`}
              >
                {f}
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

          {/* ── Results grid ── */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#1a1a1a] opacity-70">
                Showing <span className="font-bold text-[#000]">1–{recipes.length}</span> of{' '}
                <span className="font-bold text-[#000]">142</span> results
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-[#1a1a1a] opacity-70 font-medium">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border-2 border-[#1a1a1a] bg-white text-sm font-semibold text-[#1a1a1a] py-1.5 px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E8500B] cursor-pointer"
                >
                  {['Relevance', 'Rating', 'Cook Time', 'Calories', 'Most Saved'].map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {recipes.map(recipe => (
                <SearchResultCard key={recipe.id} recipe={recipe} onToggleSave={toggleSave} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3, '…', 16].map((p, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 text-sm font-semibold border-2 transition-all ${
                    p === 1
                      ? 'bg-[#E8500B] border-[#E8500B] text-white'
                      : 'border-[#1a1a1a] text-[#1a1a1a] bg-white hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="px-4 h-9 text-sm font-semibold border-2 border-[#1a1a1a] text-[#1a1a1a] bg-white hover:bg-[#1a1a1a] hover:text-white transition-all">
                Next →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResultsPage;
