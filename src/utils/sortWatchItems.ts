import type { WatchItem, SortField, SortOrder } from '../types/watchlog';

/**
 * Sort by star rating.
 * Items with null rating are treated as 0 (sorted to bottom when desc).
 */
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

/**
 * Sort by date added (ISO string comparison).
 * Newest first by default (desc).
 */
export const sortByDateAdded = (
  items: WatchItem[],
  order: SortOrder = 'desc',
): WatchItem[] => {
  if (!items?.length) return [];

  return [...items].sort((a, b) => {
    const aTime = new Date(a.dateAdded).getTime();
    const bTime = new Date(b.dateAdded).getTime();
    const diff = aTime - bTime;
    return order === 'asc' ? diff : -diff;
  });
};

/**
 * Sort by title alphabetically (case-insensitive).
 */
export const sortByTitle = (
  items: WatchItem[],
  order: SortOrder = 'asc',
): WatchItem[] => {
  if (!items?.length) return [];

  return [...items].sort((a, b) => {
    const diff = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    return order === 'asc' ? diff : -diff;
  });
};

/**
 * Generic sort — pick field and order in one call.
 *
 * Example:
 *   sortWatchItems(list, 'rating', 'desc')
 *   sortWatchItems(list, 'title', 'asc')
 */
export const sortWatchItems = (
  items: WatchItem[],
  field: SortField,
  order: SortOrder = 'desc',
): WatchItem[] => {
  switch (field) {
    case 'rating':
      return sortByRating(items, order);
    case 'dateAdded':
      return sortByDateAdded(items, order);
    case 'title':
      return sortByTitle(items, order);
    default: {
      const _exhaustive: never = field;
      return _exhaustive;
    }
  }
};