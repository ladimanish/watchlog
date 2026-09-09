import type {
  SortOption,
  StatusFilter,
  TypeFilter,
} from '../store/usePreferencesStore';
import { cn } from '../utils/cn';

export type { SortOption, StatusFilter, TypeFilter };

interface WatchlistFiltersProps {
  typeFilter: TypeFilter;
  statusFilter: StatusFilter;
  sortBy: SortOption;
  onTypeChange: (value: TypeFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
  onSortChange: (value: SortOption) => void;
}

const pillClass = (active: boolean) =>
  cn(
    'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-semantic-focus',
    active
      ? 'bg-component-primary text-text-onColor'
      : 'bg-surface-muted text-text-muted hover:bg-surface-elevated hover:text-text-default',
  );

const WatchlistFilters = ({
  typeFilter,
  statusFilter,
  sortBy,
  onTypeChange,
  onStatusChange,
  onSortChange,
}: WatchlistFiltersProps) => {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        {(['all', 'movie', 'book'] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={pillClass(typeFilter === option)}
            onClick={() => onTypeChange(option)}
          >
            {option === 'all' ? 'All' : option === 'movie' ? 'Movies' : 'Books'}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {(
          [
            ['all', 'All status'],
            ['want', 'Want'],
            ['in-progress', 'In progress'],
            ['done', 'Done'],
          ] as const
        ).map(([option, label]) => (
          <button
            key={option}
            type="button"
            className={pillClass(statusFilter === option)}
            onClick={() => onStatusChange(option)}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-text-muted">
        Sort
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="select-field !py-1.5 !text-xs"
          aria-label="Sort watchlist"
        >
          <option value="recent">Recently added</option>
          <option value="title">Title A–Z</option>
          <option value="rating">Highest rated</option>
        </select>
      </label>
    </div>
  );
};

export default WatchlistFilters;
