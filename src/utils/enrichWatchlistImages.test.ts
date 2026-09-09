import {
  mockWatchlist,
  watchlistMissingImages,
} from '../__fixtures__/watchItems';
import {
  enrichWatchlistImages,
  watchlistImageChanged,
} from './enrichWatchlistImages';

jest.mock('../api/tmdbClient', () => ({
  fetchMoviePosterUrl: jest.fn(),
}));

jest.mock('../api/openLibraryClient', () => ({
  fetchBookCoverUrl: jest.fn(),
}));

import { fetchMoviePosterUrl } from '../api/tmdbClient';
import { fetchBookCoverUrl } from '../api/openLibraryClient';

const mockedFetchMoviePosterUrl = fetchMoviePosterUrl as jest.MockedFunction<
  typeof fetchMoviePosterUrl
>;
const mockedFetchBookCoverUrl = fetchBookCoverUrl as jest.MockedFunction<
  typeof fetchBookCoverUrl
>;

describe('enrichWatchlistImages', () => {
  beforeEach(() => {
    mockedFetchMoviePosterUrl.mockResolvedValue(
      'https://image.tmdb.org/t/p/w200/poster.jpg',
    );
    mockedFetchBookCoverUrl.mockResolvedValue(
      'https://covers.openlibrary.org/b/id/123-M.jpg',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches missing movie posters and book covers', async () => {
    const enriched = await enrichWatchlistImages(watchlistMissingImages);

    expect(mockedFetchMoviePosterUrl).toHaveBeenCalledTimes(1);
    expect(mockedFetchBookCoverUrl).toHaveBeenCalledTimes(1);

    expect(enriched[0].type).toBe('movie');
    if (enriched[0].type === 'movie') {
      expect(enriched[0].posterUrl).toContain('poster.jpg');
    }

    expect(enriched[1].type).toBe('book');
    if (enriched[1].type === 'book') {
      expect(enriched[1].coverUrl).toContain('123-M.jpg');
    }
  });

  it('skips items that already have images', async () => {
    await enrichWatchlistImages(mockWatchlist);

    expect(mockedFetchMoviePosterUrl).not.toHaveBeenCalled();
    expect(mockedFetchBookCoverUrl).not.toHaveBeenCalled();
  });
});

describe('watchlistImageChanged', () => {
  it('detects poster URL changes for movies', () => {
    const before = mockWatchlist[0];
    const after =
      before.type === 'movie'
        ? { ...before, posterUrl: 'https://example.com/new.jpg' }
        : before;

    expect(watchlistImageChanged(before, after)).toBe(true);
  });

  it('returns false when image URLs are unchanged', () => {
    expect(watchlistImageChanged(mockWatchlist[0], mockWatchlist[0])).toBe(
      false,
    );
  });
});
