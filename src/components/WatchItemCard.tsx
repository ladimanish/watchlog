import { useTranslation } from 'react-i18next';
import type { WatchItem } from '../types/watchlog';
import { isBookItem, isMovieItem } from '../types/watchlog';
import StatusBadge from './StatusBadge';
import { cn } from '../utils/cn';

interface WatchItemCardProps {
  item: WatchItem;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const WatchItemCard = ({
  item,
  isSelected = false,
  onSelect,
  onRemove,
}: WatchItemCardProps) => {
  const { t } = useTranslation('common');

  const handleSelect = () => {
    onSelect?.(item.id);
  };

  const handleRemove = () => {
    onRemove?.(item.id);
  };

  const imageUrl = isMovieItem(item) ? item.posterUrl : item.coverUrl;
  const typeLabel = isMovieItem(item) ? t('media.movie') : t('media.book');

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface-default shadow-card transition-all duration-300',
        'focus-within:ring-2 focus-within:ring-semantic-focus focus-within:ring-offset-2 focus-within:ring-offset-surface-muted',
        'hover:-translate-y-1 hover:shadow-elevated',
        isSelected
          ? 'border-component-primary shadow-selected ring-1 ring-component-primary/20'
          : 'border-border/70 hover:border-component-primary/30',
      )}
      aria-label={t('card.viewDetails', { title: item.title })}
    >
      <button
        type="button"
        className="flex flex-1 flex-col text-left focus:outline-none"
        onClick={handleSelect}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${item.title} cover`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-muted to-surface-elevated text-text-muted">
              <span className="text-xs font-medium">{t('card.noCover')}</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              {typeLabel}
            </span>
          </div>
          {item.rating !== null && (
            <div className="absolute right-2 top-2 rounded-full bg-accent-amber/90 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {item.rating}★
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h3
            className="line-clamp-1 text-sm font-bold text-text-default"
            title={item.title}
          >
            {item.title}
          </h3>

          {isBookItem(item) && (
            <p className="mb-1.5 truncate text-xs text-text-muted">{item.author}</p>
          )}

          {isMovieItem(item) && (
            <p className="mb-1.5 text-xs text-text-muted">{item.releaseYear}</p>
          )}

          <div className="mb-2">
            <StatusBadge status={item.status} compact />
          </div>

          {item.genres.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {item.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-text-muted"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {onRemove && (
        <button
          type="button"
          className={cn(
            'btn-danger mx-3 mb-3 !py-1.5 !text-xs',
            'opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100',
          )}
          onClick={handleRemove}
        >
          {t('actions.remove')}
        </button>
      )}
    </article>
  );
};

export default WatchItemCard;
