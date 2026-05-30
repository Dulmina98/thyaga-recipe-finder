import React, { useState } from 'react';
import { Clock, Fire, Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../../data/favouritesMockData';

export const FavouriteListRow: React.FC<{ recipe: Recipe; onRemove: (id: number) => void }> = ({ recipe, onRemove }) => {
  const [hovered, setHovered] = useState(false);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRemoving(true);
    setTimeout(() => onRemove(recipe.id), 300);
  };

  return (
    <article
      onClick={() => navigate('/recipe')}
      className="flex gap-5 border border-[#1a1a1a] bg-white p-4 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered ? '6px 6px 0px #1a1a1a' : 'none',
        transform: hovered ? 'translate(-2px, -2px)' : removing ? 'scale(0.98)' : 'translate(0,0)',
        opacity: removing ? 0 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-28 h-24 flex-shrink-0 overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <span
          className="absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: recipe.tagColor }}
        >
          {recipe.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#E8500B]">{recipe.cuisine}</span>
          <h3 className="text-[15px] font-bold text-[#000] leading-snug truncate">{recipe.title}</h3>
          <p className="mt-1 text-sm text-[#1a1a1a] opacity-60 line-clamp-1">{recipe.desc}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#1a1a1a] opacity-70 mt-2">
          <span className="flex items-center gap-1"><Clock size={13} color="#E8500B" weight="bold" /> {recipe.time}</span>
          <span className="flex items-center gap-1"><Fire size={13} color="#E8500B" weight="bold" /> {recipe.cal}</span>
          <span className="flex items-center gap-1">
            <span className="text-[#E8500B]">★</span>
            <span className="font-bold text-[#000]">{recipe.rating}</span>
            <span className="opacity-60">({recipe.reviews})</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <button
          onClick={handleRemove}
          className="flex items-center gap-1.5 text-xs font-medium text-[#1a1a1a] opacity-50 hover:opacity-100 hover:text-red-500 transition-all"
          title="Remove"
        >
          <Trash size={15} weight="bold" /> Remove
        </button>
        <span
          className="border border-[#1a1a1a] px-4 py-1.5 text-xs font-semibold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white whitespace-nowrap"
        >
          View Recipe →
        </span>
      </div>
    </article>
  );
};
