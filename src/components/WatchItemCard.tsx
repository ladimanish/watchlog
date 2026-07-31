import type { WatchItem } from '../types/watchlog';
import { isBookItem, isMovieItem } from '../types/watchlog';

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
  const handleSelect = () => {
    onSelect?.(item.id);
  };

  const handleRemove = () => {
    onRemove?.(item.id);
  };

  const imageUrl = isMovieItem(item) ? item.posterUrl : item.coverUrl;
  const typeLabel = isMovieItem(item) ? 'Movie' : 'Book';

  return (
    <article
      className={`watch-item-card${isSelected ? ' watch-item-card--selected' : ''}`}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      <div className="watch-item-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} />
        ) : (
          <div className="watch-item-card__placeholder">No image</div>
        )}
      </div>

      <div className="watch-item-card__body">
        <div className="watch-item-card__header">
          <h3>{item.title}</h3>
          <span className="watch-item-card__badge">{typeLabel}</span>
        </div>

        {isBookItem(item) && (
          <p className="watch-item-card__meta">Author: {item.author}</p>
        )}

        {isMovieItem(item) && (
          <p className="watch-item-card__meta">Year: {item.releaseYear}</p>
        )}

        <p className="watch-item-card__meta">Status: {item.status}</p>

        <p className="watch-item-card__meta">
          Rating: {item.rating !== null ? `${item.rating}★` : 'Not rated'}
        </p>

        <p className="watch-item-card__genres">
          {item.genres.length > 0 ? item.genres.join(', ') : 'No genres'}
        </p>

        {onRemove && (
          <button
            type="button"
            className="watch-item-card__remove"
            onClick={(event) => {
              event.stopPropagation();
              handleRemove();
            }}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
};

export default WatchItemCard;