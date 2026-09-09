import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import WatchlistImageEnrichment from './components/WatchlistImageEnrichment';
import { changeAppLocale } from './i18n';
import {
  applyThemeToDocument,
  usePreferencesStore,
} from './store/usePreferencesStore';
import './i18n';
import './index.css';

const initialPreferences = usePreferencesStore.getState();

applyThemeToDocument(initialPreferences.theme);
void changeAppLocale(initialPreferences.locale);

usePreferencesStore.subscribe((state, previousState) => {
  if (state.theme !== previousState.theme) {
    applyThemeToDocument(state.theme);
  }
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <WatchlistImageEnrichment />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
