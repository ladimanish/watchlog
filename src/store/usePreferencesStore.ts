import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { AppLocale } from '../i18n';

export type Theme = 'light' | 'dark';
export type TypeFilter = 'all' | 'movie' | 'book';
export type StatusFilter = 'all' | 'want' | 'in-progress' | 'done';
export type SortOption = 'recent' | 'title' | 'rating';

interface PreferencesState {
  theme: Theme;
  locale: AppLocale;
  typeFilter: TypeFilter;
  statusFilter: StatusFilter;
  sortBy: SortOption;
}

interface PreferencesActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLocale: (locale: AppLocale) => void;
  setTypeFilter: (value: TypeFilter) => void;
  setStatusFilter: (value: StatusFilter) => void;
  setSortBy: (value: SortOption) => void;
}

export type PreferencesStore = PreferencesState & PreferencesActions;

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = localStorage.getItem('watchlog-theme');

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const usePreferencesStore = create<PreferencesStore>()(
  devtools(
    persist(
      (set) => ({
        theme: getPreferredTheme(),
        locale: 'en',
        typeFilter: 'all',
        statusFilter: 'all',
        sortBy: 'recent',

        setTheme: (theme) => {
          set({ theme });
        },

        toggleTheme: () => {
          set((state) => ({
            theme: state.theme === 'dark' ? 'light' : 'dark',
          }));
        },

        setLocale: (locale) => {
          set({ locale });
        },

        setTypeFilter: (value) => {
          set({ typeFilter: value });
        },

        setStatusFilter: (value) => {
          set({ statusFilter: value });
        },

        setSortBy: (value) => {
          set({ sortBy: value });
        },
      }),
      {
        name: 'watchlog-preferences',
        storage: createJSONStorage(() => localStorage),
        migrate: (persistedState) => {
          const state = persistedState as Partial<PreferencesState> | undefined;

          return {
            theme: state?.theme ?? getPreferredTheme(),
            locale: state?.locale ?? 'en',
            typeFilter: state?.typeFilter ?? 'all',
            statusFilter: state?.statusFilter ?? 'all',
            sortBy: state?.sortBy ?? 'recent',
          };
        },
      },
    ),
    { name: 'PreferencesStore' },
  ),
);

export const applyThemeToDocument = (theme: Theme): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
};
