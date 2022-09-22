import { Option } from '..';

describe('index', () => {
  describe('getOrElse', () => {
    it('should return value', () => {
      const input = 4;
      const result = Option(input).getOrElse(0);

      expect(result).toEqual(4);
    });

    it('should handle undefined', () => {
      const result = Option<number>(undefined).getOrElse(0);

      expect(result).toEqual(0);
    });

    it('should handle null', () => {
      const result = Option<number>(null).getOrElse(0);

      expect(result).toEqual(0);
    });
  });

  describe('flatMap', () => {
    it('should return a new optional type', () => {
      const result = Option(4)
        .flatMap((value: number) => value + 1)
        .getOrElse(0);

      expect(result).toEqual(5);
    });

    it('should be able to concat functions together', () => {
      const result = Option(4)
        .flatMap((value: number) => value + 1)
        .flatMap((value: number) => `${value}`)
        .getOrElse('');

      expect(result).toEqual('5');
    });

    it('should handle nullable function', () => {
      const result = Option(4)
        .flatMap((value: number) => (value === 4 ? null : value))
        .getOrElse(0);

      expect(result).toEqual(0);
    });

    it('should handle action', () => {
      const spy = jest.spyOn(global.console, 'error');
      Option(4).flatMap((value: number) => {});

      expect(spy).not.toBeCalled();
    });
  });
});
