import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  applyThemeToDocument,
  usePreferencesStore,
} from '../store/usePreferencesStore';

export const useTheme = () => {
  const { theme, toggleTheme } = usePreferencesStore(
    useShallow((state) => ({
      theme: state.theme,
      toggleTheme: state.toggleTheme,
    })),
  );

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  return { theme, toggleTheme };
};
