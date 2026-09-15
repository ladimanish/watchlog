import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { tmdbSearchErrorHandler } from '../mocks/handlers.js';
import { renderWithProviders } from '../test-utils/render';
import { server, setupApiMocks } from '../test-utils/setupApiMocks';
import { resetEmptyWatchlist, resetTestStores } from '../test-utils/resetStores';
import SearchBar from './SearchBar';

const renderSearchBar = () =>
  renderWithProviders(
    <Routes>
      <Route path="/search" element={<SearchBar />} />
      <Route path="/item/:id" element={<div>Item detail page</div>} />
    </Routes>,
    { routerProps: { initialEntries: ['/search'] } },
  );

describe('SearchBar', () => {
  setupApiMocks();

  beforeEach(async () => {
    process.env.TMDB_API_KEY = 'test-key';
    await resetTestStores();
  });

  describe('Positive Cases', () => {
    it('shows movie results from MSW-mocked TMDB search', async () => {
      const user = userEvent.setup();
      await resetEmptyWatchlist();
      renderSearchBar();

      await user.type(screen.getByLabelText('Search query'), 'Inception');
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(await screen.findByText('Inception')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('shows book results from MSW-mocked Open Library search', async () => {
      const user = userEvent.setup();
      renderSearchBar();

      await user.selectOptions(screen.getByLabelText('Media type'), 'book');
      await user.type(screen.getByLabelText('Search query'), 'Dune');
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(await screen.findByText('Dune')).toBeInTheDocument();
      expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
    });

    it('adds a search result to the watchlist and navigates to detail', async () => {
      const user = userEvent.setup();
      await resetEmptyWatchlist();
      renderSearchBar();

      await user.type(screen.getByLabelText('Search query'), 'Inception');
      await user.click(screen.getByRole('button', { name: 'Search' }));
      await user.click(await screen.findByRole('button', { name: 'Add' }));

      expect(await screen.findByText('Item detail page')).toBeInTheDocument();
    });
  });

  describe('Negative Cases', () => {
    it('shows empty state when search returns no results', async () => {
      const user = userEvent.setup();
      renderSearchBar();

      await user.type(screen.getByLabelText('Search query'), 'Unknown Title XYZ');
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(await screen.findByText('No results found')).toBeInTheDocument();
    });

    it('shows API error message when TMDB search fails', async () => {
      server.use(tmdbSearchErrorHandler);

      const user = userEvent.setup();
      renderSearchBar();

      await user.type(screen.getByLabelText('Search query'), 'Inception');
      await user.click(screen.getByRole('button', { name: 'Search' }));

      await waitFor(() => {
        expect(screen.getByText(/TMDB search failed: 401/i)).toBeInTheDocument();
      });
    });

    it('disables search button when query is empty', () => {
      renderSearchBar();

      expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    });
  });
});
