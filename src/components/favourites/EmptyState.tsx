import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from '@phosphor-icons/react';

export const EmptyState: React.FC<{ collection: string }> = ({ collection }) => (
  <div className="flex flex-col items-center justify-center py-28 text-center">
    <div className="w-20 h-20 border-2 border-[#1a1a1a] flex items-center justify-center mb-6" style={{ backgroundColor: '#F0EAE0' }}>
      <Heart size={36} color="#1a1a1a" />
    </div>
    <h3 className="text-xl font-bold text-[#1a1a1a]">No saved recipes yet</h3>
    <p className="mt-2 text-sm text-[#1a1a1a] opacity-60 max-w-xs">
      {collection === 'All Saved'
        ? 'Start exploring and tap the heart on any recipe to save it here.'
        : `You haven't saved anything to "${collection}" yet.`}
    </p>
    <Link
      to="/search"
      className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#E8500B] bg-[#E8500B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#c94008] transition-colors"
    >
      Explore Recipes
    </Link>
  </div>
);
