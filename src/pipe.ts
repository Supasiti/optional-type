export type Pipe<T> = {
  get: () => T;
  to: <U>(cb: (arg: T) => U) => Pipe<U>;
};

export const pipe = <T>(value: T): Pipe<T> => {
  const _value = value;

  return {
    get: () => _value,
    to: <U>(cb: (arg: T) => U) => pipe(cb(value)),
  };
};
