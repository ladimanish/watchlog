import {
    sortByRating,
    sortByDateAdded,
    sortByTitle,
    sortWatchItems,
  } from './sortWatchItems';
  import { mockWatchlist, emptyWatchlist } from '../__fixtures__/watchItems';
  
  describe('sortByRating', () => {
    it('returns empty array for empty input', () => {
      expect(sortByRating(emptyWatchlist)).toEqual([]);
    });
  
    it('sorts by rating descending (highest first)', () => {
      const doneItems = mockWatchlist.filter((i) => i.status === 'done');
      const result = sortByRating(doneItems, 'desc');
      expect(result[0].rating).toBe(5);
      expect(result[result.length - 1].rating).toBe(4);
    });
  
    it('sorts by rating ascending (lowest first)', () => {
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
  
  describe('sortByDateAdded', () => {
    it('sorts newest first by default (desc)', () => {
      const result = sortByDateAdded(mockWatchlist);
      expect(result[0].title).toBe('Project Hail Mary');
      expect(result[result.length - 1].title).toBe('Fight Club');
    });
  
    it('sorts oldest first when asc', () => {
      const result = sortByDateAdded(mockWatchlist, 'asc');
      expect(result[0].title).toBe('Fight Club');
      expect(result[result.length - 1].title).toBe('Project Hail Mary');
    });
  });
  
  describe('sortByTitle', () => {
    it('sorts alphabetically ascending', () => {
      const result = sortByTitle(mockWatchlist, 'asc');
      const titles = result.map((i) => i.title);
      const sorted = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sorted);
    });
  
    it('sorts alphabetically descending', () => {
      const result = sortByTitle(mockWatchlist, 'desc');
      const titles = result.map((i) => i.title);
      const sorted = [...titles].sort((a, b) => b.localeCompare(a));
      expect(titles).toEqual(sorted);
    });
  });
  
  describe('sortWatchItems', () => {
    it('delegates to sortByRating for rating field', () => {
      const doneItems = mockWatchlist.filter((i) => i.status === 'done');
      const result = sortWatchItems(doneItems, 'rating', 'desc');
      expect(result[0].rating).toBe(5);
    });
  
    it('delegates to sortByDateAdded for dateAdded field', () => {
      const result = sortWatchItems(mockWatchlist, 'dateAdded', 'desc');
      expect(result[0].title).toBe('Project Hail Mary');
    });
  
    it('delegates to sortByTitle for title field', () => {
      const result = sortWatchItems(mockWatchlist, 'title', 'asc');
      const titles = result.map((i) => i.title);
      const sorted = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sorted);
    });
  });