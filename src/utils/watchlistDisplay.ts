import type { MediaType, WatchItem, WatchStatus } from '../types/watchlog';
import { isBookItem, isMovieItem } from '../types/watchlog';
import type {
  SortOption,
  StatusFilter,
  TypeFilter,
} from '../components/WatchlistFilters';

const IN_PROGRESS_STATUSES: WatchStatus[] = ['watching', 'reading'];

export const filterWatchlistItems = (
  items: WatchItem[],
  typeFilter: TypeFilter,
  statusFilter: StatusFilter,
): WatchItem[] =>
  items.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) {
      return false;
    }

    if (statusFilter === 'all') {
      return true;
    }

    if (statusFilter === 'in-progress') {
      return IN_PROGRESS_STATUSES.includes(item.status);
    }

    return item.status === statusFilter;
  });

export const sortWatchlistItems = (
  items: WatchItem[],
  sortBy: SortOption,
): WatchItem[] => {
  const sorted = [...items];

  if (sortBy === 'title') {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === 'rating') {
    return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  return sorted.sort(
    (a, b) =>
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
  );
};

export const getMediaTypeLabel = (type: MediaType): string =>
  type === 'movie' ? 'Movie' : 'Book';

export const getItemSubtitle = (item: WatchItem): string => {
  if (isBookItem(item)) {
    return item.author;
  }

  if (isMovieItem(item)) {
    return String(item.releaseYear);
  }

  return '';
};
