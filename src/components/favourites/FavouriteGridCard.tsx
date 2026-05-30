import React, { useState } from 'react';
import { Heart, Clock } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import type { FavouriteItem } from '../../types/favourite';
import { useFavourites } from '../../context/FavouritesContext';

export const FavouriteGridCard: React.FC<{ recipe: FavouriteItem; onRemove: (id: string) => void }> = ({ recipe, onRemove }) => {
  const [hovered, setHovered] = useState(false);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();

  const { isFavourite } = useFavourites();
  const saved = isFavourite(recipe.id);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRemoving(true);
    setTimeout(() => onRemove(recipe.id), 300);
  };

  return (
    <article
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="flex flex-col overflow-hidden border border-[#1a1a1a] bg-white transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered ? '6px 6px 0px #1a1a1a' : 'none',
        transform: hovered ? 'translate(-2px, -2px)' : removing ? 'scale(0.95)' : 'translate(0,0)',
        opacity: removing ? 0 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white bg-[#E8500B]"
        >
          {recipe.category}
        </span>
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 w-8 h-8 bg-white border border-[#1a1a1a] flex items-center justify-center transition-colors hover:bg-red-50 hover:border-red-400 hover:text-red-500 text-[#1a1a1a]"
          title="Remove from favourites"
        >
          <Heart size={16} weight="fill" color="#E8500B" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#E8500B]">{recipe.area}</span>
        <h3 className="mt-1.5 text-[15px] font-bold text-[#000] leading-snug">{recipe.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1a1a1a] opacity-65">{recipe.category} · TheMealDB</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-[#1a1a1a] opacity-75">
          <span className="flex items-center gap-1"><Clock size={13} color="#E8500B" weight="bold" /> Saved</span>
          <span className="flex items-center gap-1 ml-auto">
            <span className="text-[#E8500B]">♥</span>
            <span className="font-bold text-[#000]">{saved ? 'In Favourites' : ''}</span>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F0EAE0] pt-4">
          <span className="text-[11px] text-[#1a1a1a] opacity-50">{new Date(recipe.savedAt).toLocaleDateString()}</span>
          <span
            className="border border-[#1a1a1a] px-4 py-1.5 text-xs font-semibold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            View Recipe →
          </span>
        </div>
      </div>
    </article>
  );
};
