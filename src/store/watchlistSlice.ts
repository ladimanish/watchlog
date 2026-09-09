import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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

export interface WatchlistState {
  items: WatchItem[];
  selectedId: string | null;
  isEnrichingImages: boolean;
  enrichmentAttemptedIds: string[];
}

const initialState: WatchlistState = {
  items: mockWatchlist,
  selectedId: null,
  isEnrichingImages: false,
  enrichmentAttemptedIds: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<WatchItem>) {
      const isDuplicate = state.items.some(
        (existing) =>
          existing.externalId === action.payload.externalId &&
          existing.type === action.payload.type,
      );

      if (!isDuplicate) {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (state.selectedId === action.payload) {
        state.selectedId = null;
      }

      state.enrichmentAttemptedIds = state.enrichmentAttemptedIds.filter(
        (id) => id !== action.payload,
      );
    },
    selectItem(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    updateItem(
      state,
      action: PayloadAction<{ id: string; updates: WatchlistUpdate }>,
    ) {
      const item = state.items.find((entry) => entry.id === action.payload.id);

      if (!item) {
        return;
      }

      const { updates } = action.payload;
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

      item.status = nextStatus;
      item.rating = nextRating;
      item.dateCompleted = nextDateCompleted;
    },
    mergeEnrichedItems(state, action: PayloadAction<WatchItem[]>) {
      const enrichedById = new Map(
        action.payload.map((item) => [item.id, item]),
      );

      state.items = state.items.map(
        (item) => enrichedById.get(item.id) ?? item,
      );
    },
    markEnrichmentAttempted(state, action: PayloadAction<string[]>) {
      action.payload.forEach((id) => {
        if (!state.enrichmentAttemptedIds.includes(id)) {
          state.enrichmentAttemptedIds.push(id);
        }
      });
    },
    setIsEnrichingImages(state, action: PayloadAction<boolean>) {
      state.isEnrichingImages = action.payload;
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export const watchlistReducer = watchlistSlice.reducer;

export const selectWatchlistItems = (state: { watchlist: WatchlistState }) =>
  state.watchlist.items;

export const selectSelectedId = (state: { watchlist: WatchlistState }) =>
  state.watchlist.selectedId;

export const selectIsEnrichingImages = (state: {
  watchlist: WatchlistState;
}) => state.watchlist.isEnrichingImages;

export const selectEnrichmentAttemptedIds = (state: {
  watchlist: WatchlistState;
}) => state.watchlist.enrichmentAttemptedIds;

export const selectSelectedItem = (state: { watchlist: WatchlistState }) => {
  const { items, selectedId } = state.watchlist;

  if (selectedId === null) {
    return null;
  }

  return items.find((item) => item.id === selectedId) ?? null;
};

export const selectIsInWatchlist =
  (externalId: string, type: MediaType) =>
  (state: { watchlist: WatchlistState }): boolean =>
    state.watchlist.items.some(
      (item) => item.externalId === externalId && item.type === type,
    );
