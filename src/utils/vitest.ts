import { ReversePromise } from "../utils/promise";
export function expectCalled(
  fn: Function,
  expectNum: number = 1,
  timeout: number = 1000
) {
  let num = 0;
  const p = new ReversePromise<void>();

  setTimeout(() => {
    p.toReject(`在${timeout}ms内,需要执行次数${expectNum},实际执行次数${num}`);
  }, timeout);
  return {
    async expectCalled() {
      return p.promise;
    },
    fn(...rest: any[]) {
      num++;
      if (num === expectNum) {
        setTimeout(() => {
          p.toResolve();
        }, 0);
      }
      fn(...rest);
    },
  };
}

export function clearLocalStorage() {
  localStorage.clear();
}
