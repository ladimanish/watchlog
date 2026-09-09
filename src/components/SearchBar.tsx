import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MediaType, WatchItem } from '../types/watchlog';
import { useWatchlist } from '../hooks/useWatchlist';
import { useSearchMedia } from '../hooks/useSearchMedia';
import { getItemPath } from '../utils/routePaths';
import { cn } from '../utils/cn';
import { IconSearch } from './icons/Icons';
import SearchSkeleton from './SearchSkeleton';
import SearchResultCard from './SearchResultCard';

const SUGGESTED_SEARCHES = [
  { query: 'Inception', type: 'movie' as MediaType },
  { query: 'Dune', type: 'book' as MediaType },
  { query: 'Interstellar', type: 'movie' as MediaType },
  { query: '1984', type: 'book' as MediaType },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [hasSearched, setHasSearched] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addItem, isInWatchlist } = useWatchlist();
  const { results, isLoading, error, search, clearResults } = useSearchMedia();

  const runSearch = (searchQuery: string, type: MediaType) => {
    setQuery(searchQuery);
    setMediaType(type);
    setFeedbackMessage(null);
    setHasSearched(true);
    void search(searchQuery, type);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(query, mediaType);
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
    <section className="glass-panel">
      <div className="mb-6">
        <h2 className="section-title">Discover something new</h2>
        <p className="section-subtitle">
          Search TMDB for movies or Open Library for books
        </p>
      </div>

      <form
        className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;
              setQuery(nextQuery);

              if (!nextQuery.trim()) {
                setHasSearched(false);
                setFeedbackMessage(null);
                clearResults();
              }
            }}
            placeholder="Search by title..."
            aria-label="Search query"
            className="input-field !pl-11"
          />
        </div>

        <select
          value={mediaType}
          onChange={(event) => {
            setMediaType(event.target.value as MediaType);
            setFeedbackMessage(null);
            setHasSearched(false);
            clearResults();
          }}
          aria-label="Media type"
          className="select-field sm:w-36"
        >
          <option value="movie">Movies</option>
          <option value="book">Books</option>
        </select>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="btn-primary sm:min-w-[120px]"
        >
          {isLoading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {!hasSearched && !isLoading && (
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
            Try searching for
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SEARCHES.map((suggestion) => (
              <button
                key={`${suggestion.type}-${suggestion.query}`}
                type="button"
                className="rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-text-default transition-colors hover:border-component-primary/40 hover:bg-surface-elevated"
                onClick={() => runSearch(suggestion.query, suggestion.type)}
              >
                {suggestion.query}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-semantic-error/30 bg-semantic-error-muted/50 px-4 py-3 text-sm text-semantic-error">
          {error}
        </div>
      )}

      {feedbackMessage && (
        <div
          className={cn(
            'mb-4 rounded-xl px-4 py-3 text-sm font-medium',
            feedbackMessage.includes('already')
              ? 'bg-surface-muted text-text-muted'
              : 'border border-semantic-success/30 bg-semantic-success-muted text-semantic-success',
          )}
        >
          {feedbackMessage}
        </div>
      )}

      {isLoading && <SearchSkeleton />}

      {showNoResults && (
        <div className="rounded-xl border border-dashed border-border bg-surface-muted/50 px-6 py-10 text-center">
          <p className="font-medium text-text-default">No results found</p>
          <p className="text-sm text-text-muted">
            Try a different title or switch between movies and books
          </p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
          {results.map((item) => (
            <SearchResultCard
              key={`${item.type}-${item.externalId}`}
              item={item}
              alreadyAdded={isInWatchlist(item.externalId, item.type)}
              onAdd={handleAddToWatchlist}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchBar;
