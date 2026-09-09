import type { WatchItem } from '../types/watchlog';
import { sortByRating } from './sortWatchItems';
import { emptyWatchlist } from '../__fixtures__/watchItems';

const ratedItems: WatchItem[] = [
  {
    id: 'a',
    externalId: '1',
    type: 'movie',
    title: 'Low Rated',
    genres: ['Drama'],
    status: 'done',
    rating: 2,
    dateAdded: '2026-01-01T10:00:00Z',
    dateCompleted: '2026-01-02T10:00:00Z',
    releaseYear: 2000,
    posterUrl: null,
  },
  {
    id: 'b',
    externalId: '2',
    type: 'book',
    title: 'High Rated',
    author: 'Author',
    genres: ['Fiction'],
    status: 'done',
    rating: 5,
    dateAdded: '2026-01-01T10:00:00Z',
    dateCompleted: '2026-01-02T10:00:00Z',
    publishYear: 1990,
    coverUrl: null,
  },
];

describe('sortByRating', () => {
  it('returns empty array for empty input', () => {
    expect(sortByRating(emptyWatchlist)).toEqual([]);
  });

  it('sorts by rating descending', () => {
    const result = sortByRating(ratedItems, 'desc');
    expect(result[0].rating).toBe(5);
    expect(result[result.length - 1].rating).toBe(2);
  });

  it('sorts by rating ascending', () => {
    const result = sortByRating(ratedItems, 'asc');
    expect(result[0].rating).toBe(2);
    expect(result[result.length - 1].rating).toBe(5);
  });

  it('does not mutate the original array', () => {
    const original = [...ratedItems];
    sortByRating(ratedItems, 'desc');
    expect(ratedItems).toEqual(original);
  });
});
