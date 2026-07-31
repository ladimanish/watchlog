import { useCallback, useEffect, useRef, useState } from 'react';
import { searchBooks } from '../api/openLibraryClient';
import { searchMovies } from '../api/tmdbClient';
import type { MediaType, WatchItem } from '../types/watchlog';

interface UseSearchMediaReturn {
  results: WatchItem[];
  isLoading: boolean;
  error: string | null;
  search: (query: string, mediaType: MediaType) => Promise<void>;
  clearResults: () => void;
}

const isAbortError = (err: unknown): boolean =>
  err instanceof DOMException
    ? err.name === 'AbortError'
    : err instanceof Error && err.name === 'AbortError';

export const useSearchMedia = (): UseSearchMediaReturn => {
  const [results, setResults] = useState<WatchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    [],
  );

  const clearResults = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const search = useCallback(
    async (query: string, mediaType: MediaType) => {
      const trimmed = query.trim();

      if (!trimmed) {
        clearResults();
        return;
      }

      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const items =
          mediaType === 'movie'
            ? await searchMovies(trimmed, controller.signal)
            : await searchBooks(trimmed, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setResults(items);
      } catch (err) {
        if (isAbortError(err)) {
          return;
        }

        setResults([]);

        const message =
          err instanceof Error
            ? err.message
            : 'Search failed. Please try again.';

        setError(message);
      } finally {
        if (abortControllerRef.current === controller) {
          setIsLoading(false);
        }
      }
    },
    [clearResults],
  );

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  };
};