# WatchLog — Utility Kit (Stage 1)

Personal Movie & Book Watchlist — TypeScript utility library.

Part of the [Ui Dev Learning Path V2](https://cursor.com/dashboard/shared-canvases?shareId=canvas-rPgifNPjn3STTCymygeWmTu-) assignment.

## Stage 1 deliverables

- [x] TypeScript data model (movies + books, status flow, ratings)
- [x] Filter by status
- [x] Sort by rating
- [x] Group by genre
- [x] Statistics (totals, completion rate, average rating)
- [x] TMDB movie search API
- [x] Open Library book search API
- [x] Unit tests with mock data

## Setup

```bash
npm install
cp .env.example .env   # add your TMDB API key
npm test
npm run build
```

## APIs

| Media | API | Key required |
|-------|-----|--------------|
| Movies | [TMDB](https://developer.themoviedb.org) | Yes — `.env` |
| Books | [Open Library](https://openlibrary.org/developers/api) | No |
