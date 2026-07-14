import {
    searchBooks,
    mapOpenLibraryDocToWatchItem,
  } from './openLibraryClient';
  import { OpenLibraryApiError } from './types';
  
  const mockDoc = {
    key: '/works/OL89348W',
    title: 'Dune',
    author_name: ['Frank Herbert'],
    first_publish_year: 1965,
    subject: ['Science fiction', 'Fiction'],
    cover_i: 9258726,
  };
  
  describe('mapOpenLibraryDocToWatchItem', () => {
    it('maps Open Library fields to BookWatchItem', () => {
      const item = mapOpenLibraryDocToWatchItem(mockDoc);
  
      expect(item.type).toBe('book');
      expect(item.externalId).toBe('OL89348W');
      expect(item.title).toBe('Dune');
      expect(item.author).toBe('Frank Herbert');
      expect(item.genres).toEqual(['Science fiction', 'Fiction']);
      expect(item.publishYear).toBe(1965);
      expect(item.coverUrl).toContain('9258726');
      expect(item.status).toBe('want');
      expect(item.rating).toBeNull();
    });
  
    it('handles missing optional fields', () => {
      const item = mapOpenLibraryDocToWatchItem({
        key: '/works/OL123W',
        title: 'Unknown Book',
      });
  
      expect(item.author).toBe('Unknown Author');
      expect(item.genres).toEqual([]);
      expect(item.publishYear).toBeNull();
      expect(item.coverUrl).toBeNull();
    });
  });
  
  describe('searchBooks', () => {
    const originalFetch = global.fetch;
  
    afterEach(() => {
      global.fetch = originalFetch;
    });
  
    it('returns empty array for empty query', async () => {
      expect(await searchBooks('')).toEqual([]);
      expect(await searchBooks('   ')).toEqual([]);
    });
  
    it('returns mapped results on success', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ numFound: 1, docs: [mockDoc] }),
      });
  
      const results = await searchBooks('Dune');
  
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Dune');
      expect(results[0].type).toBe('book');
    });
  
    it('throws OpenLibraryApiError on HTTP failure', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });
  
      await expect(searchBooks('Dune')).rejects.toThrow(OpenLibraryApiError);
    });
  
    it('URL-encodes the search query', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ numFound: 0, docs: [] }),
      });
  
      await searchBooks('great gatsby');
  
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=great%20gatsby'),
      );
    });
  });