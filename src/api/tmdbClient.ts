import type { MovieWatchItem } from '../types/watchlog';
import type { TmdbMovieResult, TmdbSearchResponse } from './types';
import { TmdbApiError } from './types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w200';

/** TMDB genre_id → name lookup (subset of official list) */
const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const mapGenreIds = (genreIds: number[]): string[] =>
  genreIds
    .map((id) => GENRE_MAP[id])
    .filter((name): name is string => name !== undefined);

/** Map a raw TMDB result to MovieWatchItem */
export const mapTmdbResultToWatchItem = (
  result: TmdbMovieResult,
): MovieWatchItem => ({
  id: crypto.randomUUID(),
  externalId: String(result.id),
  type: 'movie',
  title: result.title,
  genres: mapGenreIds(result.genre_ids),
  status: 'want',
  rating: null,
  dateAdded: new Date().toISOString(),
  dateCompleted: null,
  releaseYear: parseInt(result.release_date?.slice(0, 4) || '0', 10) || 0,
  posterUrl: result.poster_path
    ? `${TMDB_IMAGE_BASE}${result.poster_path}`
    : null,
});

const getApiKey = (): string => {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new TmdbApiError('TMDB_API_KEY environment variable is required');
  }
  return key;
};

/**
 * Search TMDB for movies by title.
 *
 * @param query - Search term (e.g. "Inception")
 * @returns Array of MovieWatchItem ready to add to watchlist
 * @throws TmdbApiError on missing API key or HTTP failure
 */
export const searchMovies = async (query: string): Promise<MovieWatchItem[]> => {
  const trimmed = query?.trim();
  if (!trimmed) return [];

  const apiKey = getApiKey();
  const url =
    `${TMDB_BASE_URL}/search/movie` +
    `?api_key=${apiKey}&query=${encodeURIComponent(trimmed)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new TmdbApiError(
      `TMDB search failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const data: TmdbSearchResponse = await response.json();
  return data.results.map(mapTmdbResultToWatchItem);
};