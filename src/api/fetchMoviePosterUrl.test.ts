import { fetchMoviePosterUrl } from './tmdbClient';

describe('fetchMoviePosterUrl', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env.TMDB_API_KEY;

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.TMDB_API_KEY = originalEnv;
  });

  it('returns null when API key is missing', async () => {
    delete process.env.TMDB_API_KEY;

    await expect(fetchMoviePosterUrl('550')).resolves.toBeNull();
  });

  it('returns poster URL on success', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 550, poster_path: '/fight-club.jpg' }),
    });

    const url = await fetchMoviePosterUrl('550');

    expect(url).toContain('/fight-club.jpg');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/550'),
      { signal: undefined },
    );
  });

  it('returns null on HTTP failure', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchMoviePosterUrl('999999')).resolves.toBeNull();
  });

  it('returns null when poster_path is missing', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 550, poster_path: null }),
    });

    await expect(fetchMoviePosterUrl('550')).resolves.toBeNull();
  });
});
