import { None, Some } from './Option';
import { OptionFunctor, Option } from './types';

// convert (T => U) => E<T> => E<U>

const map =
  <T, U>(cb: (arg: T) => U) =>
  (val: Option<T>): Option<U> => {
    const curVal = val.get();
    if (!curVal) return None;

    return Some(cb(curVal));
  };

// convert (T => E<U>) => E<T> => E<U>

const bind =
  <T, U>(cb: (arg: T) => Option<U>) =>
  (val: Option<T>): Option<U> => {
    const curVal = val.get();
    if (!curVal) return None;

    return cb(curVal);
  };

// convert E<T => U> => E<T> => E<U>

const apply =
  <T, U>(optFn: Option<(arg: T) => U>) =>
  (val: Option<T>): Option<U> => {
    const curVal = val.get();
    const curFn = optFn.get();
    if (!curVal || !curFn) return None;

    return Some(curFn(curVal));
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
