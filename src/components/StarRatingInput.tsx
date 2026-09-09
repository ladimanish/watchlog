import type { StarRating } from '../types/watchlog';
import { cn } from '../utils/cn';
import { IconStar } from './icons/Icons';

interface StarRatingInputProps {
  value: StarRating | null;
  onChange: (rating: StarRating | null) => void;
}

const STARS: StarRating[] = [1, 2, 3, 4, 5];

const StarRatingInput = ({ value, onChange }: StarRatingInputProps) => {
  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Rating"
    >
      {STARS.map((star) => {
        const isActive = value !== null && star <= value;

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className={cn(
              'rounded p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-semantic-focus',
              isActive ? 'text-accent-amber' : 'text-border hover:text-accent-amber/60',
            )}
            onClick={() => onChange(value === star ? null : star)}
          >
            <IconStar className="h-6 w-6" />
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
