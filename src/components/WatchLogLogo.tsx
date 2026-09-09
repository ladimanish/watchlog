import { useId } from 'react';
import { cn } from '../utils/cn';

type WatchLogLogoSize = 'sm' | 'lg';

interface WatchLogLogoProps {
  size?: WatchLogLogoSize;
  showGlow?: boolean;
  className?: string;
  'aria-label'?: string;
}

const sizeClasses: Record<WatchLogLogoSize, string> = {
  sm: 'h-9 w-9',
  lg: 'h-24 w-24 sm:h-28 sm:w-28',
};

const white = 'rgb(var(--text-on-color))';

const WatchLogLogo = ({
  size = 'sm',
  showGlow = false,
  className,
  'aria-label': ariaLabel = 'WatchLog',
}: WatchLogLogoProps) => {
  const gradientId = useId();

  return (
    <div
      className={cn('relative shrink-0', sizeClasses[size], className)}
      role="img"
      aria-label={ariaLabel}
    >
      {showGlow && (
        <>
          <div
            className="pointer-events-none absolute -right-2 -top-2 h-full w-full rounded-3xl bg-component-primary/25 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-2 -left-2 h-3/4 w-3/4 rounded-3xl bg-accent-violet/20 blur-2xl"
            aria-hidden="true"
          />
        </>
      )}

      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full drop-shadow-sm"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="8"
            y1="8"
            x2="56"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgb(var(--component-primary))" />
            <stop offset="1" stopColor="rgb(var(--accent-violet))" />
          </linearGradient>
        </defs>

        <rect x="4" y="4" width="56" height="56" rx="16" fill={`url(#${gradientId})`} />
        <rect
          x="10"
          y="14"
          width="24"
          height="30"
          rx="5"
          fill={white}
          fillOpacity="0.2"
          stroke={white}
          strokeWidth="2"
          transform="rotate(-8 22 29)"
        />
        <path
          d="M18 26v8l6-4-6-4z"
          fill={white}
          transform="rotate(-8 22 29)"
        />
        <rect
          x="30"
          y="20"
          width="24"
          height="30"
          rx="5"
          fill={white}
          fillOpacity="0.28"
          stroke={white}
          strokeWidth="2"
          transform="rotate(8 42 35)"
        />
        <path
          d="M38 28h10M38 34h8M38 40h6"
          stroke={white}
          strokeWidth="2"
          strokeLinecap="round"
          transform="rotate(8 42 35)"
        />
      </svg>
    </div>
  );
};

export default WatchLogLogo;
