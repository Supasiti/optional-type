import { OptionNone, OptionSome, Option } from './types';

const makeNone = <T>(): OptionNone<T> => ({
  type: 'none',
  isSome: () => false,
  isNone: () => true,
  get: () => undefined,
  getOr: (defaultVal: any) => defaultVal,
  map: <U>(_cb: (val: T) => U) => makeNone<U>(),
  bind: <U>(_cb: (val: T) => Option<U>) => makeNone<U>(),
});

export const None = makeNone<any>();

const makeSome = <T>(val: T): OptionSome<T> => ({
  type: 'some',
  isSome: () => true,
  isNone: () => false,
  get: () => val,
  getOr: (_defaultVal: T) => val,
  map: <U>(cb: (val: T) => U) => Some(cb(val)),
  bind: <U>(cb: (val: T) => Option<U>) => cb(val),
});

export const Some = <T>(val: T | null | undefined): Option<T> => {
  if (val == null) return makeNone<T>();
  return makeSome(val);
};
