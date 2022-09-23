import { None, Some } from '../Option';
import option from '../functor';
import { Option } from '../types';

const random = () => Math.floor(Math.random() * 10);

describe('Option functor', () => {
  describe('map', () => {
    const nonce = random();
    const testFn = (arg: number) => arg + nonce;

    it('is equivalent to apply function and then convert to Option', () => {
      const input = random();

      const result1 = option.map(testFn)(Some(input));
      const result2 = Some(testFn(input));

      expect(result1.type).toEqual(result2.type);
      expect(result1.get()).toEqual(result2.get());
    });

    it('can handle None', () => {
      const result1 = option.map(testFn)(None);

      expect(result1.type).toEqual(None.type);
      expect(result1.get()).toEqual(None.get());
    });
  });

  describe('bind', () => {
    const nonce = random();
    const testFn = (arg: number): Option<number> =>
      arg !== 4 ? Some(arg + nonce) : None;

    test.each([{ input: 6 }, { input: 4 }])(
      'is equivalent to applying the original function',
      ({ input }) => {
        const result1 = option.bind(testFn)(Some(input));
        const result2 = testFn(input);

        expect(result1.type).toEqual(result2.type);
        expect(result1.get()).toEqual(result2.get());
      },
    );

    it('handle None', () => {
      const result1 = option.bind(testFn)(None);

      expect(result1.type).toEqual(None.type);
      expect(result1.get()).toEqual(None.get());
    });
  });

  describe('apply', () => {
    const nonce = random();
    const testFn = (arg: number) => arg + nonce;

    it('is equivalent to apply the function to arg', () => {
      const someFn = Some(testFn);
      const result1 = option.apply(someFn)(Some(6)).get();
      const result2 = testFn(6);

      expect(result1).toEqual(result2);
    });
  });

  describe('lift', () => {
    const testFn2 = (arg1: number, arg2: number) => arg1 + arg2;
    const testFn3 = (arg1: number, arg2: number, arg3: number) =>
      arg1 + arg2 + arg3;

    it('is equivalent to apply the function to args', () => {
      const result1 = option.lift(testFn2)(Some(6), Some(4)).get();
      const result2 = testFn2(6, 4);

      expect(result1).toEqual(result2);
    });

    test.each([
      { inputs: [Some(6), None] },
      { inputs: [None, Some(6)] },
      { inputs: [None, None] },
    ])('handle None', ({ inputs }) => {
      const result = option.lift(testFn2)(inputs[0], inputs[1]);

      expect(result.type).toEqual(None.type);
      expect(result.get()).toEqual(None.get());
    });

    it('is equivalent to apply the function to args', () => {
      const result1 = option.lift(testFn3)(Some(6), Some(4), Some(2)).get();
      const result2 = testFn3(6, 4, 2);

      expect(result1).toEqual(result2);
    });

    test.each([
      { inputs: [None, Some(6), Some(2)] },
      { inputs: [None, Some(6), None] },
      { inputs: [None, None, Some(2)] },
      { inputs: [None, None, None] },
      { inputs: [Some(6), Some(4), None] },
      { inputs: [Some(6), None, Some(2)] },
      { inputs: [Some(6), None, None] },
    ])('handle None', ({ inputs }) => {
      const result = option.lift(testFn3)(inputs[0], inputs[1], inputs[2]);

      expect(result.type).toEqual(None.type);
      expect(result.get()).toEqual(None.get());
    });
  });
});
