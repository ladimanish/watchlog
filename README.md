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

- `@reduxjs/toolkit` store with a `watchlist` slice
- Replaced `WatchlistContext` with Redux (`Provider` in `main.tsx`)
- `useWatchlist` hook wraps `useAppSelector` + `useAppDispatch` (same API for components)
- Reducers for add, remove, update, select, and image enrichment merge
- `WatchlistImageEnrichment` handles async poster/cover fetching as a side effect
- Typed store hooks: `useAppDispatch`, `useAppSelector`
- Slice unit tests for core reducer behavior

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
npm run dev            # start React app at http://localhost:5173
npm test               # run Stage 1 unit tests
npm run build          # compile TypeScript to lib/
npm run build:app      # production React build to dist/
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
├── store/         # Redux store, watchlist slice, typed hooks (Stage 5)
├── hooks/         # useWatchlist, useSearchMedia, useTheme
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
