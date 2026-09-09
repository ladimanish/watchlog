import { useTranslation } from 'react-i18next';
import { calculateStats } from '../utils/watchlistStats';
import { useWatchlist } from '../hooks/useWatchlist';
import { cn } from '../utils/cn';

const statCards = [
  {
    key: 'total',
    labelKey: 'stats.total',
    icon: '📚',
    accent: 'border-l-component-primary',
    valueClass: 'text-component-primary',
    glow: 'bg-component-primary/15',
  },
  {
    key: 'completed',
    labelKey: 'stats.completed',
    icon: '✅',
    accent: 'border-l-semantic-success',
    valueClass: 'text-semantic-success',
    glow: 'bg-semantic-success/15',
  },
  {
    key: 'completion',
    labelKey: 'stats.completionRate',
    icon: '📈',
    accent: 'border-l-accent-violet',
    valueClass: 'text-accent-violet',
    glow: 'bg-accent-violet/15',
  },
  {
    key: 'rating',
    labelKey: 'stats.averageRating',
    icon: '⭐',
    accent: 'border-l-accent-amber',
    valueClass: 'text-accent-amber',
    glow: 'bg-accent-amber/15',
  },
] as const;

const StatsBar = () => {
  const { t } = useTranslation('common');
  const { watchlist } = useWatchlist();
  const stats = calculateStats(watchlist);

  const values: Record<(typeof statCards)[number]['key'], string> = {
    total: String(stats.totalItems),
    completed: String(stats.completedCount),
    completion: `${stats.completionRate.toFixed(0)}%`,
    rating: stats.averageRating !== null ? `${stats.averageRating}★` : '—',
  };

  return (
    <section
      className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      aria-label={t('stats.ariaLabel')}
    >
      {statCards.map((card) => (
        <div
          key={card.key}
          className={cn(
            'glass-panel relative overflow-hidden !p-4 transition-transform duration-200 hover:-translate-y-0.5',
            'border-l-4',
            card.accent,
          )}
        >
          <div
            className={cn(
              'pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full blur-2xl',
              card.glow,
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              'pointer-events-none absolute -bottom-6 -left-4 h-16 w-16 rounded-full blur-2xl opacity-60',
              card.glow,
            )}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg" aria-hidden="true">
                {card.icon}
              </span>
            </div>
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
              {t(card.labelKey)}
            </span>
            <span className={cn('text-2xl font-bold tabular-nums', card.valueClass)}>
              {values[card.key]}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsBar;
