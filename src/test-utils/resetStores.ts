import { emptyWatchlist, mockWatchlist } from '../__fixtures__/watchItems';
import { changeAppLocale } from '../i18n';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { useWatchlistStore } from '../store/useWatchlistStore';

interface ResetStoreOptions {
  watchlist?: typeof mockWatchlist;
}

export const resetTestStores = async (
  options: ResetStoreOptions = {},
): Promise<void> => {
  localStorage.clear();

  useWatchlistStore.setState({
    items: options.watchlist ?? mockWatchlist,
    selectedId: null,
    isEnrichingImages: false,
    enrichmentAttemptedIds: [],
  });

  usePreferencesStore.setState({
    theme: 'light',
    locale: 'en',
    typeFilter: 'all',
    statusFilter: 'all',
    sortBy: 'recent',
  });

  await changeAppLocale('en');
};

export const resetEmptyWatchlist = async (): Promise<void> => {
  await resetTestStores({ watchlist: emptyWatchlist });
};
