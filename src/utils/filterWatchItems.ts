import type {
    WatchItem,
    WatchStatus,
    MediaType,
    WatchlistFilter,
  } from '../types/watchlog';
  
  /**
   * Filter items by status.
   * Returns a new array — does not mutate the input.
   */
  export const filterByStatus = (
    items: WatchItem[],
    status: WatchStatus,
  ): WatchItem[] => {
    if (!items?.length) return [];
    return items.filter((item) => item.status === status);
  };
  
  /**
   * Filter items by media type (movie or book).
   */
  export const filterByType = (
    items: WatchItem[],
    type: MediaType,
  ): WatchItem[] => {
    if (!items?.length) return [];
    return items.filter((item) => item.type === type);
  };
  
  /**
   * Filter items that contain a specific genre (case-insensitive).
   */
  export const filterByGenre = (
    items: WatchItem[],
    genre: string,
  ): WatchItem[] => {
    if (!items?.length || !genre?.trim()) return items ?? [];
    const normalized = genre.trim().toLowerCase();
    return items.filter((item) =>
      item.genres.some((g) => g.toLowerCase() === normalized),
    );
  };
  
  /**
   * Apply multiple filters at once.
   * Only applies filters that are provided (not undefined).
   *
   * Example:
   *   applyFilters(list, { type: 'movie', status: 'done' })
   */
  export const applyFilters = (
    items: WatchItem[],
    filters: WatchlistFilter,
  ): WatchItem[] => {
    if (!items?.length) return [];
  
    let result = [...items];
  
    if (filters.type) {
      result = filterByType(result, filters.type);
    }
    if (filters.status) {
      result = filterByStatus(result, filters.status);
    }
    if (filters.genre) {
      result = filterByGenre(result, filters.genre);
    }
  
    return result;
  };