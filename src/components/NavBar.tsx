import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/routePaths';
import { useTheme } from '../hooks/useTheme';
import { useLocale } from '../hooks/useLocale';
import { supportedLocales, type AppLocale } from '../i18n';
import { cn } from '../utils/cn';
import { IconMoon, IconSun } from './icons/Icons';

const NavBar = () => {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();

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
      aria-label={t('nav.main')}
    >
      <NavLink to={ROUTES.home} className={navLinkClass} end>
        {t('nav.home')}
      </NavLink>

      <NavLink to={ROUTES.search} className={navLinkClass}>
        {t('nav.search')}
      </NavLink>

      <label className="ml-auto flex items-center gap-2 text-xs font-medium text-text-muted">
        {t('nav.language')}
        <select
          value={locale}
          onChange={(event) => setLocale(event.target.value as AppLocale)}
          className="select-field !py-1.5 !text-xs"
          aria-label={t('nav.language')}
        >
          {supportedLocales.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={toggleTheme}
        className="btn-secondary inline-flex items-center gap-2 !rounded-lg !px-3 !py-2"
        aria-label={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
      >
        {theme === 'dark' ? (
          <>
            <IconSun />
            {t('nav.light')}
          </>
        ) : (
          <>
            <IconMoon />
            {t('nav.dark')}
          </>
        )}
      </button>
    </nav>
  );
};

export default NavBar;
