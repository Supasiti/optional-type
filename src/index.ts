export interface Option<T> {
  getOrElse: (defaultValue: T) => T;
  flatMap: <TFunc extends (arg: T) => unknown>(
    arg: TFunc,
  ) => Option<NonNullable<ReturnType<TFunc>>>;
}

export type WithNull<T> = T | undefined | null;

export const Option = <T>(value: WithNull<T>): Option<T> => {
  const optValue = value;

  const getOrElse = (defaultValue: T) => {
    if (optValue == null) return defaultValue;
    return optValue;
  };

  const flatMap = <TFunc extends (arg: T) => unknown>(fn: TFunc) => {
    type TReturnOption = NonNullable<ReturnType<TFunc>>;

    if (optValue == null) {
      return Option<TReturnOption>(undefined);
    }

    const newValue = fn(optValue) as WithNull<TReturnOption>;
    return Option<TReturnOption>(newValue);
  };

  return {
    getOrElse,
    flatMap,
  };
};
