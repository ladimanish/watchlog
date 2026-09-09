import type { WatchStatus } from '../types/watchlog';
import { cn } from '../utils/cn';

const STATUS_STYLES: Record<WatchStatus, string> = {
  want: 'bg-accent-amber/15 text-accent-amber ring-accent-amber/25',
  watching: 'bg-component-primary/15 text-component-primary ring-component-primary/25',
  reading: 'bg-accent-violet/15 text-accent-violet ring-accent-violet/25',
  done: 'bg-semantic-success/15 text-semantic-success ring-semantic-success/25',
};

const STATUS_LABELS: Record<WatchStatus, string> = {
  want: 'Want to watch',
  watching: 'Watching',
  reading: 'Reading',
  done: 'Completed',
};

const STATUS_COMPACT_LABELS: Record<WatchStatus, string> = {
  want: 'Want',
  watching: 'Watching',
  reading: 'Reading',
  done: 'Done',
};

interface StatusBadgeProps {
  status: WatchStatus;
  compact?: boolean;
  className?: string;
}

const StatusBadge = ({ status, compact = false, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        STATUS_STYLES[status],
        compact && 'px-2 py-0.5 text-[10px]',
        className,
      )}
    >
      {compact ? STATUS_COMPACT_LABELS[status] : STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
