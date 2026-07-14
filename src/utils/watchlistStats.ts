import type {
    WatchItem,
    WatchStatus,
    MediaType,
    WatchlistStats,
  } from '../types/watchlog';
  
  const ALL_STATUSES: WatchStatus[] = ['want', 'watching', 'reading', 'done'];
  
  const emptyByStatus = (): Record<WatchStatus, number> => ({
    want: 0,
    watching: 0,
    reading: 0,
    done: 0,
  });
  
  /**
   * Calculate summary statistics for a watchlist.
   *
   * Returns:
   *   - totalItems: count of all items
   *   - completedCount: items with status 'done'
   *   - completionRate: percentage 0–100
   *   - averageRating: mean of rated completed items, or null if none
   *   - byType: count per media type
   *   - byStatus: count per status
   */
  export const calculateStats = (items: WatchItem[]): WatchlistStats => {
    const totalItems = items?.length ?? 0;
  
    if (totalItems === 0) {
      return {
        totalItems: 0,
        completedCount: 0,
        completionRate: 0,
        averageRating: null,
        byType: { movie: 0, book: 0 },
        byStatus: emptyByStatus(),
      };
    }
  
    const completed = items.filter((item) => item.status === 'done');
    const ratedCompleted = completed.filter((item) => item.rating !== null);
  
    const byStatus = items.reduce<Record<WatchStatus, number>>((counts, item) => {
      counts[item.status] += 1;
      return counts;
    }, emptyByStatus());
  
    const byType = items.reduce<Record<MediaType, number>>(
      (counts, item) => {
        counts[item.type] += 1;
        return counts;
      },
      { movie: 0, book: 0 },
    );
  
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
      byType,
      byStatus,
    };
  };