import { cn } from './cn';

describe('cn', () => {
  test('merges conditional classes', () => {
    expect(cn('px-2', false && 'hidden', 'py-1')).toBe('px-2 py-1');
  });

  test('resolves conflicting Tailwind utilities', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
