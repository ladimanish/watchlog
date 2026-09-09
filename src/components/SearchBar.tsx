import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

type FeedbackType = 'added' | 'duplicate';

const SearchBar = () => {
  const { t } = useTranslation('views');
  const { t: tc } = useTranslation('common');
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [hasSearched, setHasSearched] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const navigate = useNavigate();
  const { addItem, isInWatchlist } = useWatchlist();
  const { results, isLoading, error, search, clearResults } = useSearchMedia();

  const runSearch = (searchQuery: string, type: MediaType) => {
    setQuery(searchQuery);
    setMediaType(type);
    setFeedbackMessage(null);
    setFeedbackType(null);
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
      setFeedbackType('added');
      setFeedbackMessage(t('search.added', { title: item.title }));
      navigate(getItemPath(item.id));
      return;
    }

    setFeedbackType('duplicate');
    setFeedbackMessage(t('search.alreadyAdded', { title: item.title }));
  };

  const showNoResults =
    hasSearched && !isLoading && !error && results.length === 0;

  return (
    <section className="glass-panel">
      <div className="mb-6">
        <h2 className="section-title">{t('search.title')}</h2>
        <p className="section-subtitle">{t('search.subtitle')}</p>
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
                setFeedbackType(null);
                clearResults();
              }
            }}
            placeholder={t('search.placeholder')}
            aria-label={t('search.queryLabel')}
            className="input-field !pl-11"
          />
        </div>

        <select
          value={mediaType}
          onChange={(event) => {
            setMediaType(event.target.value as MediaType);
            setFeedbackMessage(null);
            setFeedbackType(null);
            setHasSearched(false);
            clearResults();
          }}
          aria-label={t('search.mediaTypeLabel')}
          className="select-field sm:w-36"
        >
          <option value="movie">{tc('media.movies')}</option>
          <option value="book">{tc('media.books')}</option>
        </select>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="btn-primary sm:min-w-[120px]"
        >
          {isLoading ? t('search.searching') : t('search.searchButton')}
        </button>
      </form>

      {!hasSearched && !isLoading && (
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {t('search.trySearching')}
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
            feedbackType === 'duplicate'
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
          <p className="font-medium text-text-default">{t('search.noResultsTitle')}</p>
          <p className="text-sm text-text-muted">{t('search.noResultsDescription')}</p>
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
