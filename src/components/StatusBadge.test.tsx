import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/render';
import { resetTestStores } from '../test-utils/resetStores';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  beforeEach(async () => {
    await resetTestStores();
  });

  it('renders full status label by default', () => {
    renderWithProviders(<StatusBadge status="watching" />);

    expect(screen.getByText('Watching')).toBeInTheDocument();
  });

  it('renders compact status label when compact is true', () => {
    renderWithProviders(<StatusBadge status="done" compact />);

    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
