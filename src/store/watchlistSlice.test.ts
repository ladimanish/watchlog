import { mockWatchlist } from '../__fixtures__/watchItems';
import { isMovieItem, type MovieWatchItem } from '../types/watchlog';
import {
  watchlistActions,
  watchlistReducer,
  type WatchlistState,
} from './watchlistSlice';

const createState = (overrides: Partial<WatchlistState> = {}): WatchlistState => ({
  items: mockWatchlist,
  selectedId: null,
  isEnrichingImages: false,
  enrichmentAttemptedIds: [],
  ...overrides,
});

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

describe('watchlistSlice', () => {
  it('adds a new item', () => {
    const state = watchlistReducer(
      createState(),
      watchlistActions.addItem(newMovie),
    );

    expect(state.items).toHaveLength(mockWatchlist.length + 1);
    expect(state.items[state.items.length - 1]?.title).toBe('New Movie');
  });

  it('does not add duplicate items', () => {
    const duplicate = mockWatchlist[0];
    const state = watchlistReducer(
      createState(),
      watchlistActions.addItem(duplicate),
    );

    expect(state.items).toHaveLength(mockWatchlist.length);
  });

  it('removes an item and clears selection when selected', () => {
    const state = watchlistReducer(
      createState({ selectedId: mockWatchlist[0].id }),
      watchlistActions.removeItem(mockWatchlist[0].id),
    );

    expect(state.items.some((item) => item.id === mockWatchlist[0].id)).toBe(
      false,
    );
    expect(state.selectedId).toBeNull();
  });

  it('updates status to done and sets completion date', () => {
    const target = mockWatchlist.find((item) => item.status !== 'done');

    expect(target).toBeDefined();

    const state = watchlistReducer(
      createState(),
      watchlistActions.updateItem({
        id: target!.id,
        updates: { status: 'done' },
      }),
    );

    const updated = state.items.find((item) => item.id === target!.id);

    expect(updated?.status).toBe('done');
    expect(updated?.dateCompleted).not.toBeNull();
  });

  it('merges enriched items by id', () => {
    const target = mockWatchlist[0];
    const enriched = { ...target, posterUrl: 'https://example.com/poster.jpg' };

    const state = watchlistReducer(
      createState(),
      watchlistActions.mergeEnrichedItems([enriched]),
    );

    const updated = state.items.find((item) => item.id === target.id);

    expect(updated && isMovieItem(updated) ? updated.posterUrl : null).toBe(
      'https://example.com/poster.jpg',
    );
  });
});
