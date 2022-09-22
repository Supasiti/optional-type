import Option from '../Option';

describe('Option', () => {
  describe('from', () => {
    it('will return itself', () => {
      const input = Math.floor(Math.random() * 10);
      const result = Option.from(input);
      expect(result).toEqual(input);
    });
  });

  describe('map', () => {
    const nonce = Math.floor(Math.random() * 10);
    const testFn = (arg: number) => arg + nonce;

    it('returns the same result as the original function', () => {
      const input = Math.floor(Math.random() * 10);

      const result1 = Option.map(testFn)(input);
      const result2 = testFn(input);

      expect(result1).toEqual(result2);
    });

    it('can handle undefined ', () => {
      const result = Option.map(testFn)(undefined);

      expect(result).toBeUndefined();
    });

    it('can handle null ', () => {
      const result = Option.map(testFn)(null);

      expect(result).toBeNull();
    });
  });

  describe('bind', () => {
    const nonce = Math.floor(Math.random() * 10);
    const testFn = (arg: number) => (arg !== 4 ? arg + nonce : null);

    it('returns the same result as the original function', () => {
      const input = Math.floor(Math.random() * 10);

      const result1 = Option.bind(testFn)(input);
      const result2 = testFn(input);

      expect(result1).toEqual(result2);
    });

    it('can handle undefined ', () => {
      const result = Option.bind(testFn)(undefined);

      expect(result).toBeUndefined();
    });

    it('can handle null ', () => {
      const result = Option.bind(testFn)(null);

      expect(result).toBeNull();
    });
  });
});
