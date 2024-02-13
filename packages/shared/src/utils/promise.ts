export class ReversePromise<T = undefined> {
  resolve?: any
  reject?: any
  promise!: Promise<T>
  constructor() {
    this.reset()
  }
  toResolve(...[v]: T extends undefined ? [] : [value: T]) {
    this.resolve(v)
  }
  toReject(e: any) {
    this.reject(e)
  }
  reset() {
    this.promise = new Promise<T>((res, rej) => {
      this.resolve = res
      this.reject = rej
    })
  }
}
