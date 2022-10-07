import { None, Option, Some } from '../Option';
import { Result, ResultFail, ResultMatch, ResultSucess } from './types';

export const Fail = <E, T = any>(err: E): ResultFail<T, E> => ({
  type: 'fail',
  isSuccess: () => false,
  isFail: () => true,
  success: () => None as Option<T>,
  fail: () => Some(err),
  get: () => undefined,
  getOr: (defaultVal: T) => defaultVal,
  getFail: () => err,
  map: <U>(_cb: (val: T) => U) => Fail<E, U>(err),
  mapFail: <U>(cb: (e: E) => U) => Fail(cb(err)),
  then: <U>(_cb: (val: T) => Result<U, E>) => Fail<E, U>(err),
  catch: <U>(cb: (e: E) => Result<U, E>) => cb(err),
  match: <U>(matchPattern: ResultMatch<T, E, U>) => matchPattern.fail(err),
});

export const Success = <T, E = any>(val: T): ResultSucess<T, E> => {
  const some = Some(val);
  return {
    type: 'success',
    isSuccess: () => true,
    isFail: () => false,
    success: () => some,
    fail: () => None,
    get: () => some.get(),
    getOr: (defaultVal: T) => some.getOr(defaultVal),
    getFail: () => undefined,
    map: <U>(cb: (val: T) => U) => Success(cb(val)),
    mapFail: <U>(_cb: (err: E) => U) => Success<T, U>(val),
    then: <U>(cb: (val: T) => Result<U, E>) => cb(val),
    catch: <U>(_cb: (e: E) => Result<U, E>) => Success(val),
    match: <U>(matchPattern: ResultMatch<T, E, U>) => matchPattern.success(val),
  };
};
