export interface Option<T> {
  getOrElse: (defaultValue: T) => T;
  flatMap: <U>(cb: (arg: T) => WithNull<U>) => Option<U>;
}

export type WithNull<T> = T | undefined | null;

export const Option = <T>(value: WithNull<T>): Option<T> => {
  const optValue = value;

  const getOrElse = (defaultValue: T) => {
    if (optValue == null) return defaultValue;
    return optValue;
  };

  const flatMap = <TReturn>(cb: (arg: T) => WithNull<TReturn>) => {
    // type TReturnOption = NonNullable<TReturn>;

    if (optValue == null) {
      return Option<TReturn>(undefined);
    }

    const newValue = cb(optValue);
    return Option<TReturn>(newValue);
  };

  return {
    getOrElse,
    flatMap,
  };
};
