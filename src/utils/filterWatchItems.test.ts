import { filterByStatus } from './filterWatchItems';
import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';

describe('filterByStatus', () => {
  it('returns empty array for empty input', () => {
    expect(filterByStatus(emptyWatchlist, 'want')).toEqual([]);
  });

  it('returns empty array for null-like input', () => {
    expect(filterByStatus(null as unknown as [], 'want')).toEqual([]);
  });

  it('filters items with want status', () => {
    const result = filterByStatus(mockWatchlist, 'want');
    expect(result).toHaveLength(2);
    expect(result.every((i) => i.status === 'want')).toBe(true);
  });

  it('filters items with done status', () => {
    const result = filterByStatus(mockWatchlist, 'done');
    expect(result).toHaveLength(2);
    expect(result.map((i) => i.title)).toEqual(
      expect.arrayContaining(['Fight Club', 'The Great Gatsby']),
    );
  });
});
