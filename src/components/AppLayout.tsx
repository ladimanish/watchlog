import { Outlet } from 'react-router-dom';
import StatsBar from './StatsBar';
import NavBar from './NavBar';

const AppLayout = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>WatchLog</h1>
        <p className="app-header__subtitle">
          Personal Movie &amp; Book Watchlist
        </p>
      </header>

      <StatsBar />
      <NavBar />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;