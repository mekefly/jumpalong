export class ReversePromise<T> {
  resolve?: any;
  reject?: any;
  promise = new Promise<T>((res, rej) => {
    this.resolve = res;
    this.reject = rej;
  });
  constructor() {}
  toResolve(v: T) {
    this.resolve();
  }
  toReject(e: any) {
    this.reject();
  }
}
