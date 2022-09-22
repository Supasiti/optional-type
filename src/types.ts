import { Optional } from './Option';

export type Functor<TGeneric, UGeneric> = {
  from: <T>(arg: T) => TGeneric;
  map: <T, U>(cb: (arg: T) => U) => (arg: TGeneric) => UGeneric;
  bind: <T, U>(cb: (arg: T) => UGeneric) => (arg: TGeneric) => UGeneric;
};

type OptionFunctor<T, U> = Functor<Optional<T>, Optional<U>>;
