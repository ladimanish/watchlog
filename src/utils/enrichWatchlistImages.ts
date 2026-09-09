import { fetchBookCoverUrl } from '../api/openLibraryClient';
import { fetchMoviePosterUrl } from '../api/tmdbClient';
import type { WatchItem } from '../types/watchlog';
import { isBookItem, isMovieItem } from '../types/watchlog';

const enrichWatchItem = async (
  item: WatchItem,
  signal?: AbortSignal,
): Promise<WatchItem> => {
  if (isMovieItem(item) && !item.posterUrl) {
    const posterUrl = await fetchMoviePosterUrl(item.externalId, signal);

    if (posterUrl) {
      return { ...item, posterUrl };
    }
  }

  if (isBookItem(item) && !item.coverUrl) {
    const coverUrl = await fetchBookCoverUrl(item.externalId, signal);

    if (coverUrl) {
      return { ...item, coverUrl };
    }
  }

  return item;
};

/**
 * Fetches missing poster/cover URLs from TMDB and Open Library by externalId.
 */
export const enrichWatchlistImages = async (
  items: WatchItem[],
  signal?: AbortSignal,
): Promise<WatchItem[]> =>
  Promise.all(items.map((item) => enrichWatchItem(item, signal)));

export const watchlistImageChanged = (
  before: WatchItem,
  after: WatchItem,
): boolean => {
  if (isMovieItem(before) && isMovieItem(after)) {
    return before.posterUrl !== after.posterUrl;
  }

  if (isBookItem(before) && isBookItem(after)) {
    return before.coverUrl !== after.coverUrl;
  }

  return false;
};
