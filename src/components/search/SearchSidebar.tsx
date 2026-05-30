import React, { useState } from 'react';
import { Faders, CaretDown, CaretUp } from '@phosphor-icons/react';

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[#F0EAE0] pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-4"
      >
        {title}
        {open ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
      </button>
      {open && children}
    </div>
  );
};

interface SearchSidebarProps {
  mealTypes: Record<string, boolean>;
  setMealTypes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  cookTime: string;
  setCookTime: (val: string) => void;
  diets: Record<string, boolean>;
  setDiets: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  difficulty: string;
  setDifficulty: (val: string) => void;
  minRating: number;
  setMinRating: (val: number) => void;
}

export const SearchSidebar: React.FC<SearchSidebarProps> = ({
  mealTypes, setMealTypes,
  cookTime, setCookTime,
  diets, setDiets,
  difficulty, setDifficulty,
  minRating, setMinRating
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const filterContent = (
    <div className="p-6">

      <FilterSection title="Meal Type">
        {Object.keys(mealTypes).map(key => (
          <label key={key} className="flex items-center gap-3 mb-2.5 cursor-pointer text-sm text-[#1a1a1a]">
            <input
              type="checkbox"
              checked={mealTypes[key]}
              onChange={() => setMealTypes(prev => ({ ...prev, [key]: !prev[key] }))}
              className="w-4 h-4 accent-[#E8500B] cursor-pointer"
            />
            {key}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Cook Time">
        {['Under 15 min', '15–30 min', '30–60 min', '60+ min'].map(opt => (
          <label key={opt} className="flex items-center gap-3 mb-2.5 cursor-pointer text-sm text-[#1a1a1a]">
            <input
              type="radio"
              name="cookTime"
              checked={cookTime === opt}
              onChange={() => setCookTime(opt)}
              className="w-4 h-4 accent-[#E8500B] cursor-pointer"
            />
            {opt}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Diet">
        {Object.keys(diets).map(key => (
          <label key={key} className="flex items-center gap-3 mb-2.5 cursor-pointer text-sm text-[#1a1a1a]">
            <input
              type="checkbox"
              checked={diets[key]}
              onChange={() => setDiets(prev => ({ ...prev, [key]: !prev[key] }))}
              className="w-4 h-4 accent-[#E8500B] cursor-pointer"
            />
            {key}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Difficulty">
        <div className="flex gap-2">
          {['Easy', 'Medium', 'Hard'].map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`flex-1 py-1.5 text-xs font-semibold border-2 rounded-full transition-all ${
                difficulty === d
                  ? 'bg-[#E8500B] border-[#E8500B] text-white'
                  : 'border-[#1a1a1a] text-[#1a1a1a] hover:border-[#E8500B] hover:text-[#E8500B]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Min Rating">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setMinRating(star)}
              className="text-xl transition-colors"
              style={{ color: star <= minRating ? '#E8500B' : '#CDCBC0' }}
            >
              ★
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-[#1a1a1a] opacity-60">
          {minRating} star{minRating > 1 ? 's' : ''} & above
        </p>
      </FilterSection>

      <button className="w-full mt-2 text-xs font-semibold text-[#E8500B] hover:underline text-center transition-colors">
        Reset all filters
      </button>
    </div>
  );

  return (
    <>
      {/* ── Mobile / Tablet: single collapsible box ── */}
      <div className="lg:hidden mb-6 border-2 border-[#1a1a1a] bg-white">
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-bold text-[#1a1a1a] uppercase tracking-wider"
        >
          <span className="flex items-center gap-2"><Faders size={16} weight="bold" /> Filter Results</span>
          {mobileOpen ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
        </button>
        {mobileOpen && (
          <div className="border-t-2 border-[#1a1a1a]">{filterContent}</div>
        )}
      </div>

      {/* ── Desktop: sticky sidebar ── */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 border-2 border-[#1a1a1a] bg-white">
          <div className="px-6 pt-6 pb-2 flex items-center gap-2 text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">
            <Faders size={16} weight="bold" /> Filter Results
          </div>
          {filterContent}
        </div>
      </aside>
    </>
  );
};
