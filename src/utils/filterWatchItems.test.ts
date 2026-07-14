import {
    filterByStatus,
    filterByType,
    filterByGenre,
    applyFilters,
  } from './filterWatchItems';
  import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';
  
  describe('filterByStatus', () => {
    describe('edge cases', () => {
      it('returns empty array for empty input', () => {
        expect(filterByStatus(emptyWatchlist, 'want')).toEqual([]);
      });
  
      it('returns empty array for undefined-like input', () => {
        expect(filterByStatus(null as unknown as [], 'want')).toEqual([]);
      });
    });
  
    describe('positive cases', () => {
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
  
      it('returns empty when no items match', () => {
        const onlyDone = filterByStatus(mockWatchlist, 'done');
        const wantFromDone = filterByStatus(onlyDone, 'want');
        expect(wantFromDone).toEqual([]);
      });
    });
  });
  
  describe('filterByType', () => {
    it('returns only movies', () => {
      const result = filterByType(mockWatchlist, 'movie');
      expect(result).toHaveLength(3);
      expect(result.every((i) => i.type === 'movie')).toBe(true);
    });
  
    it('returns only books', () => {
      const result = filterByType(mockWatchlist, 'book');
      expect(result).toHaveLength(3);
      expect(result.every((i) => i.type === 'book')).toBe(true);
    });
  });
  
  describe('filterByGenre', () => {
    it('filters by genre case-insensitively', () => {
      const result = filterByGenre(mockWatchlist, 'sci-fi');
      expect(result.length).toBeGreaterThanOrEqual(3);
      result.forEach((item) => {
        expect(
          item.genres.some((g) => g.toLowerCase() === 'sci-fi'),
        ).toBe(true);
      });
    });
  
    it('returns all items when genre is empty string', () => {
      const result = filterByGenre(mockWatchlist, '');
      expect(result).toEqual(mockWatchlist);
    });
  
    it('returns empty for unmatched genre', () => {
      const result = filterByGenre(mockWatchlist, 'Horror');
      expect(result).toEqual([]);
    });
  });
  
  describe('applyFilters', () => {
    it('applies type and status together', () => {
      const result = applyFilters(mockWatchlist, {
        type: 'movie',
        status: 'done',
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Fight Club');
    });
  
    it('applies all three filters', () => {
      const result = applyFilters(mockWatchlist, {
        type: 'book',
        status: 'done',
        genre: 'Fiction',
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Great Gatsby');
    });
  
    it('returns all items when no filters provided', () => {
      const result = applyFilters(mockWatchlist, {});
      expect(result).toHaveLength(mockWatchlist.length);
    });
  });