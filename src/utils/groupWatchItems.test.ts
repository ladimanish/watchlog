import { groupByGenre, getUniqueGenres } from './groupWatchItems';
import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';

describe('groupByGenre', () => {
  it('returns empty object for empty input', () => {
    expect(groupByGenre(emptyWatchlist)).toEqual({});
  });

  it('groups items by genre', () => {
    const result = groupByGenre(mockWatchlist);
    expect(result['Sci-Fi']).toBeDefined();
    expect(result['Sci-Fi'].length).toBeGreaterThanOrEqual(3);
  });

  it('places multi-genre items in multiple groups', () => {
    const result = groupByGenre(mockWatchlist);
    const inception = mockWatchlist.find((i) => i.title === 'Inception');
    expect(result['Sci-Fi']).toContainEqual(inception);
    expect(result['Action']).toContainEqual(inception);
  });

  it('does not mutate the original array', () => {
    const original = [...mockWatchlist];
    groupByGenre(mockWatchlist);
    expect(mockWatchlist).toEqual(original);
  });
});

describe('getUniqueGenres', () => {
  it('returns empty array for empty input', () => {
    expect(getUniqueGenres(emptyWatchlist)).toEqual([]);
  });

  it('returns sorted unique genre names', () => {
    const result = getUniqueGenres(mockWatchlist);
    expect(result).toContain('Sci-Fi');
    expect(result).toContain('Drama');
    const sorted = [...result].sort((a, b) => a.localeCompare(b));
    expect(result).toEqual(sorted);
  });
});