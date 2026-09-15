import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockWatchlist } from '../__fixtures__/watchItems';
import type { MovieWatchItem } from '../types/watchlog';
import { isMovieItem } from '../types/watchlog';
import { renderWithProviders } from '../test-utils/render';
import { resetTestStores } from '../test-utils/resetStores';
import WatchItemCard from './WatchItemCard';

describe('WatchItemCard', () => {
  beforeEach(async () => {
    await resetTestStores();
  });

  describe('Positive Cases', () => {
    it('renders movie title, year, and rating', () => {
      const movie = mockWatchlist.find(isMovieItem) as MovieWatchItem;

      renderWithProviders(
        <WatchItemCard item={movie} onSelect={jest.fn()} onRemove={jest.fn()} />,
      );

      expect(screen.getByRole('heading', { name: movie.title })).toBeInTheDocument();
      expect(screen.getByText(String(movie.releaseYear))).toBeInTheDocument();
      expect(screen.getByText('Movie')).toBeInTheDocument();
    });

    it('calls onSelect when the card is clicked', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();
      const movie = mockWatchlist[0];

      renderWithProviders(
        <WatchItemCard item={movie} onSelect={onSelect} onRemove={jest.fn()} />,
      );

      await user.click(screen.getByRole('heading', { name: movie.title }));

      expect(onSelect).toHaveBeenCalledWith(movie.id);
    });

    it('calls onRemove when remove button is clicked', async () => {
      const user = userEvent.setup();
      const onRemove = jest.fn();
      const movie = mockWatchlist[0];

      renderWithProviders(
        <WatchItemCard item={movie} onSelect={jest.fn()} onRemove={onRemove} />,
      );

      await user.click(screen.getByRole('button', { name: 'Remove from watchlist' }));

      expect(onRemove).toHaveBeenCalledWith(movie.id);
    });
  });

  describe('Negative Cases', () => {
    it('shows placeholder when cover image is missing', () => {
      const bookWithoutCover = {
        ...mockWatchlist[2],
        coverUrl: null,
      };

      renderWithProviders(<WatchItemCard item={bookWithoutCover} />);

      expect(screen.getByText('No cover')).toBeInTheDocument();
    });

    it('does not render remove button when onRemove is omitted', () => {
      renderWithProviders(<WatchItemCard item={mockWatchlist[0]} />);

      expect(
        screen.queryByRole('button', { name: 'Remove from watchlist' }),
      ).not.toBeInTheDocument();
    });
  });
});
