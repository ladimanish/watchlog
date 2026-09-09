import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { mockWatchlist } from '../__fixtures__/watchItems';
import type {
  MediaType,
  StarRating,
  WatchItem,
  WatchStatus,
} from '../types/watchlog';

export interface WatchlistUpdate {
  status?: WatchStatus;
  rating?: StarRating | null;
}

interface WatchlistState {
  items: WatchItem[];
  selectedId: string | null;
  isEnrichingImages: boolean;
  enrichmentAttemptedIds: string[];
}

interface WatchlistActions {
  addItem: (item: WatchItem) => boolean;
  removeItem: (id: string) => void;
  selectItem: (id: string | null) => void;
  updateItem: (id: string, updates: WatchlistUpdate) => void;
  mergeEnrichedItems: (items: WatchItem[]) => void;
  markEnrichmentAttempted: (ids: string[]) => void;
  setIsEnrichingImages: (value: boolean) => void;
}

export type WatchlistStore = WatchlistState & WatchlistActions;

const initialState: WatchlistState = {
  items: mockWatchlist,
  selectedId: null,
  isEnrichingImages: false,
  enrichmentAttemptedIds: [],
};

export const useWatchlistStore = create<WatchlistStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addItem: (item) => {
          const isDuplicate = get().items.some(
            (existing) =>
              existing.externalId === item.externalId &&
              existing.type === item.type,
          );

          if (isDuplicate) {
            return false;
          }

          set((state) => ({
            items: [...state.items, item],
          }));

          return true;
        },

        removeItem: (id) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
            enrichmentAttemptedIds: state.enrichmentAttemptedIds.filter(
              (attemptedId) => attemptedId !== id,
            ),
          }));
        },

        selectItem: (id) => {
          set({ selectedId: id });
        },

        updateItem: (id, updates) => {
          set((state) => ({
            items: state.items.map((item) => {
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
          }));
        },

        mergeEnrichedItems: (enrichedItems) => {
          const enrichedById = new Map(
            enrichedItems.map((item) => [item.id, item]),
          );

          set((state) => ({
            items: state.items.map(
              (item) => enrichedById.get(item.id) ?? item,
            ),
          }));
        },

        markEnrichmentAttempted: (ids) => {
          set((state) => {
            const nextAttemptedIds = [...state.enrichmentAttemptedIds];

            ids.forEach((id) => {
              if (!nextAttemptedIds.includes(id)) {
                nextAttemptedIds.push(id);
              }
            });

            return { enrichmentAttemptedIds: nextAttemptedIds };
          });
        },

        setIsEnrichingImages: (value) => {
          set({ isEnrichingImages: value });
        },
      }),
      {
        name: 'watchlog-watchlist',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          selectedId: state.selectedId,
          enrichmentAttemptedIds: state.enrichmentAttemptedIds,
        }),
      },
    ),
    { name: 'WatchlistStore' },
  ),
);

export const selectWatchlistItems = (state: WatchlistStore) => state.items;

export const selectSelectedItem = (state: WatchlistStore) => {
  if (state.selectedId === null) {
    return null;
  }

  return state.items.find((item) => item.id === state.selectedId) ?? null;
};

export const selectIsInWatchlist =
  (externalId: string, type: MediaType) => (state: WatchlistStore) =>
    state.items.some(
      (item) => item.externalId === externalId && item.type === type,
    );
