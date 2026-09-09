import { useCallback } from 'react';
import type { MediaType, WatchItem } from '../types/watchlog';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectIsEnrichingImages,
  selectSelectedItem,
  selectWatchlistItems,
  watchlistActions,
  type WatchlistUpdate,
} from '../store/watchlistSlice';

export type { WatchlistUpdate };

export const useWatchlist = () => {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector(selectWatchlistItems);
  const selectedItem = useAppSelector(selectSelectedItem);
  const isEnrichingImages = useAppSelector(selectIsEnrichingImages);

  const addItem = useCallback(
    (item: WatchItem): boolean => {
      const isDuplicate = watchlist.some(
        (existing) =>
          existing.externalId === item.externalId &&
          existing.type === item.type,
      );

      if (isDuplicate) {
        return false;
      }

      dispatch(watchlistActions.addItem(item));
      return true;
    },
    [dispatch, watchlist],
  );

  const removeItem = useCallback(
    (id: string) => {
      dispatch(watchlistActions.removeItem(id));
    },
    [dispatch],
  );

  const selectItem = useCallback(
    (id: string | null) => {
      dispatch(watchlistActions.selectItem(id));
    },
    [dispatch],
  );

  const updateItem = useCallback(
    (id: string, updates: WatchlistUpdate) => {
      dispatch(watchlistActions.updateItem({ id, updates }));
    },
    [dispatch],
  );

  const isInWatchlist = useCallback(
    (externalId: string, type: MediaType) =>
      watchlist.some(
        (item) => item.externalId === externalId && item.type === type,
      ),
    [watchlist],
  );

  return {
    watchlist,
    selectedId: selectedItem?.id ?? null,
    selectedItem,
    isEnrichingImages,
    addItem,
    removeItem,
    selectItem,
    updateItem,
    isInWatchlist,
  };
};
