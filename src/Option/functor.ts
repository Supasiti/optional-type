import { None, Some } from './Option';
import { OptionFunctor, Option } from './types';

const map =
  <T, U>(cb: (arg: T) => U) =>
  (val: Option<T>): Option<U> => {
    const curVal = val.get();
    if (!curVal) return None;

    return Some(cb(curVal));
  };

const bind =
  <T, U>(cb: (arg: T) => Option<U>) =>
  (val: Option<T>): Option<U> => {
    const curVal = val.get();
    if (!curVal) return None;

    return cb(curVal);
  };

const option: OptionFunctor = {
  map,
  bind,
};

export default option;
