import {
  applyThemeToDocument,
  usePreferencesStore,
} from './usePreferencesStore';

describe('usePreferencesStore', () => {
  beforeEach(() => {
    localStorage.clear();
    usePreferencesStore.setState({
      theme: 'light',
      locale: 'en',
      typeFilter: 'all',
      statusFilter: 'all',
      sortBy: 'recent',
    });
  });

  it('toggles theme', () => {
    usePreferencesStore.getState().toggleTheme();

    expect(usePreferencesStore.getState().theme).toBe('dark');

    usePreferencesStore.getState().toggleTheme();

    expect(usePreferencesStore.getState().theme).toBe('light');
  });

  it('updates filter preferences', () => {
    usePreferencesStore.getState().setTypeFilter('movie');
    usePreferencesStore.getState().setStatusFilter('done');
    usePreferencesStore.getState().setSortBy('rating');

    expect(usePreferencesStore.getState().typeFilter).toBe('movie');
    expect(usePreferencesStore.getState().statusFilter).toBe('done');
    expect(usePreferencesStore.getState().sortBy).toBe('rating');
  });

  it('applies dark class to the document', () => {
    const classList = {
      toggle: jest.fn(),
    };

    Object.defineProperty(global, 'document', {
      value: { documentElement: { classList } },
      configurable: true,
    });

    applyThemeToDocument('dark');

    expect(classList.toggle).toHaveBeenCalledWith('dark', true);

    applyThemeToDocument('light');

    expect(classList.toggle).toHaveBeenCalledWith('dark', false);
  });
});
