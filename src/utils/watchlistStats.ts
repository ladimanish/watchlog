import type { WatchItem, WatchlistStats } from '../types/watchlog';

/** Calculate totals, completion rate, and average rating. */
export const calculateStats = (items: WatchItem[]): WatchlistStats => {
  const totalItems = items?.length ?? 0;

  if (totalItems === 0) {
    return {
      totalItems: 0,
      completedCount: 0,
      completionRate: 0,
      averageRating: null,
    };
  }

  const completed = items.filter((item) => item.status === 'done');
  const ratedCompleted = completed.filter((item) => item.rating !== null);

  const averageRating =
    ratedCompleted.length > 0
      ? ratedCompleted.reduce((sum, item) => sum + (item.rating ?? 0), 0) /
        ratedCompleted.length
      : null;

  return {
    totalItems,
    completedCount: completed.length,
    completionRate: (completed.length / totalItems) * 100,
    averageRating,
  };
};
