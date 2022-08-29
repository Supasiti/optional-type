export type Option<T> = T | undefined | null;

type OptionFunc<T, U> = (arg: Option<T>) => Option<U>;

export const withOption =
  <T, U>(fn: (arg: T) => U): OptionFunc<T, U> =>
  (arg: Option<T>) => {
    if (arg == null) return undefined;
    return fn(arg);
  };
