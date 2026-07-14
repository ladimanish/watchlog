import type { WatchItem } from '../types/watchlog';

/**
 * Group watchlist items by genre.
 * An item with multiple genres appears in each matching group.
 *
 * Example:
 *   groupByGenre([{ genres: ['Sci-Fi', 'Drama'], ... }])
 *   → { 'Sci-Fi': [...], 'Drama': [...] }
 */
export const groupByGenre = (
  items: WatchItem[],
): Record<string, WatchItem[]> => {
  if (!items?.length) return {};

  return items.reduce<Record<string, WatchItem[]>>((groups, item) => {
    item.genres.forEach((genre) => {
      if (!groups[genre]) {
        groups[genre] = [];
      }
      groups[genre].push(item);
    });
    return groups;
  }, {});
};

/**
 * Get sorted genre names from a watchlist.
 * Useful for building filter dropdowns in Stage 2 (React).
 */
export const getUniqueGenres = (items: WatchItem[]): string[] => {
  if (!items?.length) return [];

  const genreSet = new Set<string>();
  items.forEach((item) => {
    item.genres.forEach((genre) => genreSet.add(genre));
  });

  return Array.from(genreSet).sort((a, b) => a.localeCompare(b));
};