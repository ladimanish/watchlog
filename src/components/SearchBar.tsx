import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MediaType, WatchItem } from '../types/watchlog';
import { isBookItem } from '../types/watchlog';
import { useWatchlist } from '../context/WatchlistContext';
import { useSearchMedia } from '../hooks/useSearchMedia';
import { getItemPath } from '../utils/routePaths';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [hasSearched, setHasSearched] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addItem, isInWatchlist } = useWatchlist();
  const { results, isLoading, error, search, clearResults } = useSearchMedia();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedbackMessage(null);
    setHasSearched(true);
    void search(query, mediaType);
  };

  const handleAddToWatchlist = (item: WatchItem) => {
    const added = addItem(item);

    if (added) {
      setFeedbackMessage(`Added "${item.title}" to your watchlist`);
      navigate(getItemPath(item.id));
      return;
    }

    setFeedbackMessage(`"${item.title}" is already in your watchlist`);
  };

  const showNoResults =
    hasSearched && !isLoading && !error && results.length === 0;

  return (
    <section className="search-bar">
      <h2>Search</h2>

      <form className="search-bar__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title..."
          aria-label="Search query"
        />

        <select
          value={mediaType}
          onChange={(event) => {
            setMediaType(event.target.value as MediaType);
            setFeedbackMessage(null);
            setHasSearched(false);
            clearResults();
          }}
          aria-label="Media type"
        >
          <option value="movie">Movie</option>
          <option value="book">Book</option>
        </select>

        <button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="search-bar__error">{error}</p>}
      {feedbackMessage && (
        <p
          className={
            feedbackMessage.includes('already')
              ? 'search-bar__hint'
              : 'search-bar__success'
          }
        >
          {feedbackMessage}
        </p>
      )}

      {showNoResults && (
        <p className="search-bar__hint">No results found.</p>
      )}

      {results.length > 0 && (
        <ul className="search-bar__results">
          {results.map((item) => {
            const alreadyAdded = isInWatchlist(item.externalId, item.type);

            return (
              <li
                key={`${item.type}-${item.externalId}`}
                className="search-bar__result"
              >
                <div>
                  <strong>{item.title}</strong>
                  {isBookItem(item) && (
                    <span className="search-bar__result-meta">
                      {' '}
                      — {item.author}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  disabled={alreadyAdded}
                  onClick={() => handleAddToWatchlist(item)}
                >
                  {alreadyAdded ? 'Added' : 'Add to watchlist'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default SearchBar;
