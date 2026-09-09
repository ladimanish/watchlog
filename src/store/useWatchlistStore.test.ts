import { mockWatchlist } from '../__fixtures__/watchItems';
import { isMovieItem, type MovieWatchItem } from '../types/watchlog';
import { useWatchlistStore } from './useWatchlistStore';

const resetStore = () => {
  useWatchlistStore.setState({
    items: mockWatchlist,
    selectedId: null,
    isEnrichingImages: false,
    enrichmentAttemptedIds: [],
  });
};

const newMovie: MovieWatchItem = {
  id: 'new-movie',
  externalId: '999',
  type: 'movie',
  title: 'New Movie',
  genres: ['Action'],
  status: 'want',
  rating: null,
  dateAdded: '2026-03-10T10:00:00Z',
  dateCompleted: null,
  releaseYear: 2026,
  posterUrl: null,
};

describe('useWatchlistStore', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStore();
  });

  it('adds a new item', () => {
    const added = useWatchlistStore.getState().addItem(newMovie);

    expect(added).toBe(true);
    expect(useWatchlistStore.getState().items).toHaveLength(
      mockWatchlist.length + 1,
    );
    const items = useWatchlistStore.getState().items;

    expect(items[items.length - 1]?.title).toBe('New Movie');
  });

  it('does not add duplicate items', () => {
    const added = useWatchlistStore.getState().addItem(mockWatchlist[0]);

    expect(added).toBe(false);
    expect(useWatchlistStore.getState().items).toHaveLength(
      mockWatchlist.length,
    );
  });

  it('removes an item and clears selection when selected', () => {
    useWatchlistStore.setState({ selectedId: mockWatchlist[0].id });
    useWatchlistStore.getState().removeItem(mockWatchlist[0].id);

    expect(
      useWatchlistStore
        .getState()
        .items.some((item) => item.id === mockWatchlist[0].id),
    ).toBe(false);
    expect(useWatchlistStore.getState().selectedId).toBeNull();
  });

  it('updates status to done and sets completion date', () => {
    const target = mockWatchlist.find((item) => item.status !== 'done');

    expect(target).toBeDefined();

    useWatchlistStore.getState().updateItem(target!.id, { status: 'done' });

    const updated = useWatchlistStore
      .getState()
      .items.find((item) => item.id === target!.id);

    expect(updated?.status).toBe('done');
    expect(updated?.dateCompleted).not.toBeNull();
  });

  it('merges enriched items by id', () => {
    const target = mockWatchlist[0];
    const enriched = { ...target, posterUrl: 'https://example.com/poster.jpg' };

    useWatchlistStore.getState().mergeEnrichedItems([enriched]);

    const updated = useWatchlistStore
      .getState()
      .items.find((item) => item.id === target.id);

    expect(updated && isMovieItem(updated) ? updated.posterUrl : null).toBe(
      'https://example.com/poster.jpg',
    );
  });
});
