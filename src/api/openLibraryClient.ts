import type { BookWatchItem } from '../types/watchlog';
import type { OpenLibraryDoc, OpenLibrarySearchResponse, OpenLibraryWork } from './types';
import { OpenLibraryApiError } from './types';

const OPEN_LIBRARY_BASE = 'https://openlibrary.org';
const COVER_BASE = 'https://covers.openlibrary.org/b/id';

/** Take up to 3 subjects as genres */
const mapSubjectsToGenres = (subjects?: string[]): string[] => {
  if (!subjects?.length) return [];
  return subjects.slice(0, 3).map((s) =>
    s.length > 30 ? s.slice(0, 30) : s,
  );
};

/** Strip /works/OL123W → OL123W */
const extractWorkId = (key: string): string =>
  key.replace('/works/', '').replace('/books/', '');

export const mapOpenLibraryDocToWatchItem = (
  doc: OpenLibraryDoc,
): BookWatchItem => ({
  id: crypto.randomUUID(),
  externalId: extractWorkId(doc.key),
  type: 'book',
  title: doc.title,
  author: doc.author_name?.[0] ?? 'Unknown Author',
  genres: mapSubjectsToGenres(doc.subject),
  status: 'want',
  rating: null,
  dateAdded: new Date().toISOString(),
  dateCompleted: null,
  publishYear: doc.first_publish_year ?? null,
  coverUrl: doc.cover_i
    ? `${COVER_BASE}/${doc.cover_i}-M.jpg`
    : null,
});

/**
 * Search Open Library for books by title.
 * No API key required.
 */
export const searchBooks = async (
  query: string,
  signal?: AbortSignal,
): Promise<BookWatchItem[]> => {
  const trimmed = query?.trim();
  if (!trimmed) return [];

  const url =
    `${OPEN_LIBRARY_BASE}/search.json` +
    `?q=${encodeURIComponent(trimmed)}&limit=20`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new OpenLibraryApiError(
      `Open Library search failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const data: OpenLibrarySearchResponse = await response.json();
  return data.docs.map(mapOpenLibraryDocToWatchItem);
};

/**
 * Fetch cover URL for a book by Open Library work id (e.g. OL82563W).
 * Returns null when the request fails or no cover exists.
 */
export const fetchBookCoverUrl = async (
  externalId: string,
  signal?: AbortSignal,
): Promise<string | null> => {
  const url = `${OPEN_LIBRARY_BASE}/works/${externalId}.json`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    return null;
  }

  const data: OpenLibraryWork = await response.json();

  if (data.type?.key === '/type/redirect' && data.location) {
    const redirectId = extractWorkId(data.location);
    return fetchBookCoverUrl(redirectId, signal);
  }

  const coverId = data.covers?.[0];

  return coverId ? `${COVER_BASE}/${coverId}-M.jpg` : null;
};