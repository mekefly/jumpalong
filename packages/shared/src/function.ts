/**
 * 让自执行函数懒加载
 *
 * 懒函数也不要滥用！！！
 *
 * @param fun 要懒加载的自执行函数
 * @param rest1 要懒加载的自执行函数的参数
 * @returns 返回一个函数，执行后初始化，加第一次调用一起执行
 */
export function lazyFun<A1 extends any[], A2 extends any[], R>(
  fun: (...rest: A1) => (...rest: A2) => R,
  ...rest1: A1
): (...rest: A2) => R {
  // 存储传入的高级函数返回的函数， 你是不是晕了，我写的时候也把自己绕进去了
  let rf: any = (...rest2: A2) => (rf = fun(...rest1))(...rest2)
  // 这里目前简化不了只能返回高级函数， 是无法直接返回我们传入的高级函数里面返回的高级函数的，
  // 因为使用者已经将其放到了变量里，我们改不了他的变量,只能套一层改自己的了变量了
  return (...rest2: A2) => rf(...rest2)
}

/**
 * 给函数绑定新指定的this，并返回一个新的函数
 * @param _this
 * @param fn
 * @returns  新的函数
 */
export function polyfillBind<A, R>(
  _this: Object,
  fn: (...rest: A[]) => R
): (...rest: A[]) => R {
  const boundFn = function (...rest: any): R {
    return fn.apply(_this, rest)
  }
  return boundFn
}

/**
 *  修改函数的this环境
 *
 * @param _this 传入你想要让成为的this
 * @param fun 传入你要运行的函数
 * @param rest 函数的参数
 */
export function call<A extends any[], R, THIS>(
  _this: THIS,
  fun: (...rest: A) => R,
  ...rest: A
): R {
  // 使用symbol可以避免产生重复
  const temp = Symbol('temp')

  ;(_this as any)[temp] = fun

  const ret = (_this as any)[temp](...rest)

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete (_this as any)[temp]
  return ret
}
