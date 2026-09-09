import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import WatchItemCard from './WatchItemCard';
import WatchlistFilters from './WatchlistFilters';
import { useWatchlist } from '../hooks/useWatchlist';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { getItemPath, ROUTES } from '../utils/routePaths';
import {
  filterWatchlistItems,
  sortWatchlistItems,
} from '../utils/watchlistDisplay';
import { IconEmpty } from './icons/Icons';

const WatchlistList = () => {
  const { t } = useTranslation('views');
  const { t: tc } = useTranslation('common');
  const navigate = useNavigate();
  const { watchlist, selectedId, removeItem, selectItem, isEnrichingImages } =
    useWatchlist();
  const {
    typeFilter,
    statusFilter,
    sortBy,
    setTypeFilter,
    setStatusFilter,
    setSortBy,
  } = usePreferencesStore(
    useShallow((state) => ({
      typeFilter: state.typeFilter,
      statusFilter: state.statusFilter,
      sortBy: state.sortBy,
      setTypeFilter: state.setTypeFilter,
      setStatusFilter: state.setStatusFilter,
      setSortBy: state.setSortBy,
    })),
  );

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
        <h2 className="section-title mb-2">{t('watchlist.emptyTitle')}</h2>
        <p className="section-subtitle mx-auto mb-6 max-w-sm">
          {t('watchlist.emptyDescription')}
        </p>
        <Link to={ROUTES.search} className="btn-primary">
          {tc('actions.startSearching')}
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">{t('watchlist.title')}</h2>
          <p className="section-subtitle">
            {t('watchlist.shownCount', {
              shown: filteredItems.length,
              total: watchlist.length,
            })}
            {isEnrichingImages && t('watchlist.loadingCovers')}
          </p>
        </div>
        <Link to={ROUTES.search} className="btn-secondary shrink-0">
          {tc('actions.addMore')}
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
          <p className="font-medium text-text-default">
            {t('watchlist.noMatchesTitle')}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {t('watchlist.noMatchesDescription')}
          </p>
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
