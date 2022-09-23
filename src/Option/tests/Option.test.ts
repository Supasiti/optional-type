import { None, Some } from '../Option';
import { Option } from '../types';

const random = () => Math.floor(Math.random() * 10);
const nonce = random();

describe('None', () => {
  it('returns undefined', () => {
    const defVal = random();

    expect(None.type).toEqual('none');
    expect(None.isSome()).toEqual(false);
    expect(None.isNone()).toEqual(true);
    expect(None.get()).toBeUndefined();
    expect(None.getOr(defVal)).toEqual(defVal);
  });

  describe('map', () => {
    it('returns None on map', () => {
      const defVal = random();
      const result = None.map((val: number) => val + nonce);

      expect(result.type).toEqual('none');
      expect(result.isSome()).toEqual(false);
      expect(result.isNone()).toEqual(true);
      expect(result.get()).toBeUndefined();
      expect(result.getOr(defVal)).toEqual(defVal);
    });

    it('can string maps together', () => {
      const defVal = random();
      const result = None.map((val: number) => val + nonce).map(
        (val: number) => val * nonce,
      );

      expect(result.type).toEqual('none');
      expect(result.isSome()).toEqual(false);
      expect(result.isNone()).toEqual(true);
      expect(result.get()).toBeUndefined();
      expect(result.getOr(defVal)).toEqual(defVal);
    });
  });

  describe('bind', () => {
    it('returns None on bind', () => {
      const defVal = random();
      const result = None.bind((arg: number) =>
        arg !== 4 ? Some(arg + nonce) : None,
      );

      expect(result.type).toEqual('none');
      expect(result.isSome()).toEqual(false);
      expect(result.isNone()).toEqual(true);
      expect(result.get()).toBeUndefined();
      expect(result.getOr(defVal)).toEqual(defVal);
    });
  });
});

describe('Some', () => {
  test.each([
    { des: 'undefined', input: undefined },
    { des: 'null', input: null },
  ])('returns None on $des', ({ input }) => {
    const defVal = random();
    const result = Some<any>(input);

    expect(result.type).toEqual('none');
    expect(result.isSome()).toEqual(false);
    expect(result.isNone()).toEqual(true);
    expect(result.get()).toBeUndefined();
    expect(result.getOr(defVal)).toEqual(defVal);
  });

  it('returns original value', () => {
    const input = random();
    const defVal = random();
    const result = Some(input);

    expect(result.type).toEqual('some');
    expect(result.isSome()).toEqual(true);
    expect(result.isNone()).toEqual(false);
    expect(result.get()).toEqual(input);
    expect(result.getOr(defVal)).toEqual(input);
  });

  describe('map', () => {
    it('returns Some', () => {
      const input = random();
      const result = Some(input).map((val: number) => val + nonce);

      expect(result.type).toEqual('some');
      expect(result.isSome()).toEqual(true);
      expect(result.isNone()).toEqual(false);
    });

    it('returns Option<null>', () => {
      const input = random();
      const result = Some(input).map((val: number) => null);

      expect(result.type).toEqual('some');
      expect(result.isSome()).toEqual(true);
      expect(result.isNone()).toEqual(false);
    });

    it('is equivalent to applying the function', () => {
      const input = random();
      const defVal = random();
      const testFn = (val: number) => val + nonce;
      const result1 = Some(input).map(testFn);
      const result2 = testFn(input);

      expect(result1.get()).toEqual(result2);
      expect(result1.getOr(defVal)).toEqual(result2);
    });

    it('can be stringed together', () => {
      const input = random();
      const defVal = 'random text';
      const testFn1 = (val: number) => val + nonce;
      const testFn2 = (val: number) => `${val}`;

      const result1 = Some(input).map(testFn1).map(testFn2);
      const result2 = testFn2(testFn1(input));

      expect(result1.get()).toEqual(result2);
      expect(result1.getOr(defVal)).toEqual(result2);
    });
  });

  describe('bind', () => {
    it('returns correct ', () => {
      const testFn1 = (val: number): Option<number> =>
        val !== 4 ? Some(val + nonce) : None;
      const some = Some(6).bind(testFn1);

      expect(some.type).toEqual('some');
      expect(some.isSome()).toEqual(true);
      expect(some.isNone()).toEqual(false);

      const none = Some(4).bind(testFn1);

      expect(none.type).toEqual('none');
      expect(none.isSome()).toEqual(false);
      expect(none.isNone()).toEqual(true);
    });

    it('is equivalent to applying the function', () => {
      const testFn1 = (val: number): Option<number> =>
        val !== 4 ? Some(val + nonce) : None;
      const some = Some(6).bind(testFn1);
      const some2 = testFn1(6);

      expect(some.get()).toEqual(some2.get());
    });

    test.each([{ input: 6 }, { input: 4 }, { input: 2 }])(
      'can be stringed together',
      ({ input }) => {
        const testFn1 = (val: number): Option<number> =>
          val !== 4 ? Some(val + 2) : None;
        const testFn2 = (val: number): Option<string> =>
          val !== 4 ? Some(`${val}`) : None;

        const some = Some(input).bind(testFn1).bind(testFn2).get();

        const equivFn = (val: number) => {
          const intVal = testFn1(val).get();
          return !!intVal ? testFn2(intVal).get() : undefined;
        };
        const some2 = equivFn(input);

        expect(some).toEqual(some2);
      },
    );

    test.each([{ input: 4 }, { input: 2 }])(
      'can be used with map',
      ({ input }) => {
        const testFn1 = (val: number): Option<number> =>
          val !== 4 ? Some(val + 2) : None;
        const testFn2 = (val: number) => `${val}`;

        const some = Some(input).bind(testFn1).map(testFn2).get();

        const equivFn = (val: number) => {
          const intVal = testFn1(val).get();
          return !!intVal ? testFn2(intVal) : undefined;
        };
        const some2 = equivFn(input);

        expect(some).toEqual(some2);
      },
    );
  });
});
