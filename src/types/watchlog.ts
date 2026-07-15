/**
 * WatchLog domain types — Stage 1 data model.
 * Supports movies AND books with status flow and star ratings.
 */

export type WatchStatus = 'want' | 'watching' | 'reading' | 'done';

export type MediaType = 'movie' | 'book';

/** Valid star ratings — only for completed items */
export type StarRating = 1 | 2 | 3 | 4 | 5;

/** Fields every watchlist item shares */
export interface WatchItemBase {
  id: string;
  externalId: string;
  title: string;
  genres: string[];
  status: WatchStatus;
  rating: StarRating | null;
  dateAdded: string;
  dateCompleted: string | null;
}

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

export type WatchItem = MovieWatchItem | BookWatchItem;

export type Watchlist = WatchItem[];

/** Stage 1 statistics summary */
export interface WatchlistStats {
  totalItems: number;
  completedCount: number;
  completionRate: number;
  averageRating: number | null;
}

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
