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
});
