export type Pipe<T> = {
  get(): T;
  to<U>(cb: (arg: T) => U): Pipe<U>;
};

export const pipe = <T>(value: T): Pipe<T> => ({
  get: () => value,
  to: <U>(cb: (arg: T) => U) => pipe(cb(value)),
});
