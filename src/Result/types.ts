import { Option } from '../Option';

export type ResultType = 'success' | 'fail';

export interface Result<T, E> {
  // types: success, fail

  type: ResultType;

  // true if type == success

  isSuccess(): boolean;

  // true if type == fail

  isFail(): boolean;

  // return optional success

  success(): Option<T>;

  // return optional fail

  fail(): Option<E>;

  // return underlining success or undefined

  get(): T | undefined;

  // // return underlining success or default value

  getOr(defaultVal: T): T;

  // // return underlining fail or undefined

  getFail(): E | undefined;

  // apply function to result

  map<U>(cb: (val: T) => U): Result<U, E>;

  // apply function to fail

  mapFail<U>(cb: (err: E) => U): Result<T, U>;

  // apply cross domain function to success

  then<U>(cb: (val: T) => Result<U, E>): Result<U, E>;

  // apply cross domain function to fail

  catch<U>(cb: (err: E) => Result<U, E>): Result<T, E> | Result<U, E>;
}

export interface ResultFail<T, E> extends Result<T, E> {
  type: 'fail';
  get: () => undefined;
  getFail: () => E;
  map<U>(cb: (val: T) => U): ResultFail<U, E>;
  mapFail<U>(cb: (err: E) => U): ResultFail<T, U>;
  then<U>(cb: (val: T) => Result<U, E>): ResultFail<U, E>;
  catch<U>(cb: (err: E) => Result<U, E>): Result<U, E>;
}

export interface ResultSucess<T, E = any> extends Result<T, E> {
  type: 'success';
  getFail: () => undefined;
  map<U>(cb: (val: T) => U): ResultSucess<U, E>;
  mapFail<U>(cb: (err: E) => U): ResultSucess<T, U>;
  catch<U>(cb: (err: E) => Result<U, E>): Result<T, E>;
}
