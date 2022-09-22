import { withOption } from '../withOption';

const random = () => Math.round(Math.random() * 100);

describe('withOption', () => {
  it('should be commutative if input is not null', () => {
    const input = random();
    const addOne = (value: number) => value + 1;
    const result1 = withOption(addOne)(input);
    const result2 = addOne(input);

    expect(result1).toEqual(result2);
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
