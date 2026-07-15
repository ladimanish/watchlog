import { calculateStats } from './watchlistStats';
import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';

describe('calculateStats', () => {
  it('returns zeroed stats for empty watchlist', () => {
    expect(calculateStats(emptyWatchlist)).toEqual({
      totalItems: 0,
      completedCount: 0,
      completionRate: 0,
      averageRating: null,
    });
  });

  it('counts total items correctly', () => {
    expect(calculateStats(mockWatchlist).totalItems).toBe(6);
  });

  it('counts completed items correctly', () => {
    expect(calculateStats(mockWatchlist).completedCount).toBe(2);
  });

  it('calculates completion rate as percentage', () => {
    expect(calculateStats(mockWatchlist).completionRate).toBeCloseTo(33.33, 1);
  });

  it('calculates average rating from completed rated items', () => {
    expect(calculateStats(mockWatchlist).averageRating).toBe(4.5);
  });
});
