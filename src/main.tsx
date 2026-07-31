import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { WatchlistProvider } from './context/WatchlistContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);