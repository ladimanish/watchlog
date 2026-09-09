import { useTranslation } from 'react-i18next';

const AppFooter = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-text-muted">
      <p>
        {t('footer.movieData')}{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-component-primary hover:underline"
        >
          TMDB
        </a>
        {' · '}
        {t('footer.bookData')}{' '}
        <a
          href="https://openlibrary.org/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-component-primary hover:underline"
        >
          Open Library
        </a>
      </p>
    </footer>
  );
};

export default AppFooter;
