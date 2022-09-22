export type Optional<T> = T | null | undefined;

export type OptionFunctor = {
  from: <T>(arg: T) => Optional<T>;
  map: <T, U>(cb: (arg: T) => U) => (arg: Optional<T>) => Optional<U>;
  bind: <T, U>(
    cb: (arg: T) => Optional<U>,
  ) => (arg: Optional<T>) => Optional<U>;
};

const mapImpl =
  <T, U>(cb: (arg: T) => U) =>
  (arg: Optional<T>) => {
    if (arg == null) return arg as Optional<U>;

    return cb(arg);
  };

const bindImpl =
  <T, U>(cb: (arg: T) => Optional<U>) =>
  (arg: Optional<T>) => {
    if (arg == null) return arg as Optional<U>;
    return cb(arg);
  };

const Option: OptionFunctor = {
  from: <T>(arg: T) => arg as Optional<T>,
  map: mapImpl,
  bind: bindImpl,
};

export default Option;
