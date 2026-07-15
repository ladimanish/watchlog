import type { WatchItem, WatchStatus } from '../types/watchlog';

/** Filter items by status. Returns a new array. */
export const filterByStatus = (
  items: WatchItem[],
  status: WatchStatus,
): WatchItem[] => {
  if (!items?.length) return [];
  return items.filter((item) => item.status === status);
};
