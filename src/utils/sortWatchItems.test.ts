import { sortByRating } from './sortWatchItems';
import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';

describe('sortByRating', () => {
  it('returns empty array for empty input', () => {
    expect(sortByRating(emptyWatchlist)).toEqual([]);
  });

  it('sorts by rating descending', () => {
    const doneItems = mockWatchlist.filter((i) => i.status === 'done');
    const result = sortByRating(doneItems, 'desc');
    expect(result[0].rating).toBe(5);
    expect(result[result.length - 1].rating).toBe(4);
  });

  it('sorts by rating ascending', () => {
    const doneItems = mockWatchlist.filter((i) => i.status === 'done');
    const result = sortByRating(doneItems, 'asc');
    expect(result[0].rating).toBe(4);
    expect(result[result.length - 1].rating).toBe(5);
  });

  it('does not mutate the original array', () => {
    const original = [...mockWatchlist];
    sortByRating(mockWatchlist, 'desc');
    expect(mockWatchlist).toEqual(original);
  });
});
