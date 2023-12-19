export function reduceSet<T, R>(
  self: Set<T>,
  callbackfn: (
    previousValue: R,
    currentValue: T,
    currentIndex: number,
    set: Set<T>
  ) => R,
  initial: R
): R {
  let index = 0;
  for (const item of self) {
    initial = callbackfn(initial, item, index, self);
    index++;
  }
  return initial;
}
