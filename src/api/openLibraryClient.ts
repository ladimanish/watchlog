import type { BookWatchItem } from '../types/watchlog';
import type { OpenLibraryDoc, OpenLibrarySearchResponse } from './types';
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
export const searchBooks = async (query: string): Promise<BookWatchItem[]> => {
  const trimmed = query?.trim();
  if (!trimmed) return [];

  const url =
    `${OPEN_LIBRARY_BASE}/search.json` +
    `?q=${encodeURIComponent(trimmed)}&limit=20`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new OpenLibraryApiError(
      `Open Library search failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const data: OpenLibrarySearchResponse = await response.json();
  return data.docs.map(mapOpenLibraryDocToWatchItem);
};