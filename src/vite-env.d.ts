/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    TMDB_API_KEY?: string;
    VITE_TMDB_API_KEY?: string;
  }
}
