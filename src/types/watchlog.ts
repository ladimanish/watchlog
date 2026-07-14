/**
 * WatchLog domain types — foundation for all later stages.
 * Supports movies AND books with a three-step status flow.
 */

// ─── Status & media ───────────────────────────────────────────────

/** First step: user wants to watch/read */
export type WantStatus = 'want';

/** In-progress: watching (movie) or reading (book) */
export type InProgressStatus = 'watching' | 'reading';

/** Final step: completed */
export type DoneStatus = 'done';

/** Full status union */
export type WatchStatus = WantStatus | InProgressStatus | DoneStatus;

export type MediaType = 'movie' | 'book';

/** Valid star ratings — only for completed items */
export type StarRating = 1 | 2 | 3 | 4 | 5;

// ─── Base item ────────────────────────────────────────────────────

/** Fields every watchlist item shares */
export interface WatchItemBase {
  /** Your internal ID (use crypto.randomUUID() when creating) */
  id: string;
  /** ID from external API (TMDB id, Open Library key, etc.) */
  externalId: string;
  title: string;
  genres: string[];
  status: WatchStatus;
  /** 1–5 stars; null until item is done and rated */
  rating: StarRating | null;
  /** ISO 8601 date string */
  dateAdded: string;
  /** ISO 8601; set when status becomes 'done' */
  dateCompleted: string | null;
}

// ─── Movie & book (discriminated union) ───────────────────────────

export interface MovieWatchItem extends WatchItemBase {
  type: 'movie';
  releaseYear: number;
  posterUrl: string | null;
}

export interface BookWatchItem extends WatchItemBase {
  type: 'book';
  author: string;
  publishYear: number | null;
  coverUrl: string | null;
}

/**
 * Discriminated union — use `item.type` to narrow:
 *   if (item.type === 'movie') → TypeScript knows it's MovieWatchItem
 */
export type WatchItem = MovieWatchItem | BookWatchItem;

export type Watchlist = WatchItem[];

// ─── Filter & sort (used in Step 3 utilities) ─────────────────────

export type SortField = 'rating' | 'dateAdded' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface WatchlistFilter {
  type?: MediaType;
  status?: WatchStatus;
  genre?: string;
}

// ─── Statistics shape (implemented in Step 5) ───────────────────

export interface WatchlistStats {
  totalItems: number;
  completedCount: number;
  /** Percentage 0–100 */
  completionRate: number;
  averageRating: number | null;
  byType: Record<MediaType, number>;
  byStatus: Record<WatchStatus, number>;
}

// ─── Type guards ──────────────────────────────────────────────────

const WATCH_STATUSES: WatchStatus[] = ['want', 'watching', 'reading', 'done'];
const STAR_RATINGS: StarRating[] = [1, 2, 3, 4, 5];

export const isWatchStatus = (value: unknown): value is WatchStatus =>
  typeof value === 'string' && WATCH_STATUSES.includes(value as WatchStatus);

export const isStarRating = (value: unknown): value is StarRating =>
  typeof value === 'number' && STAR_RATINGS.includes(value as StarRating);

export const isMovieItem = (item: WatchItem): item is MovieWatchItem =>
  item.type === 'movie';

export const isBookItem = (item: WatchItem): item is BookWatchItem =>
  item.type === 'book';

export const isWatchItem = (value: unknown): value is WatchItem => {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.externalId === 'string' &&
    typeof item.title === 'string' &&
    Array.isArray(item.genres) &&
    isWatchStatus(item.status) &&
    (item.type === 'movie' || item.type === 'book')
  );
};

// ─── Business rule helpers ─────────────────────────────────────────

/** Movies use 'watching'; books use 'reading' when in progress */
export const getInProgressStatus = (type: MediaType): InProgressStatus =>
  type === 'movie' ? 'watching' : 'reading';

/** Rating is only valid when status is 'done' */
export const isRatingAllowed = (status: WatchStatus): boolean =>
  status === 'done';

/** Validate rating value for a given status */
export const isValidRatingForStatus = (
  status: WatchStatus,
  rating: StarRating | null,
): boolean => {
  if (status !== 'done') return rating === null;
  return rating === null || isStarRating(rating);
};