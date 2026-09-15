import { changeAppLocale } from './i18n';
import {
  applyThemeToDocument,
  usePreferencesStore,
} from './store/usePreferencesStore';
import './i18n';
import './index.css';

let initialized = false;

/** One-time theme, locale, and CSS setup for standalone and federated mounts. */
export const initWatchLogApp = (): void => {
  if (initialized) {
    return;
  }

  initialized = true;

  const initialPreferences = usePreferencesStore.getState();

  applyThemeToDocument(initialPreferences.theme);
  void changeAppLocale(initialPreferences.locale);

  usePreferencesStore.subscribe((state, previousState) => {
    if (state.theme !== previousState.theme) {
      applyThemeToDocument(state.theme);
    }
  });
};
