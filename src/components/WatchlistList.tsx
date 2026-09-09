import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WatchItemCard from './WatchItemCard';
import WatchlistFilters, {
  type SortOption,
  type StatusFilter,
  type TypeFilter,
} from './WatchlistFilters';
import { useWatchlist } from '../context/WatchlistContext';
import { getItemPath, ROUTES } from '../utils/routePaths';
import {
  filterWatchlistItems,
  sortWatchlistItems,
} from '../utils/watchlistDisplay';
import { IconEmpty } from './icons/Icons';

const WatchlistList = () => {
  const navigate = useNavigate();
  const { watchlist, selectedId, removeItem, selectItem, isEnrichingImages } =
    useWatchlist();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const filteredItems = useMemo(() => {
    const filtered = filterWatchlistItems(watchlist, typeFilter, statusFilter);
    return sortWatchlistItems(filtered, sortBy);
  }, [watchlist, typeFilter, statusFilter, sortBy]);

  const handleSelect = (id: string) => {
    selectItem(id);
    navigate(getItemPath(id));
  };

  if (watchlist.length === 0) {
    return (
      <section className="glass-panel py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-component-primary">
          <IconEmpty />
        </div>
        <h2 className="section-title mb-2">Your watchlist is empty</h2>
        <p className="section-subtitle mx-auto mb-6 max-w-sm">
          Discover movies and books, then add them here to track your progress.
        </p>
        <Link to={ROUTES.search} className="btn-primary">
          Start searching
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">My Watchlist</h2>
          <p className="section-subtitle">
            {filteredItems.length} of {watchlist.length} shown
            {isEnrichingImages && ' · Loading cover art…'}
          </p>
        </div>
        <Link to={ROUTES.search} className="btn-secondary shrink-0">
          + Add more
        </Link>
      </div>

      <WatchlistFilters
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
      />

      {filteredItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface-default/60 px-6 py-10 text-center">
          <p className="font-medium text-text-default">No items match these filters</p>
          <p className="mt-1 text-sm text-text-muted">Try a different filter combination</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <WatchItemCard
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onSelect={handleSelect}
              onRemove={removeItem}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WatchlistList;
