import type { SVGProps } from 'react';
import { cn } from '../../utils/cn';

type IconProps = SVGProps<SVGSVGElement>;

const iconSize = 'h-4 w-4 shrink-0';

const svgProps = (className: string | undefined, size = iconSize) => ({
  className: cn(size, className),
});

export const IconLibrary = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...svgProps(className)} {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconStar = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...svgProps(className)} {...props}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const IconSun = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...svgProps(className)} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
  </svg>
);

export const IconMoon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...svgProps(className)} {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSearch = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...svgProps(className)} {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
  </svg>
);

export const IconEmpty = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    {...svgProps(className, 'h-10 w-10 shrink-0')}
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 15h4M7 11h10" strokeLinecap="round" />
  </svg>
);
