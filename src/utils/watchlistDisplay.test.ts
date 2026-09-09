import type { WatchItem } from '../types/watchlog';
import { mockWatchlist } from '../__fixtures__/watchItems';
import {
  filterWatchlistItems,
  sortWatchlistItems,
} from './watchlistDisplay';

describe('filterWatchlistItems', () => {
  it('filters by media type', () => {
    const movies = filterWatchlistItems(mockWatchlist, 'movie', 'all');
    expect(movies.every((item) => item.type === 'movie')).toBe(true);
    expect(movies).toHaveLength(4);
  });

  it('filters in-progress statuses', () => {
    const inProgress = filterWatchlistItems(mockWatchlist, 'all', 'in-progress');
    expect(inProgress.map((item) => item.title)).toEqual(
      expect.arrayContaining(['Inception', 'Dune', 'Nineteen Eighty-Four']),
    );
  });
});

describe('sortWatchlistItems', () => {
  it('sorts by title alphabetically', () => {
    const sorted = sortWatchlistItems(mockWatchlist, 'title');
    expect(sorted[0].title <= sorted[1].title).toBe(true);
  });

  it('sorts by rating descending', () => {
    const sorted = sortWatchlistItems(mockWatchlist, 'rating');
    const firstRating = sorted[0].rating ?? 0;
    const lastRating = sorted[sorted.length - 1].rating ?? 0;
    expect(firstRating).toBeGreaterThanOrEqual(lastRating);
  });

  it('does not mutate the source array', () => {
    const original: WatchItem[] = [...mockWatchlist];
    sortWatchlistItems(mockWatchlist, 'title');
    expect(mockWatchlist).toEqual(original);
  });
});
