import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');

  const typeOptions: { value: TypeFilter; label: string }[] = [
    { value: 'all', label: t('filters.all') },
    { value: 'movie', label: t('media.movies') },
    { value: 'book', label: t('media.books') },
  ];

  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: t('filters.allStatus') },
    { value: 'want', label: t('status.wantShort') },
    { value: 'in-progress', label: t('filters.inProgress') },
    { value: 'done', label: t('status.doneShort') },
  ];

  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t('filters.filterByType')}
      >
        {typeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={pillClass(typeFilter === option.value)}
            onClick={() => onTypeChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t('filters.filterByStatus')}
      >
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={pillClass(statusFilter === option.value)}
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-xs font-medium text-text-muted">
        {t('filters.sort')}
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="select-field !py-1.5 !text-xs"
          aria-label={t('filters.sort')}
        >
          <option value="recent">{t('filters.sortRecent')}</option>
          <option value="title">{t('filters.sortTitle')}</option>
          <option value="rating">{t('filters.sortRating')}</option>
        </select>
      </label>
    </div>
  );
};

export default WatchlistFilters;
