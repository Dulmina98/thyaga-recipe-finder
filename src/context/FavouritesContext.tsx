import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { FavouriteItem } from '../types/favourite';

const STORAGE_KEY = 'recipefinder_favourites';

interface FavouritesContextValue {
  favourites: FavouriteItem[];
  isFavourite: (id: string) => boolean;
  addFavourite: (item: Omit<FavouriteItem, 'savedAt'>) => void;
  removeFavourite: (id: string) => void;
  toggleFavourite: (item: Omit<FavouriteItem, 'savedAt'>) => boolean;
  count: number;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

function loadFromStorage(): FavouriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: FavouriteItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(favourites);
  }, [favourites]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavourites(loadFromStorage());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const isFavourite = useCallback(
    (id: string) => favourites.some(f => f.id === id),
    [favourites],
  );

  const addFavourite = useCallback(
    (item: Omit<FavouriteItem, 'savedAt'>) => {
      setFavourites(prev => {
        if (prev.some(f => f.id === item.id)) return prev; // already saved
        return [{ ...item, savedAt: new Date().toISOString() }, ...prev];
      });
    },
    [],
  );

  const removeFavourite = useCallback((id: string) => {
    setFavourites(prev => prev.filter(f => f.id !== id));
  }, []);

  const toggleFavourite = useCallback(
    (item: Omit<FavouriteItem, 'savedAt'>): boolean => {
      let added = false;
      setFavourites(prev => {
        if (prev.some(f => f.id === item.id)) {
          // Remove
          added = false;
          return prev.filter(f => f.id !== item.id);
        }
        // Add
        added = true;
        return [{ ...item, savedAt: new Date().toISOString() }, ...prev];
      });
      return added;
    },
    [],
  );

  const value: FavouritesContextValue = {
    favourites,
    isFavourite,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    count: favourites.length,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export function useFavourites(): FavouritesContextValue {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error('useFavourites must be used inside <FavouritesProvider>');
  }
  return ctx;
}
