import {
  isBookItem,
  isMovieItem,
  type StarRating,
  type WatchStatus,
} from '../types/watchlog';
import { useWatchlist } from '../context/WatchlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routePaths';

const MOVIE_STATUSES: WatchStatus[] = ['want', 'watching', 'done'];
const BOOK_STATUSES: WatchStatus[] = ['want', 'reading', 'done'];
const STAR_RATINGS: StarRating[] = [1, 2, 3, 4, 5];

const formatStatusLabel = (status: WatchStatus): string =>
  status.charAt(0).toUpperCase() + status.slice(1);

const ItemDetailPanel = () => {
  const navigate = useNavigate();
  const { selectedItem, updateItem, removeItem } = useWatchlist();

  if (!selectedItem) {
    return (
      <section className="detail-panel">
        <h2>Details</h2>
        <p className="detail-panel__empty">Select an item to see details</p>
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

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    updateItem(selectedItem.id, {
      rating: value === '' ? null : (Number(value) as StarRating),
    });
  };

  const handleRemove = () => {
    if (!selectedItem) {
      return;
    }

    removeItem(selectedItem.id);
    navigate(ROUTES.home);
  };

  return (
    <section className="detail-panel">
      <h2>Details</h2>

      <Link to={ROUTES.home} className="detail-panel__back">
        ← Back to watchlist
      </Link>

      <div className="detail-panel__content">
        {imageUrl ? (
          <img
            className="detail-panel__image"
            src={imageUrl}
            alt={selectedItem.title}
          />
        ) : (
          <div className="detail-panel__image detail-panel__placeholder">
            No image
          </div>
        )}

        <h3 className="detail-panel__title">{selectedItem.title}</h3>

        <p className="detail-panel__meta">
          Type: {isMovieItem(selectedItem) ? 'Movie' : 'Book'}
        </p>

        {isBookItem(selectedItem) && (
          <p className="detail-panel__meta">Author: {selectedItem.author}</p>
        )}

        {isMovieItem(selectedItem) && (
          <p className="detail-panel__meta">
            Release year: {selectedItem.releaseYear}
          </p>
        )}

        {isBookItem(selectedItem) && selectedItem.publishYear !== null && (
          <p className="detail-panel__meta">
            Published: {selectedItem.publishYear}
          </p>
        )}

        <p className="detail-panel__meta">
          Genres:{' '}
          {selectedItem.genres.length > 0
            ? selectedItem.genres.join(', ')
            : 'None'}
        </p>

        <p className="detail-panel__meta">
          Added: {new Date(selectedItem.dateAdded).toLocaleDateString()}
        </p>

        {selectedItem.dateCompleted && (
          <p className="detail-panel__meta">
            Completed:{' '}
            {new Date(selectedItem.dateCompleted).toLocaleDateString()}
          </p>
        )}

        <label className="detail-panel__field">
          Status
          <select value={selectedItem.status} onChange={handleStatusChange}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {formatStatusLabel(status)}
              </option>
            ))}
          </select>
        </label>

        {selectedItem.status === 'done' && (
          <label className="detail-panel__field">
            Rating
            <select
              value={selectedItem.rating ?? ''}
              onChange={handleRatingChange}
            >
              <option value="">Select rating</option>
              {STAR_RATINGS.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}★
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          type="button"
          className="watch-item-card__remove detail-panel__remove"
          onClick={handleRemove}
        >
          Remove from watchlist
        </button>
      </div>
    </section>
  );
};

export default ItemDetailPanel;
