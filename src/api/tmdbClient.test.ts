import {
    searchMovies,
    mapTmdbResultToWatchItem,
  } from './tmdbClient';
  import { TmdbApiError } from './types';
  
  const mockTmdbResult = {
  id: 27205,
  title: 'Inception',
  genre_ids: [878, 28],
  release_date: '2010-07-16',
  poster_path: '/poster.jpg',
};
  
  describe('mapTmdbResultToWatchItem', () => {
    it('maps TMDB fields to MovieWatchItem', () => {
      const item = mapTmdbResultToWatchItem(mockTmdbResult);
  
      expect(item.type).toBe('movie');
      expect(item.externalId).toBe('27205');
      expect(item.title).toBe('Inception');
      expect(item.genres).toEqual(['Sci-Fi', 'Action']);
      expect(item.releaseYear).toBe(2010);
      expect(item.posterUrl).toContain('/poster.jpg');
      expect(item.status).toBe('want');
      expect(item.rating).toBeNull();
      expect(item.dateCompleted).toBeNull();
    });
  
    it('handles missing poster and release date', () => {
      const item = mapTmdbResultToWatchItem({
        ...mockTmdbResult,
        poster_path: null,
        release_date: '',
      });
  
      expect(item.posterUrl).toBeNull();
      expect(item.releaseYear).toBe(0);
    });
  });
  
  describe('searchMovies', () => {
    const originalFetch = global.fetch;
    const originalEnv = process.env.TMDB_API_KEY;
  
    afterEach(() => {
      global.fetch = originalFetch;
      process.env.TMDB_API_KEY = originalEnv;
    });
  
    it('throws when API key is missing', async () => {
      delete process.env.TMDB_API_KEY;
      await expect(searchMovies('Inception')).rejects.toThrow(TmdbApiError);
      await expect(searchMovies('Inception')).rejects.toThrow('TMDB_API_KEY');
    });
  
    it('returns empty array for empty query', async () => {
      process.env.TMDB_API_KEY = 'test-key';
      const result = await searchMovies('   ');
      expect(result).toEqual([]);
    });
  
    it('returns mapped results on success', async () => {
      process.env.TMDB_API_KEY = 'test-key';
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [mockTmdbResult] }),
      });
  
      const results = await searchMovies('Inception');
  
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Inception');
      expect(results[0].type).toBe('movie');
    });
  
    it('throws TmdbApiError on HTTP failure', async () => {
      process.env.TMDB_API_KEY = 'test-key';
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });
  
      await expect(searchMovies('test')).rejects.toThrow('401');
    });
  
    it('URL-encodes the search query', async () => {
      process.env.TMDB_API_KEY = 'test-key';
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });
  
      await searchMovies('fight club');
  
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('query=fight%20club'),
      );
    });
  });