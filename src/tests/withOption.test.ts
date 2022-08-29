import { describe, it, expect, vi } from 'vitest';
import { Option } from '..';
import { withOption } from '../withOption';

describe('withOption', () => {
  it('should return a function that excepts null', () => {
    const addOne = (value: number) => value + 1;
    const result = withOption(addOne)(4);
    expect(result).toEqual(5);
  });

  it('should handle undefined', () => {
    const addOne = (value: number) => value + 1;
    const result = withOption(addOne)(undefined);
    expect(result).toBeUndefined();
  });

  it('should handle null', () => {
    const addOne = (value: number) => value + 1;
    const result = withOption(addOne)(null);
    expect(result).toBeUndefined();
  });

  it('should handle function that can return null', () => {
    const addOneOrNull = (value: number) => (value === 4 ? null : value + 1);
    const result = withOption(addOneOrNull)(4);
    expect(result).toBeNull();
  });
});
