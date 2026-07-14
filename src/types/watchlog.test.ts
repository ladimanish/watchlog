import {
    isWatchStatus,
    isStarRating,
    isMovieItem,
    isBookItem,
    isWatchItem,
    getInProgressStatus,
    isRatingAllowed,
    isValidRatingForStatus,
    type MovieWatchItem,
    type BookWatchItem,
} from './watchlog';

const mockMovie: MovieWatchItem = {
    id: '1',
    externalId: '550',
    type: 'movie',
    title: 'Fight Club',
    genres: ['Drama'],
    status: 'done',
    rating: 5,
    dateAdded: '2026-01-15T10:00:00Z',
    dateCompleted: '2026-01-20T10:00:00Z',
    releaseYear: 1999,
    posterUrl: null,
};

const mockBook: BookWatchItem = {
    id: '2',
    externalId: 'OL123W',
    type: 'book',
    title: 'Dune',
    author: 'Frank Herbert',
    genres: ['Sci-Fi'],
    status: 'reading',
    rating: null,
    dateAdded: '2026-02-01T10:00:00Z',
    dateCompleted: null,
    publishYear: 1965,
    coverUrl: null,
};

describe('type guards', () => {
    describe('isWatchStatus', () => {
        it('returns true for valid statuses', () => {
            expect(isWatchStatus('want')).toBe(true);
            expect(isWatchStatus('watching')).toBe(true);
            expect(isWatchStatus('reading')).toBe(true);
            expect(isWatchStatus('done')).toBe(true);
        });

        it('returns false for invalid values', () => {
            expect(isWatchStatus('pending')).toBe(false);
            expect(isWatchStatus(null)).toBe(false);
            expect(isWatchStatus(1)).toBe(false);
        });
    });

    describe('isStarRating', () => {
        it('returns true for 1–5', () => {
            expect(isStarRating(1)).toBe(true);
            expect(isStarRating(5)).toBe(true);
        });

        it('returns false for out-of-range values', () => {
            expect(isStarRating(0)).toBe(false);
            expect(isStarRating(6)).toBe(false);
            expect(isStarRating('5')).toBe(false);
        });
    });

    describe('isMovieItem / isBookItem', () => {
        it('narrows movie items correctly', () => {
            expect(isMovieItem(mockMovie)).toBe(true);
            expect(isBookItem(mockMovie)).toBe(false);
        });

        it('narrows book items correctly', () => {
            expect(isBookItem(mockBook)).toBe(true);
            expect(isMovieItem(mockBook)).toBe(false);
        });
    });

    describe('isWatchItem', () => {
        it('returns true for valid movie object', () => {
            expect(isWatchItem(mockMovie)).toBe(true);
        });

        it('returns false for incomplete objects', () => {
            expect(isWatchItem({ id: '1' })).toBe(false);
            expect(isWatchItem(null)).toBe(false);
        });
    });
});

describe('business rule helpers', () => {
    describe('getInProgressStatus', () => {
        it('returns watching for movies', () => {
            expect(getInProgressStatus('movie')).toBe('watching');
        });

        it('returns reading for books', () => {
            expect(getInProgressStatus('book')).toBe('reading');
        });
    });

    describe('isRatingAllowed', () => {
        it('allows rating only when done', () => {
            expect(isRatingAllowed('done')).toBe(true);
            expect(isRatingAllowed('want')).toBe(false);
            expect(isRatingAllowed('watching')).toBe(false);
        });
    });

    describe('isValidRatingForStatus', () => {
        it('requires null rating for non-done statuses', () => {
            expect(isValidRatingForStatus('want', null)).toBe(true);
            expect(isValidRatingForStatus('want', 5)).toBe(false);
        });

        it('allows rating or null when done', () => {
            expect(isValidRatingForStatus('done', 4)).toBe(true);
            expect(isValidRatingForStatus('done', null)).toBe(true);
        });
    });
});