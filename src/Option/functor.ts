import { None, Some } from './Option';
import { OptionFunctor, Option } from './types';

// convert (T => U) => E<T> => E<U>

const map =
  <T, U>(cb: (arg: T) => U) =>
  (val: Option<T>): Option<U> =>
    val.map(cb);

// convert (T => E<U>) => E<T> => E<U>

const bind =
  <T, U>(cb: (arg: T) => Option<U>) =>
  (val: Option<T>): Option<U> =>
    val.bind(cb);

// convert E<T => U> => E<T> => E<U>

const apply =
  <T, U>(optFn: Option<(arg: T) => U>) =>
  (val: Option<T>): Option<U> => {
    if (val.isNone() || optFn.isNone()) return None;

    return optFn.bind((fn) => val.map(fn));
  };

// convert (T[] => U) => E<T>[] => E<U>

const lift =
  <U>(cb: (...args: any[]) => U) =>
  (...vals: Option<any>[]): Option<U> => {
    const [val1, ...rest] = vals;

    if (!rest.length) return option.map(cb)(val1);

    const intCb =
      (...rest: any[]) =>
      (val1: any) =>
        cb(val1, ...rest);

    const optionIntCb = lift(intCb)(...rest);
    return apply(optionIntCb)(val1);
  };

const option: OptionFunctor = {
  map,
  bind,
  lift,
  apply,
};

export default option;
