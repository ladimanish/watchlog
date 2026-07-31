import { calculateStats } from '../utils/watchlistStats';
import { useWatchlist } from '../context/WatchlistContext';

const StatsBar = () => {
  const { watchlist } = useWatchlist();
  const stats = calculateStats(watchlist);

  return (
    <section className="stats-bar" aria-label="Watchlist statistics">
      <div className="stats-bar__item">
        <span className="stats-bar__label">Total</span>
        <span className="stats-bar__value">{stats.totalItems}</span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__label">Completed</span>
        <span className="stats-bar__value">{stats.completedCount}</span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__label">Completion</span>
        <span className="stats-bar__value">
          {stats.completionRate.toFixed(0)}%
        </span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__label">Avg rating</span>
        <span className="stats-bar__value">
          {stats.averageRating !== null ? `${stats.averageRating}★` : '—'}
        </span>
      </div>
    </section>
  );
};

export default StatsBar;