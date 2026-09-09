import { NavLink } from 'react-router-dom';
import { ROUTES } from '../utils/routePaths';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';
import { IconMoon, IconSun } from './icons/Icons';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-semantic-focus focus:ring-offset-2 focus:ring-offset-surface-default',
      isActive
        ? 'bg-component-primary text-text-onColor shadow-sm'
        : 'text-text-muted hover:bg-surface-muted hover:text-text-default',
    );

  return (
    <nav
      className="glass-panel mb-5 flex flex-wrap items-center gap-2 !p-2"
      aria-label="Main navigation"
    >
      <NavLink to={ROUTES.home} className={navLinkClass} end>
        Home
      </NavLink>

      <NavLink to={ROUTES.search} className={navLinkClass}>
        Search
      </NavLink>

      <button
        type="button"
        onClick={toggleTheme}
        className="btn-secondary ml-auto inline-flex items-center gap-2 !rounded-lg !px-3 !py-2"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <>
            <IconSun />
            Light
          </>
        ) : (
          <>
            <IconMoon />
            Dark
          </>
        )}
      </button>
    </nav>
  );
};

export default NavBar;
