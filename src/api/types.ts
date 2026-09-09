/** Raw shape returned by TMDB /search/movie endpoint */
export interface TmdbMovieResult {
  id: number;
  title: string;
  genre_ids: number[];
  release_date: string;
  poster_path: string | null;
}

export interface TmdbSearchResponse {
  results: TmdbMovieResult[];
}

/** Raw shape returned by TMDB /movie/{id} endpoint */
export interface TmdbMovieDetails {
  id: number;
  poster_path: string | null;
}

/** Raw shape from Open Library /works/{id}.json */
export interface OpenLibraryWork {
  covers?: number[];
  type?: { key: string };
  location?: string;
}

/** Thrown when TMDB API call fails */
export class TmdbApiError extends Error {
    constructor(
        message: string,
        public readonly statusCode?: number,
    ) {
        super(message);
        this.name = 'TmdbApiError';
    }
}

/** Raw shape from Open Library /search.json */
export interface OpenLibraryDoc {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    subject?: string[];
    cover_i?: number;
}

export interface OpenLibrarySearchResponse {
    numFound: number;
    docs: OpenLibraryDoc[];
}

export class OpenLibraryApiError extends Error {
    constructor(
        message: string,
        public readonly statusCode?: number,
    ) {
        super(message);
        this.name = 'OpenLibraryApiError';
    }
}