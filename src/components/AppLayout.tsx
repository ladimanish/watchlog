import { Link, Outlet, useLocation } from 'react-router-dom';
import StatsBar from './StatsBar';
import NavBar from './NavBar';
import AppFooter from './AppFooter';
import WatchLogLogo from './WatchLogLogo';
import { IconLibrary } from './icons/Icons';
import { ROUTES } from '../utils/routePaths';
import { useWatchlist } from '../hooks/useWatchlist';
import { cn } from '../utils/cn';

const AppLayout = () => {
  const location = useLocation();
  const { selectedItem } = useWatchlist();
  const isHome = location.pathname === ROUTES.home;
  const isSearch = location.pathname === ROUTES.search;
  const isDetail = location.pathname.startsWith('/item/');

  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-component-primary/10 blur-3xl" />
        <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-accent-violet/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-amber/5 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {isHome ? (
          <header className="glass-panel relative mb-6 animate-slide-up overflow-hidden !p-5 sm:!p-6">
            <div
              className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-40"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-6 -top-10 h-36 w-36 rounded-full bg-component-primary/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-8 left-1/4 h-28 w-28 rounded-full bg-accent-violet/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="min-w-0 flex-1">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-component-primary/20 bg-component-primary/5 px-2.5 py-1">
                  <IconLibrary className="h-3 w-3 text-component-primary" aria-hidden="true" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-component-primary">
                    Your personal library
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="bg-title-gradient bg-clip-text inline-block pb-1 leading-normal text-transparent">
                    WatchLog
                  </span>
                </h1>

                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-text-muted">
                  Track movies you want to watch and books you want to read — all
                  in one beautiful place.
                </p>
              </div>

              <WatchLogLogo size="lg" showGlow className="self-center sm:self-auto" />
            </div>
          </header>
        ) : (
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <Link
                to={ROUTES.home}
                className="inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-semantic-focus focus:ring-offset-2 focus:ring-offset-surface-muted"
              >
                <WatchLogLogo size="sm" />
                <span className="bg-title-gradient bg-clip-text inline-block pb-0.5 text-xl font-bold leading-normal text-transparent sm:text-2xl">
                  WatchLog
                </span>
              </Link>
              {isSearch && (
                <p className="mt-0.5 text-sm text-text-muted">Discover &amp; add</p>
              )}
              {isDetail && selectedItem && (
                <nav aria-label="Breadcrumb" className="mt-1 text-sm text-text-muted">
                  <Link to={ROUTES.home} className="hover:text-component-primary">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-text-default">{selectedItem.title}</span>
                </nav>
              )}
              {isDetail && !selectedItem && (
                <p className="mt-0.5 text-sm text-text-muted">Item details</p>
              )}
            </div>
          </header>
        )}

        {isHome && <StatsBar />}
        <NavBar />

        <main className={cn('flex-1 animate-fade-in', isHome ? 'mt-4' : 'mt-2')}>
          <Outlet />
        </main>

        <AppFooter />
      </div>
    </div>
  );
};

export default AppLayout;
