import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { isBookItem, isMovieItem } from '../types/watchlog';
import { useWatchlistStore } from '../store/useWatchlistStore';
import {
  enrichWatchlistImages,
  watchlistImageChanged,
} from '../utils/enrichWatchlistImages';

const WatchlistImageEnrichment = () => {
  const {
    watchlist,
    enrichmentAttemptedIds,
    markEnrichmentAttempted,
    mergeEnrichedItems,
    setIsEnrichingImages,
  } = useWatchlistStore(
    useShallow((state) => ({
      watchlist: state.items,
      enrichmentAttemptedIds: state.enrichmentAttemptedIds,
      markEnrichmentAttempted: state.markEnrichmentAttempted,
      mergeEnrichedItems: state.mergeEnrichedItems,
      setIsEnrichingImages: state.setIsEnrichingImages,
    })),
  );

  useEffect(() => {
    const itemsToEnrich = watchlist.filter((item) => {
      const needsImage =
        (isMovieItem(item) && !item.posterUrl) ||
        (isBookItem(item) && !item.coverUrl);

      return needsImage && !enrichmentAttemptedIds.includes(item.id);
    });

    if (itemsToEnrich.length === 0) {
      return;
    }

    markEnrichmentAttempted(itemsToEnrich.map((item) => item.id));

    const controller = new AbortController();
    setIsEnrichingImages(true);

    void enrichWatchlistImages(itemsToEnrich, controller.signal)
      .then((enrichedItems) => {
        if (controller.signal.aborted) {
          return;
        }

        const changedItems = enrichedItems.filter((enriched) => {
          const original = watchlist.find((item) => item.id === enriched.id);
          return original ? watchlistImageChanged(original, enriched) : false;
        });

        if (changedItems.length > 0) {
          mergeEnrichedItems(changedItems);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsEnrichingImages(false);
        }
      });

    return () => {
      controller.abort();
      setIsEnrichingImages(false);
    };
  }, [
    enrichmentAttemptedIds,
    markEnrichmentAttempted,
    mergeEnrichedItems,
    setIsEnrichingImages,
    watchlist,
  ]);

  return null;
};

export default WatchlistImageEnrichment;
