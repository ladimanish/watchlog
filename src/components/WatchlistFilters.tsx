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

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface FilterButtonGroupProps<T extends string> {
  label: string;
  ariaLabel: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const FilterButtonGroup = <T extends string>({
  label,
  ariaLabel,
  options,
  value,
  onChange,
}: FilterButtonGroupProps<T>) => {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <div
        role="group"
        aria-label={ariaLabel}
        className="inline-flex max-w-full overflow-x-auto rounded-lg border border-border bg-surface-muted/60 p-0.5"
      >
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              className={cn(
                'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-semantic-focus focus-visible:ring-offset-1',
                isActive
                  ? 'bg-component-primary text-text-onColor shadow-sm'
                  : 'text-text-muted hover:bg-surface-elevated hover:text-text-default',
              )}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const WatchlistFilters = ({
  typeFilter,
  statusFilter,
  sortBy,
  onTypeChange,
  onStatusChange,
  onSortChange,
}: WatchlistFiltersProps) => {
  const { t } = useTranslation('common');

  const typeOptions: FilterOption<TypeFilter>[] = [
    { value: 'all', label: t('filters.all') },
    { value: 'movie', label: t('media.movies') },
    { value: 'book', label: t('media.books') },
  ];

  const statusOptions: FilterOption<StatusFilter>[] = [
    { value: 'all', label: t('filters.allStatus') },
    { value: 'want', label: t('status.wantShort') },
    { value: 'in-progress', label: t('filters.inProgress') },
    { value: 'done', label: t('status.doneShort') },
  ];

  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-5">
      <FilterButtonGroup
        label={t('filters.filterByType')}
        ariaLabel={t('filters.filterByType')}
        options={typeOptions}
        value={typeFilter}
        onChange={onTypeChange}
      />

      <FilterButtonGroup
        label={t('filters.filterByStatus')}
        ariaLabel={t('filters.filterByStatus')}
        options={statusOptions}
        value={statusFilter}
        onChange={onStatusChange}
      />

      <div className="flex min-w-0 flex-col gap-1.5 sm:ml-auto">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          {t('filters.sort')}
        </span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="select-field !py-1.5 !text-xs sm:min-w-[180px]"
          aria-label={t('filters.sort')}
        >
          <option value="recent">{t('filters.sortRecent')}</option>
          <option value="title">{t('filters.sortTitle')}</option>
          <option value="rating">{t('filters.sortRating')}</option>
        </select>
      </div>
    </div>
  );
};

export default WatchlistFilters;
