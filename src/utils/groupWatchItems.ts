import type { WatchItem } from '../types/watchlog';

/** Group watchlist items by genre. Multi-genre items appear in each group. */
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
