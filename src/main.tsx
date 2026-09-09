import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import WatchlistImageEnrichment from './components/WatchlistImageEnrichment';
import {
  applyThemeToDocument,
  usePreferencesStore,
} from './store/usePreferencesStore';
import './index.css';

applyThemeToDocument(usePreferencesStore.getState().theme);

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
