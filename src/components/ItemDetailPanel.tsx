import { useTranslation } from 'react-i18next';
import {
  isBookItem,
  isMovieItem,
  type StarRating,
  type WatchStatus,
} from '../types/watchlog';
import { useWatchlist } from '../hooks/useWatchlist';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routePaths';
import StatusBadge from './StatusBadge';
import StarRatingInput from './StarRatingInput';
import { cn } from '../utils/cn';

const MOVIE_STATUSES: WatchStatus[] = ['want', 'watching', 'done'];
const BOOK_STATUSES: WatchStatus[] = ['want', 'reading', 'done'];

const STATUS_OPTION_KEYS: Record<WatchStatus, string> = {
  want: 'status.wantShort',
  watching: 'status.watchingShort',
  reading: 'status.readingShort',
  done: 'status.doneShort',
};

const ItemDetailPanel = () => {
  const { t } = useTranslation('views');
  const { t: tc } = useTranslation('common');
  const navigate = useNavigate();
  const { selectedItem, updateItem, removeItem } = useWatchlist();

  if (!selectedItem) {
    return (
      <section className="glass-panel py-12 text-center">
        <h2 className="section-title mb-2">{t('detail.selectTitle')}</h2>
        <p className="section-subtitle">{t('detail.selectDescription')}</p>
      </section>
    );
  }

  const statusOptions = isMovieItem(selectedItem)
    ? MOVIE_STATUSES
    : BOOK_STATUSES;

  const imageUrl = isMovieItem(selectedItem)
    ? selectedItem.posterUrl
    : selectedItem.coverUrl;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateItem(selectedItem.id, {
      status: event.target.value as WatchStatus,
    });
  };

  const handleRatingChange = (rating: StarRating | null) => {
    updateItem(selectedItem.id, { rating });
  };

  const handleRemove = () => {
    removeItem(selectedItem.id);
    navigate(ROUTES.home);
  };

  return (
    <section className="glass-panel overflow-hidden !p-0">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <div className="relative bg-surface-muted">
          {imageUrl ? (
            <img
              className="h-64 w-full object-cover lg:h-full lg:min-h-[420px]"
              src={imageUrl}
              alt={t('detail.coverAlt', { title: selectedItem.title })}
            />
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-muted to-surface-elevated lg:min-h-[420px]">
              <span className="text-sm text-text-muted">{t('detail.noCover')}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <Link
            to={ROUTES.home}
            className="mb-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-component-primary transition-colors hover:text-component-primary-hover"
          >
            ← {tc('actions.backToWatchlist')}
          </Link>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={selectedItem.status} />
            <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-text-muted">
              {isMovieItem(selectedItem) ? tc('media.movie') : tc('media.book')}
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-bold leading-tight text-text-default sm:text-3xl">
            {selectedItem.title}
          </h2>

          <dl className="mb-6 grid gap-3 text-sm sm:grid-cols-2">
            {isBookItem(selectedItem) && (
              <div>
                <dt className="text-text-muted">{t('detail.author')}</dt>
                <dd className="font-semibold text-text-default">
                  {selectedItem.author}
                </dd>
              </div>
            )}

            {isMovieItem(selectedItem) && (
              <div>
                <dt className="text-text-muted">{t('detail.releaseYear')}</dt>
                <dd className="font-semibold text-text-default">
                  {selectedItem.releaseYear}
                </dd>
              </div>
            )}

            {isBookItem(selectedItem) && selectedItem.publishYear !== null && (
              <div>
                <dt className="text-text-muted">{t('detail.published')}</dt>
                <dd className="font-semibold text-text-default">
                  {selectedItem.publishYear}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-text-muted">{t('detail.added')}</dt>
              <dd className="font-semibold text-text-default">
                {new Date(selectedItem.dateAdded).toLocaleDateString()}
              </dd>
            </div>

            {selectedItem.dateCompleted && (
              <div>
                <dt className="text-text-muted">{t('detail.completed')}</dt>
                <dd className="font-semibold text-text-default">
                  {new Date(selectedItem.dateCompleted).toLocaleDateString()}
                </dd>
              </div>
            )}
          </dl>

          {selectedItem.genres.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedItem.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-lg bg-component-primary/10 px-3 py-1 text-xs font-semibold text-component-primary"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto space-y-4">
            <label className="flex flex-col gap-2 text-sm font-semibold text-text-default">
              {tc('status.label')}
              <select
                value={selectedItem.status}
                onChange={handleStatusChange}
                className="select-field font-normal"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {tc(STATUS_OPTION_KEYS[status])}
                  </option>
                ))}
              </select>
            </label>

            {selectedItem.status === 'done' && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-text-default">
                  {t('detail.rating')}
                </span>
                <StarRatingInput
                  value={selectedItem.rating}
                  onChange={handleRatingChange}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            className={cn('btn-danger mt-6 w-fit')}
            onClick={handleRemove}
          >
            {tc('actions.remove')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailPanel;
