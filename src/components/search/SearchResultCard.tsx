import React, { useState } from 'react';
import { Heart, Clock, Fire } from '@phosphor-icons/react';
import { RECIPES } from '../../data/searchMockData';

export const SearchResultCard: React.FC<{
  recipe: typeof RECIPES[0];
  onToggleSave: (id: number) => void;
}> = ({ recipe, onToggleSave }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="flex flex-col overflow-hidden border border-[#1a1a1a] bg-white transition-all duration-200 cursor-pointer"
      style={{
        boxShadow: hovered ? '6px 6px 0px #1a1a1a' : 'none',
        transform: hovered ? 'translate(-2px, -2px)' : 'translate(0,0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: recipe.tagColor }}
        >
          {recipe.tag}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(recipe.id); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white border border-[#1a1a1a] flex items-center justify-center transition-colors hover:bg-[#FAF6EF]"
        >
          <Heart size={16} weight={recipe.saved ? "fill" : "regular"} color={recipe.saved ? "#E8500B" : "#1a1a1a"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-bold text-[#000000] leading-snug">{recipe.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1a1a1a] opacity-70">{recipe.desc}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-[#1a1a1a] opacity-80">
          <span className="flex items-center gap-1"><Clock size={13} color="#E8500B" weight="bold" /> {recipe.time}</span>
          <span className="flex items-center gap-1"><Fire size={13} color="#E8500B" weight="bold" /> {recipe.cal}</span>
          <span className="flex items-center gap-1 ml-auto">
            <span className="text-[#E8500B]">★</span>
            <span className="font-bold text-[#000]">{recipe.rating}</span>
            <span className="text-[#1a1a1a] opacity-60">({recipe.reviews})</span>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F0EAE0] pt-4">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(recipe.id); }}
            className="flex items-center gap-1.5 text-xs font-medium text-[#1a1a1a] hover:text-[#E8500B] transition-colors"
          >
            <Heart size={16} weight={recipe.saved ? "fill" : "regular"} color={recipe.saved ? "#E8500B" : "#1a1a1a"} />
            {recipe.saved ? 'Saved' : 'Save'}
          </button>
          <a
            href="#"
            className="border border-[#1a1a1a] px-4 py-1.5 text-xs font-semibold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            View Recipe →
          </a>
        </div>
      </div>
    </article>
  );
};
