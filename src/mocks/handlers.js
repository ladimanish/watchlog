const { rest } = require('msw');

const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';

const tmdbMovieSearchHandler = rest.get(TMDB_SEARCH_URL, (req, res, ctx) => {
  const query = req.url.searchParams.get('query');

  if (query?.toLowerCase() === 'inception') {
    return res(
      ctx.json({
        page: 1,
        results: [
          {
            id: 27205,
            title: 'Inception',
            release_date: '2010-07-16',
            poster_path: '/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
            genre_ids: [878, 28],
          },
        ],
        total_pages: 1,
        total_results: 1,
      }),
    );
  }

  return res(
    ctx.json({
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    }),
  );
});

const openLibrarySearchHandler = rest.get(
  OPEN_LIBRARY_SEARCH_URL,
  (req, res, ctx) => {
    const query = req.url.searchParams.get('q');

    if (query?.toLowerCase() === 'dune') {
      return res(
        ctx.json({
          numFound: 1,
          start: 0,
          docs: [
            {
              key: '/works/OL893414W',
              title: 'Dune',
              author_name: ['Frank Herbert'],
              first_publish_year: 1965,
              cover_i: 11481354,
              subject: ['Science Fiction'],
            },
          ],
        }),
      );
    }

    return res(ctx.json({ numFound: 0, start: 0, docs: [] }));
  },
);

const tmdbSearchErrorHandler = rest.get(TMDB_SEARCH_URL, (_req, res, ctx) =>
  res(ctx.status(401), ctx.json({ status_message: 'Invalid API key' })),
);

const handlers = [tmdbMovieSearchHandler, openLibrarySearchHandler];

module.exports = {
  handlers,
  tmdbMovieSearchHandler,
  openLibrarySearchHandler,
  tmdbSearchErrorHandler,
};
