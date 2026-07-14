# WatchLog — Utility Kit (Stage 1)

Personal Movie & Book Watchlist — TypeScript utility library.

Part of the [Ui Dev Learning Path V2](https://cursor.com/dashboard/shared-canvases?shareId=canvas-rPgifNPjn3STTCymygeWmTu-) assignment.

## Stage 1 deliverables

- [x] TypeScript data model (movies + books, status flow, ratings)
- [x] Filter utilities (by status, type, genre)
- [x] Sort utilities (by rating, date added, title)
- [x] Group by genre
- [x] Statistics summary (totals, completion rate, average rating)
- [x] TMDB movie search API integration
- [x] Unit tests with realistic mock data
- [x] TMDB movie search API integration
- [x] Open Library book search API integration

## APIs used

| Media | API | Key required |
|-------|-----|--------------|
| Movies | [TMDB](https://developer.themoviedb.org) | Yes — add to `.env` |
| Books | [Open Library](https://openlibrary.org/developers/api) | No |

## Tech stack

- TypeScript 5.2 (strict mode)
- Jest 29 + ts-jest
- TMDB API (movie search)

## Setup

```bash
npm install
cp .env.example .env   # add your TMDB API key
npm test
npm run build