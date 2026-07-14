/** Raw shape returned by TMDB /search/movie endpoint */
export interface TmdbMovieResult {
    id: number;
    title: string;
    genre_ids: number[];
    release_date: string;
    poster_path: string | null;
    overview: string;
  }
  
  export interface TmdbSearchResponse {
    page: number;
    results: TmdbMovieResult[];
    total_results: number;
    total_pages: number;
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