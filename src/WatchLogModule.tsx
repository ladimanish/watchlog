import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import WatchlistImageEnrichment from './components/WatchlistImageEnrichment';
import { initWatchLogApp } from './initWatchLogApp';

initWatchLogApp();

/**
 * Federated module entry — consumed by a host shell via Module Federation.
 * Includes routing and providers so the remote is self-contained.
 */
const WatchLogModule = () => {
  return (
    <ErrorBoundary>
      <WatchlistImageEnrichment />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default WatchLogModule;
