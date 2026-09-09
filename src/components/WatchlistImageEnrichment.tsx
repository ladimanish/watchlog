import { useEffect } from 'react';
import { isBookItem, isMovieItem } from '../types/watchlog';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectEnrichmentAttemptedIds,
  selectWatchlistItems,
  watchlistActions,
} from '../store/watchlistSlice';
import {
  enrichWatchlistImages,
  watchlistImageChanged,
} from '../utils/enrichWatchlistImages';

const WatchlistImageEnrichment = () => {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector(selectWatchlistItems);
  const enrichmentAttemptedIds = useAppSelector(selectEnrichmentAttemptedIds);
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

    dispatch(
      watchlistActions.markEnrichmentAttempted(
        itemsToEnrich.map((item) => item.id),
      ),
    );

    const controller = new AbortController();
    dispatch(watchlistActions.setIsEnrichingImages(true));

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
          dispatch(watchlistActions.mergeEnrichedItems(changedItems));
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          dispatch(watchlistActions.setIsEnrichingImages(false));
        }
      });

    return () => {
      controller.abort();
      dispatch(watchlistActions.setIsEnrichingImages(false));
    };
  }, [dispatch, enrichmentAttemptedIds, watchlist]);

  return null;
};

export default WatchlistImageEnrichment;
