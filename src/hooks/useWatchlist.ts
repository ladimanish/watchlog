import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { MediaType, WatchItem } from '../types/watchlog';
import {
  selectSelectedItem,
  useWatchlistStore,
  type WatchlistUpdate,
} from '../store/useWatchlistStore';

export type { WatchlistUpdate };

export const useWatchlist = () => {
  const {
    watchlist,
    selectedItem,
    isEnrichingImages,
    addItemAction,
    removeItem,
    selectItem,
    updateItem,
  } = useWatchlistStore(
    useShallow((state) => ({
      watchlist: state.items,
      selectedItem: selectSelectedItem(state),
      isEnrichingImages: state.isEnrichingImages,
      addItemAction: state.addItem,
      removeItem: state.removeItem,
      selectItem: state.selectItem,
      updateItem: state.updateItem,
    })),
  );

  const addItem = useCallback(
    (item: WatchItem): boolean => addItemAction(item),
    [addItemAction],
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
