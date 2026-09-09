import { fetchBookCoverUrl } from './openLibraryClient';

describe('fetchBookCoverUrl', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns cover URL when work has covers', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ covers: [9258726] }),
    });

    const url = await fetchBookCoverUrl('OL82563W');

    expect(url).toBe('https://covers.openlibrary.org/b/id/9258726-M.jpg');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://openlibrary.org/works/OL82563W.json',
      { signal: undefined },
    );
  });

  it('returns null on HTTP failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchBookCoverUrl('OL00000W')).resolves.toBeNull();
  });

  it('returns null when work has no covers', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ covers: [] }),
    });

    await expect(fetchBookCoverUrl('OL82563W')).resolves.toBeNull();
  });

  it('follows Open Library redirects to resolve covers', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            type: { key: '/type/redirect' },
            location: '/works/OL468431W',
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ covers: [10590366] }),
      });

    const url = await fetchBookCoverUrl('OL45883W');

    expect(url).toBe('https://covers.openlibrary.org/b/id/10590366-M.jpg');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
