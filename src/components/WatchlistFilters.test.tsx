import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils/render';
import { resetTestStores } from '../test-utils/resetStores';
import WatchlistFilters from './WatchlistFilters';

describe('WatchlistFilters', () => {
  beforeEach(async () => {
    await resetTestStores();
  });

  it('renders type and status filter groups with sort control', () => {
    renderWithProviders(
      <WatchlistFilters
        typeFilter="all"
        statusFilter="all"
        sortBy="recent"
        onTypeChange={jest.fn()}
        onStatusChange={jest.fn()}
        onSortChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('group', { name: 'Filter by type' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Filter by status' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Sort' })).toBeInTheDocument();
  });

  it('calls onTypeChange when a type filter is selected', async () => {
    const user = userEvent.setup();
    const onTypeChange = jest.fn();

    renderWithProviders(
      <WatchlistFilters
        typeFilter="all"
        statusFilter="all"
        sortBy="recent"
        onTypeChange={onTypeChange}
        onStatusChange={jest.fn()}
        onSortChange={jest.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Movies' }));

    expect(onTypeChange).toHaveBeenCalledWith('movie');
  });

  it('marks the active status filter with aria-pressed', () => {
    renderWithProviders(
      <WatchlistFilters
        typeFilter="all"
        statusFilter="done"
        sortBy="recent"
        onTypeChange={jest.fn()}
        onStatusChange={jest.fn()}
        onSortChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Done' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Want' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onSortChange when sort option changes', async () => {
    const user = userEvent.setup();
    const onSortChange = jest.fn();

    renderWithProviders(
      <WatchlistFilters
        typeFilter="all"
        statusFilter="all"
        sortBy="recent"
        onTypeChange={jest.fn()}
        onStatusChange={jest.fn()}
        onSortChange={onSortChange}
      />,
    );

    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort' }), 'title');

    expect(onSortChange).toHaveBeenCalledWith('title');
  });
});
