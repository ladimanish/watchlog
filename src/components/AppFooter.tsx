const AppFooter = () => {
  return (
    <footer className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-text-muted">
      <p>
        Movie data from{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-component-primary hover:underline"
        >
          TMDB
        </a>
        {' · '}
        Book data from{' '}
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
