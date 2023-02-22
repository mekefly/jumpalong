export function expectCalled(
  fn: Function,
  expectNum: number = 1,
  timeout: number = 1000
) {
  let num = 0;
  let rej: any;
  let res: any;

  const p = new Promise<void>((resolve, reject) => {
    rej = reject;
    res = resolve;
  });
  setTimeout(() => {
    rej?.(`在${timeout}ms内,需要执行次数${expectNum},实际执行次数${num}`);
  }, timeout);
  return {
    async expectCalled() {
      return p.then();
    },
    fn(...rest: any[]) {
      num++;
      if (num === expectNum) {
        res?.();
      }
      fn(...rest);
    },
  };
}
