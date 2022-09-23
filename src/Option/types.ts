export type OptionType = 'some' | 'none';

export interface Option<T> {
  // types: None, Some

  type: OptionType;

  // true if type == Some

  isSome(): boolean;

  // true if type == None

  isNone(): boolean;

  // return underlining value or undefined

  get(): T | undefined;

  // return underlining value or default value

  getOr(defaultVal: T): T;

  // apply function to return option

  map<U>(cb: (val: T) => U): Option<U>;

  // apply cross domain function to return option

  bind<U>(cb: (val: T) => Option<U>): Option<U>;
}

export interface OptionSome<T> extends Option<T> {
  type: 'some';
  get(): T;
  map<U>(cb: (val: T) => U): OptionSome<U>;
}

export interface OptionNone<T> extends Option<T> {
  type: 'none';
  get(): undefined;
  map<U>(cb: (val: T) => U): OptionNone<U>;
  bind<U>(cb: (val: T) => Option<U>): OptionNone<U>;
}

export interface OptionFunctor {
  // convert function to accept Option

  map<T, U>(cb: (arg: T) => U): (arg: Option<T>) => Option<U>;

  // convert cross domain function to accept Option

  bind<T, U>(cb: (arg: T) => Option<U>): (arg: Option<T>) => Option<U>;

  // function with multiple arguments to accept Option

  lift<U>(cb: (...args: any[]) => U): (...args: Option<any>[]) => Option<U>;

  // unwrap optional function

  apply<T, U>(optFn: Option<(arg: T) => U>): (arg: Option<T>) => Option<U>;
}
