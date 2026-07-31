import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  MediaType,
  StarRating,
  WatchItem,
  WatchStatus,
} from '../types/watchlog';
import { mockWatchlist } from '../__fixtures__/watchItems';

interface WatchlistUpdate {
  status?: WatchStatus;
  rating?: StarRating | null;
}

interface WatchlistContextValue {
  watchlist: WatchItem[];
  selectedId: string | null;
  selectedItem: WatchItem | null;
  addItem: (item: WatchItem) => boolean;
  removeItem: (id: string) => void;
  selectItem: (id: string | null) => void;
  updateItem: (id: string, updates: WatchlistUpdate) => void;
  isInWatchlist: (externalId: string, type: MediaType) => boolean;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(
  undefined,
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const [watchlist, setWatchlist] = useState<WatchItem[]>(mockWatchlist);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addItem = useCallback((item: WatchItem): boolean => {
    let added = false;

    setWatchlist((prev) => {
      const isDuplicate = prev.some(
        (existing) =>
          existing.externalId === item.externalId &&
          existing.type === item.type,
      );

      if (isDuplicate) {
        return prev;
      }

      added = true;
      return [...prev, item];
    });

    return added;
  }, []);

  const removeItem = useCallback((id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const selectItem = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const updateItem = useCallback((id: string, updates: WatchlistUpdate) => {
    setWatchlist((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        let nextStatus = updates.status ?? item.status;
        let nextRating = item.rating;
        let nextDateCompleted = item.dateCompleted;

        if (updates.status !== undefined) {
          nextStatus = updates.status;

          if (nextStatus === 'done') {
            nextDateCompleted = new Date().toISOString();
          } else {
            nextRating = null;
            nextDateCompleted = null;
          }
        }

        if (updates.rating !== undefined && nextStatus === 'done') {
          nextRating = updates.rating;
        }

        return {
          ...item,
          status: nextStatus,
          rating: nextRating,
          dateCompleted: nextDateCompleted,
        };
      }),
    );
  }, []);

  const isInWatchlist = useCallback(
    (externalId: string, type: MediaType) =>
      watchlist.some(
        (item) => item.externalId === externalId && item.type === type,
      ),
    [watchlist],
  );

  const selectedItem = useMemo(
    () =>
      selectedId === null
        ? null
        : watchlist.find((item) => item.id === selectedId) ?? null,
    [watchlist, selectedId],
  );

  const value = useMemo(
    () => ({
      watchlist,
      selectedId,
      selectedItem,
      addItem,
      removeItem,
      selectItem,
      updateItem,
      isInWatchlist,
    }),
    [
      watchlist,
      selectedId,
      selectedItem,
      addItem,
      removeItem,
      selectItem,
      updateItem,
      isInWatchlist,
    ],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = (): WatchlistContextValue => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }

  return context;
};
