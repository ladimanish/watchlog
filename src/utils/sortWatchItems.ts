import type { WatchItem } from '../types/watchlog';

type SortOrder = 'asc' | 'desc';

/** Sort by star rating. Null ratings are treated as 0. */
export const sortByRating = (
  items: WatchItem[],
  order: SortOrder = 'desc',
): WatchItem[] => {
  if (!items?.length) return [];

  return [...items].sort((a, b) => {
    const aRating = a.rating ?? 0;
    const bRating = b.rating ?? 0;
    const diff = aRating - bRating;
    return order === 'asc' ? diff : -diff;
  });
};
