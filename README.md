# WatchLog

Personal Movie & Book Watchlist — built across the [Ui Dev Learning Path V2](https://cursor.com/dashboard/shared-canvases?shareId=canvas-rPgifNPjn3STTCymygeWmTu-).

## Stage 1 — TypeScript utility library

- TypeScript data model (movies + books, status, ratings)
- Filter by status, sort by rating, group by genre
- Statistics (totals, completion rate, average rating)
- TMDB + Open Library API clients
- Unit tests with mock fixtures

## Stage 2 — React 19 app

- React + TypeScript + Vite
- `WatchItemCard` — displays a single watchlist item
- `WatchlistList` — list view with add/remove
- `ItemDetailPanel` — detail view via Context (no prop drilling)
- `useSearchMedia` — custom hook (loading, error, results)
- Search cancellation via `AbortController`
- Error boundary for graceful failures
- `StatsBar` — live stats via Stage 1 `calculateStats`

## Stage 3 — React Router

- React Router v6 with `BrowserRouter`
- Routes: `/` (home), `/search`, `/item/:id`, `*` (404)
- Shared layout (`AppLayout`) with stats + `NavLink` navigation
- URL-driven item detail via `useParams` + `useNavigate`
- Invalid item ids and unknown routes handled gracefully
- Add from search navigates to detail; remove from detail returns home

## Stage 4 — Tailwind CSS styling

- Tailwind CSS with semantic design tokens (Fuse UI–style naming)
- CSS variables for light/dark themes (`surface-*`, `text-*`, `component-*`, `semantic-*`)
- `cn()` utility (`clsx` + `tailwind-merge`) for conditional classes
- All components migrated from plain CSS to Tailwind utilities
- Responsive stats grid, focus rings, and dark mode toggle in nav
- Removed `App.css` — styling lives in components + `index.css`

## Stage 5 — Redux state management

- `@reduxjs/toolkit` store with a `watchlist` slice (see branch `stage-5`)
- Replaced `WatchlistContext` with Redux (`Provider` in `main.tsx`)
- `useWatchlist` hook wrapped `useAppSelector` + `useAppDispatch`
- Reducers for add, remove, update, select, and image enrichment merge
- Slice unit tests for core reducer behavior

## Stage 6 — Zustand state management

- `zustand` stores replace Redux for runtime state (`useWatchlistStore`, `usePreferencesStore`)
- `persist` middleware saves watchlist + UI preferences to `localStorage`
- `useShallow` selectors avoid unnecessary re-renders when reading multiple fields
- Watchlist actions unchanged at the hook layer (`useWatchlist` keeps the same API)
- Theme + filter/sort preferences moved from local `useState` / `useTheme` into Zustand
- `WatchlistImageEnrichment` reads store actions directly (no Redux `Provider`)
- Store unit tests for watchlist mutations and preference updates

## Stage 7 — Internationalization (i18next)

- `i18next` + `react-i18next` with namespaced JSON resources (`common`, `views`)
- English and Spanish locale files under `src/locales/`
- User-facing strings extracted from components into translation keys
- Language selector in the nav bar; locale persisted via `usePreferencesStore`
- `useLocale` hook syncs Zustand preference with `i18next.changeLanguage`
- i18n initialized before React render via `initWatchLogApp`

## Stage 8 — Webpack + Module Federation

- Webpack 5 replaces Vite as the primary dev/build toolchain (`webpack.config.js`)
- `ModuleFederationPlugin` exposes `./WatchLogModule` as `remoteEntry.js`
- Async bootstrap entry (`index.tsx` → `bootstrap.tsx`) for federated chunk loading
- Shared singletons: `react`, `react-dom`, `react-router-dom`, `i18next`, `react-i18next`, `zustand`
- Minimal host shell under `host/` demonstrates consuming the remote (`npm run dev:host`)
- Vite scripts kept as `dev:vite` / `build:vite` for comparison

### Module Federation

| Remote name | Exposed module | Purpose |
|-------------|----------------|---------|
| `watchlog` | `./WatchLogModule` | Full app with router, error boundary, and providers |

**Standalone:** `npm run dev` → http://localhost:5173

**Host + remote:** run `npm run dev` in one terminal, then `npm run dev:host` → http://localhost:5174

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Watchlist list |
| `/search` | Search | Movie/book search + add |
| `/item/:id` | Detail | View/edit one item |
| `*` | 404 | Unknown URLs |

## Setup

```bash
npm install
cp .env.example .env   # add VITE_TMDB_API_KEY for movie search
npm run dev            # Webpack dev server at http://localhost:5173
npm run dev:host       # host shell at http://localhost:5174 (remote must be running)
npm test               # run unit tests
npm run build          # compile TypeScript to lib/
npm run build:app      # production Webpack build to dist/
```

## Environment

| Variable | Required for | Notes |
|----------|--------------|-------|
| `VITE_TMDB_API_KEY` | Movie search | Free key from [TMDB](https://developer.themoviedb.org) |
| — | Book search | Open Library needs no key |

## Project structure

```
src/
├── api/           # TMDB + Open Library clients
├── components/    # React UI (cards, layout, nav)
├── store/         # Zustand stores with persist (Stage 6)
├── i18n/          # i18next setup (Stage 7)
├── locales/       # en/es translation JSON (Stage 7)
├── hooks/         # useWatchlist, useSearchMedia, useTheme, useLocale
├── host/          # Module Federation host shell demo (Stage 8)
├── pages/         # Route-level screens (Stage 3)
├── routes/        # AppRoutes configuration (Stage 3)
├── types/         # Domain types
├── utils/         # Pure functions, routePaths, cn (Stage 1 + 3 + 4)
└── __fixtures__/  # Test data
```

## APIs

| Media | API | Key required |
|-------|-----|--------------|
| Movies | [TMDB](https://developer.themoviedb.org) | Yes |
| Books | [Open Library](https://openlibrary.org/developers/api) | No |
