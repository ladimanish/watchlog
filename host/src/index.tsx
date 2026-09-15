import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

const WatchLogModule = lazy(() => import('watchlog/WatchLogModule'));

const HostApp = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <header
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #e5e7eb',
          background: '#f9fafb',
          fontSize: 14,
        }}
      >
        WatchLog Host Shell — remote loaded via Module Federation
      </header>
      <Suspense fallback={<p style={{ padding: 20 }}>Loading WatchLog…</p>}>
        <WatchLogModule />
      </Suspense>
    </div>
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <HostApp />
  </StrictMode>,
);
