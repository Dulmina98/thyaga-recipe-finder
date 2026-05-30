import React, { useState } from 'react';
import { BookmarkSimple, Plus } from '@phosphor-icons/react';
import { COLLECTIONS } from '../../data/favouritesMockData';

interface FavouritesSidebarProps {
  activeCollection: string;
  setActiveCollection: (val: string) => void;
  collectionCounts: Record<string, number>;
  totalFavourites: number;
}

export const FavouritesSidebar: React.FC<FavouritesSidebarProps> = ({
  activeCollection,
  setActiveCollection,
  collectionCounts,
  totalFavourites
}) => {
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 pt-10">
      <div className="sticky top-24">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E8500B] mb-1">My Library</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Favourites</h2>
          <p className="text-sm text-[#1a1a1a] opacity-60 mt-1">{totalFavourites} saved recipes</p>
        </div>

        {/* Collections */}
        <div className="border-2 border-[#1a1a1a] bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-[#F0EAE0]">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a] opacity-50">Collections</p>
          </div>
          {COLLECTIONS.map((col) => (
            <button
              key={col}
              onClick={() => setActiveCollection(col)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-b border-[#F0EAE0] last:border-b-0 ${
                activeCollection === col
                  ? 'bg-[#E8500B] text-white'
                  : 'text-[#1a1a1a] hover:bg-[#FAF6EF]'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookmarkSimple size={15} weight={activeCollection === col ? "fill" : "regular"} />
                {col}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  activeCollection === col ? 'bg-white/20 text-white' : 'bg-[#F0EAE0] text-[#1a1a1a]'
                }`}
              >
                {collectionCounts[col]}
              </span>
            </button>
          ))}

          {/* New collection */}
          {showNewCollection ? (
            <div className="px-4 py-3 flex gap-2 border-t border-[#F0EAE0]">
              <input
                autoFocus
                value={newCollectionName}
                onChange={e => setNewCollectionName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') setShowNewCollection(false); if (e.key === 'Escape') setShowNewCollection(false); }}
                placeholder="Collection name…"
                className="flex-1 text-sm border border-[#1a1a1a] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#E8500B]"
              />
              <button onClick={() => setShowNewCollection(false)} className="text-xs font-bold text-[#E8500B] hover:underline">
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewCollection(true)}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#1a1a1a] opacity-50 hover:opacity-100 border-t border-[#F0EAE0] transition-opacity"
            >
              <Plus size={14} weight="bold" /> New collection
            </button>
          )}
        </div>

        {/* Stats card */}
        <div className="mt-6 border-2 border-[#1a1a1a] bg-[#E8500B] p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-white opacity-75">Your Stats</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { value: totalFavourites.toString(), label: 'Saved' },
              { value: '3', label: 'Collections' },
              { value: '2', label: 'Cooked', },
              { value: '4.8', label: 'Avg Rating' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white opacity-75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
