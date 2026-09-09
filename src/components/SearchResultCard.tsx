import { useTranslation } from 'react-i18next';
import type { WatchItem } from '../types/watchlog';
import { isBookItem, isMovieItem } from '../types/watchlog';
import { cn } from '../utils/cn';

interface SearchResultCardProps {
  item: WatchItem;
  alreadyAdded: boolean;
  onAdd: (item: WatchItem) => void;
}

const SearchResultCard = ({
  item,
  alreadyAdded,
  onAdd,
}: SearchResultCardProps) => {
  const { t } = useTranslation('views');
  const { t: tc } = useTranslation('common');
  const imageUrl = isMovieItem(item) ? item.posterUrl : item.coverUrl;

  return (
    <li className="flex gap-3 rounded-xl border border-border/70 bg-surface-default p-3 shadow-sm transition-colors hover:border-component-primary/30">
      <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <span className="sr-only">{t('search.noCover')}</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div>
          <p className="line-clamp-2 text-sm font-semibold text-text-default" title={item.title}>
            {item.title}
          </p>
          {isBookItem(item) && (
            <p className="truncate text-xs text-text-muted">{item.author}</p>
          )}
          {isMovieItem(item) && item.releaseYear > 0 && (
            <p className="text-xs text-text-muted">{item.releaseYear}</p>
          )}
        </div>
        <button
          type="button"
          disabled={alreadyAdded}
          onClick={() => onAdd(item)}
          className={cn(
            'w-fit self-start whitespace-nowrap !px-3 !py-1.5 !text-xs',
            alreadyAdded ? 'btn-secondary !opacity-70' : 'btn-primary',
          )}
        >
          {alreadyAdded ? tc('actions.added') : tc('actions.add')}
        </button>
      </div>
    </li>
  );
};

export default SearchResultCard;
