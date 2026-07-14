import { calculateStats } from './watchlistStats';
import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';

describe('calculateStats', () => {
  describe('edge cases', () => {
    it('returns zeroed stats for empty watchlist', () => {
      const result = calculateStats(emptyWatchlist);
      expect(result).toEqual({
        totalItems: 0,
        completedCount: 0,
        completionRate: 0,
        averageRating: null,
        byType: { movie: 0, book: 0 },
        byStatus: { want: 0, watching: 0, reading: 0, done: 0 },
      });
    });
  });

  describe('positive cases', () => {
    it('counts total items correctly', () => {
      const result = calculateStats(mockWatchlist);
      expect(result.totalItems).toBe(6);
    });

    it('counts completed items correctly', () => {
      const result = calculateStats(mockWatchlist);
      expect(result.completedCount).toBe(2);
    });

    it('calculates completion rate as percentage', () => {
      const result = calculateStats(mockWatchlist);
      expect(result.completionRate).toBeCloseTo(33.33, 1);
    });

    it('calculates average rating from completed rated items', () => {
      const result = calculateStats(mockWatchlist);
      // Fight Club (5) + Gatsby (4) → avg 4.5
      expect(result.averageRating).toBe(4.5);
    });

    it('breaks down counts by media type', () => {
      const result = calculateStats(mockWatchlist);
      expect(result.byType).toEqual({ movie: 3, book: 3 });
    });

    it('breaks down counts by status', () => {
      const result = calculateStats(mockWatchlist);
      expect(result.byStatus).toEqual({
        want: 2,
        watching: 1,
        reading: 1,
        done: 2,
      });
    });
  });
});