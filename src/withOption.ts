export type Option<T extends {}> = T | undefined | null;

type OptionFunc<T extends {}, U extends {}> = (arg: Option<T>) => Option<U>;

export const withOption =
  <T extends {}, U extends {}>(fn: (arg: T) => Option<U>): OptionFunc<T, U> =>
  (arg: Option<T>) => {
    if (arg == null) return undefined;
    return fn(arg);
  };
