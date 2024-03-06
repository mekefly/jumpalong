export function getQueryVariable(variable: string): string {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return decodeURI(pair[1])
    }
  }
  return ''
}

export function interceptTheLastSixDigits(str: string) {
  return str.slice(str.length - 6)
}
export function clipboardText(text: string) {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text)
  } else {
    var textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值
    textarea.value = text
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
}

export function nowSecondTimestamp() {
  return Math.floor(Date.now() / 1000)
}
export function withDefault<T extends object, D extends object>(
  target?: T,
  def?: D
): T & D {
  if (!target) return { ...def } as any
  if (!def) return target as any

  for (const key in def) {
    ;(target as any)[key] ?? ((target as any)[key] = (def as any)[key])
  }
  return target as any
}
export function timeout(timeout: number = 0) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
export function isClass(c: unknown): c is new (...args: any[]) => any {
  return (
    typeof c === 'function' && typeof c.prototype?.constructor === 'function'
  )
}
export function isPromise(promise: any) {
  return !!promise && typeof promise.then === 'function'
}
export const newWeakMap = (() => {
  try {
    if (window.WeakMap) {
      return <K extends object, V>() => {
        return new WeakMap() as WeakMap<K, V>
      }
    }
  } catch (error) {}
  return <K extends object, V>() => {
    return new Map() as WeakMap<K, V>
  }
})()
export function createId() {
  return (Math.random() * 2 ** 52).toString(36)
}

/**
 * 任意数为底的对数
 * @param base 底数
 * @param n 任意数
 * @returns
 */
export function log(base: number, n: number) {
  return Math.log(n) / Math.log(base)
}

/**
 * 防抖,先不执行，等待时间后执行，如果等待时间内再次执行，上次执行取消
 * @param f
 * @param delay
 * @returns
 */
export function debounce<F extends (...rest: any) => any>(
  f: F,
  delay: number = 1000,
  maxDelay: number = delay * 4
): F & {
  clear?: () => void
} {
  if (delay <= 0) {
    return f
  }
  let t: NodeJS.Timeout | undefined
  let maxId: any
  const ff = (...rest: any) => {
    clearTimeout(t)
    t = setTimeout(() => {
      clearTimeout(maxId)
      f(...rest)
    }, delay)
    if (maxId) return
    maxId = setTimeout(() => {
      maxId = null
      clearTimeout(t)
      f(...rest)
    }, maxDelay)
  }
  ff.clear = () => {
    clearTimeout(t)
    t = undefined
  }
  return ff as any
}

/**
 * 节流
 * @param f
 * @param delay
 * @returns
 */
export function throttle<F extends (...rest: any) => any>(
  f: F,
  delay: number = 2000
) {
  let isRun = false
  return (...rest: any) => {
    if (isRun) {
      return
    }

    isRun = true
    setTimeout(() => (isRun = false), delay)
    return f(...rest)
  }
}
export function searchInsertOnObjectList<E>(
  objList: E[],
  target: E,
  getValue: (item: E) => number
) {
  const len = objList.length
  if (len === 0) return 0
  const _getValue = (index: number) => {
    return getValue(objList[index])
  }

  const targetValue = getValue(target)

  // 两边
  if (objList.length === 0 || targetValue < _getValue(0)) return 0

  if (targetValue > _getValue(len - 1)) return len

  // 二分法
  let left = 0,
    right = len - 1
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (_getValue(mid) === targetValue) return mid
    else if (_getValue(mid) > targetValue) {
      // target 在左边
      right = mid
    } else {
      // target 在右边
      left = mid + 1
    }
  }
  return left
}
export function insertOnObjectList<E>(
  objList: E[],
  target: E,
  getValue: (item: E) => number
) {
  let i = searchInsertOnObjectList<E>(objList, target, getValue)
  objList.splice(i, 0, target)
}
export function reverseInsertOnObjectList<E>(
  objList: E[],
  target: E,
  getValue: (item: E) => number
) {
  let i = reverseSearchInsertOnObjectList<E>(objList, target, getValue)
  objList.splice(i, 0, target)
}
export function reverseSearchInsertOnObjectList<E>(
  objList: E[],
  target: E,
  getValue: (item: E) => number
) {
  const len = objList.length
  if (len === 0) return 0
  const _getValue = (index: number) => getValue(objList[index])
  let targetValue = getValue(target)

  // 两边
  if (targetValue > _getValue(0)) return 0
  if (targetValue < _getValue(len - 1)) return len

  // 二分法
  let left = 0
  let right = len - 1

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)

    let midValue = _getValue(mid)

    if (midValue === targetValue) return mid
    else if (targetValue > midValue) {
      // target 在左边
      right = mid
    } else {
      // target 在右边
      left = mid + 1
    }
  }
  return right
}
function getValue(objs: any, key: (string | number | symbol)[]) {
  return key.reduce((previousValue, currentValue) => {
    if (previousValue === undefined) return undefined
    return previousValue[currentValue]
  }, objs)
}
export function getSetIncrement<T>(target: Set<T>, increase: Set<T>): Set<T> {
  const increment = new Set<T>()
  increase.forEach(v => {
    !target.has(v) && increment.add(v)
  })
  return increment
}

export function arrayRemove<E>(arr: Array<E>, e: E) {
  const index = arr.indexOf(e)
  if (index === -1) {
    return
  }
  arr.splice(index, 1)
}
export function arrayInsert<E>(arr: Array<E>, e: E, v: E) {
  const index = arr.indexOf(e)
  if (index === -1) {
    return
  }
  arr.splice(index, 0, v)
}
export function merageSet<T>(...sets: Set<T>[]) {
  const newSet = new Set<T>()
  for (const set of sets) {
    for (const item of set) {
      newSet.add(item)
    }
  }
  return newSet
}

export function noUndefinedInTheArray<T>(array: T[]): Exclude<T, undefined> {
  return array.filter(item => item !== undefined) as any
}
export function objectSet<
  O extends object,
  K extends string | symbol | number,
  V
>(object: O, key: K, value: V): O & { [k in K]: V } {
  ;(object as any)[key] = value
  return object as any
}
export function objectGet<Value>(
  object: object,
  key: string | symbol | number
): Value {
  return (object as any)[key] as any
}

export async function ping(url: string, timeout: number = 2000) {
  const start = Date.now()
  return new Promise<number>(async (resolve, reject) => {
    try {
      await fetch(`${window.location.protocol}//${url}/`, {
        mode: 'no-cors',
      })
      resolve(Date.now() - start)
    } catch (e) {
      if (String(e).includes('Failed to fetch')) {
        reject('无法连接')
      } else {
        reject('未知原因无法连接')
      }
    }
    setTimeout(() => {
      reject(`超时:${Date.now() - start}`)
    }, timeout)
  })
}
export function setAdds<T>(
  set: Set<T>,
  ...iterables: Array<Iterable<T> | undefined>
) {
  for (const iterable of iterables) {
    for (const item of iterable ?? []) {
      set.add(item)
    }
  }
  return set
}
export function setExcludes(set: Set<string>, excludes: Set<string>) {
  for (const item of set) {
    excludes.has(item) && set.delete(item)
  }
  return set
}
export function setMap<T, V>(
  set: Set<T>,
  call: (item: T, index: number, set: Set<T>) => V
): Set<V> {
  let setV = new Set<V>()
  let index = 0
  for (const item of set) {
    setV.add(call(item, index, set))
    index++
  }
  return setV
}

export function _new<Args extends any[]>(
  target: any = {},
  classObj: new (...rest: Args) => any,
  ...args: Args
) {
  //1创建一个新对象
  //2原型链链接
  target.__proto__ = classObj.prototype
  let constructor = classObj.prototype.constructor

  //3将构造函数的属性和方法添加到这个新对象中
  let result = constructor.apply(target, args) as any

  if (result && (typeof result == 'object' || typeof result == 'function')) {
    return result
  }
  return target
}
export function isNaN(v: any) {
  return v !== v
}
export function isNotANumber(v: any) {
  return typeof v !== 'number' || isNaN(v)
}
export function isNumberAndNotNaN(v: any): v is number {
  return typeof v === 'number' && !isNaN(v)
}

export function createDynamicColor(n: number, min: number, max: number) {
  const x = createDynamicRelativeValue(n, min, max)
  return `rgb(${x * 255},${255 - x * 255},${255})`
}
export function createDynamicRelativeValue(
  n: number,
  min: number,
  max: number
) {
  if (n >= max) {
    return 1
  }
  if (n <= min) {
    return 0
  }

  return n / (max - min)
}
export async function myRequest(
  url: string,
  opt: {
    method: 'put' | 'post'
    body: FormData
    onProgress: (e: { percent: number }) => void
  }
) {
  return new Promise<{ text: string; event: ProgressEvent<EventTarget> }>(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(opt.method, url)
      xhr.upload.onprogress = event => {
        if (event.lengthComputable) {
          opt.onProgress({ percent: (event.loaded / event.total) * 100 })
        }
      }
      xhr.onerror = e => {
        reject(e)
      }
      xhr.onabort = () => {
        reject('已取消上传')
      }
      xhr.upload.onabort = () => {
        reject('已取消上传')
      }
      xhr.onload = e => {
        if (xhr.status === 200) {
          resolve({ text: (e as any).target.responseText, event: e })
        }
      }
      xhr.send(opt.body)
    }
  )
}
export function createCounter(initialValue: number = 0) {
  return {
    count: initialValue,
    reduce() {
      this.count++
    },
    clear() {
      this.count = 0
    },
    set(n: number) {
      this.count = n
    },
  }
}

export function randomColorHex() {
  return `#${Math.floor(Math.random() * 16777216) // 256 * 256 * 256
    .toString(16)
    .padStart(6, '0')}`
}
export async function retry<E>(
  fn: () => Promise<E>,
  num: number = 3,
  interval: number = 1000
) {
  return new Promise<E>(async (resolve, reject) => {
    let c = num
    while (c > 0) {
      try {
        resolve(await fn())
        return
      } catch (error) {
        c--
        if (c <= 0) {
          reject(error)
          return
        }
      }
      await timeout(interval)
    }
  })
}
export function toLocaleString(time: number) {
  return new Date(time * 1000).toLocaleString()
}

export function defaul<REST extends any[]>(...rest: REST): REST[number] {
  return rest.find(v => v)
}
export function prettifyStringify(obj: any, space: string = '    ') {
  function getSpacing(numberOfSpaces: number) {
    let x = ''
    for (let i = 0; i < numberOfSpaces; i++) {
      x += space
    }
    return x
  }
  let recur = (obj: any, numberOfSpaces: number): string => {
    const _getSpacing = () => getSpacing(numberOfSpaces)
    if (Array.isArray(obj)) {
      // array
      return `[\n${_getSpacing()}${obj
        .map(value => `${recur(value, numberOfSpaces + 1)}`)
        .join(`,\n${_getSpacing()}`)}\n${getSpacing(numberOfSpaces - 1)}]`
    } else if (typeof obj === 'object' && obj !== null) {
      //object
      return `{\n${_getSpacing()}${Object.entries(obj)
        .map(
          ([key, value]) =>
            //key: value
            `${JSON.stringify(key)}: ${recur(value, numberOfSpaces + 1)}`
        )
        .join(`,\n${_getSpacing()}`)}\n${getSpacing(numberOfSpaces - 1)}}`
    } else if (typeof obj === 'string') {
      //string
      return JSON.stringify(obj)
    } else {
      return JSON.stringify(obj)
    }
  }
  return recur(obj, 1)
}

export function strToArrayLikeNumber(str: string): ArrayLike<number> {
  const l = [] as any[]
  for (let index = 0; index < str.length; index++) {
    l.push(str.charCodeAt(index))
  }
  return l
}

export function createVote<T>(options?: { max?: number; min?: number }) {
  let { max, min = 0 } = options ?? {}
  let ballotBox = new Array()
  return {
    add(vote: T) {
      max && ballotBox.length >= max && ballotBox.pop()
      ballotBox.unshift(vote)
    },
    getBallotBox() {
      return ballotBox
    },
    isValidVote() {
      return ballotBox.length >= min
    },
    takeCountOfVotes(): Map<T, number> {
      let result: Map<T, number> = new Map()
      ballotBox.forEach(item => {
        let n = result.get(item)
        if (n) {
          result.set(item, n + 1)
          return
        }
        result.set(item, 1)
      })
      return result
    },
    rate(l: T, r: T) {
      let countOfVotes = this.takeCountOfVotes()

      let lCount = countOfVotes.get(l) ?? 0
      let rConut = countOfVotes.get(r) ?? 0
      console.log(lCount, rConut)

      return lCount / rConut
    },
    proportion(m: T) {
      let countOfVotes = this.takeCountOfVotes()

      let lCount = countOfVotes.get(m) ?? 0
      return lCount / ballotBox.length
    },
  }
}
export function createGetAndInit<T, REST extends any[]>(
  get: (...rest: REST) => T | null | undefined,
  init: (...rest: REST) => T
): (...rest: REST) => T {
  return (...rest) => get(...rest) || init(...rest)
}
export function copyDep<T>(v: T): T {
  let t = typeof v
  if (t === 'object') {
    if (Array.isArray(v)) {
      return v.map(item => copyDep(item)) as any
    } else {
      let o = Object.fromEntries(
        Object.entries(v as any).map(([key, value]) => [key, copyDep(value)])
      ) as any
      o.__proto__ = (v as any).__proto__
      return o
    }
  } else if (t === 'function') {
    return v
  } else {
    return v
  }
}

export function copy<T extends object>(v: T): T {
  return Object.fromEntries(
    Object.entries(v).map(([key, value]) => [key, copyDep(value)])
  ) as any
}
export function call<E>(f: () => E): E {
  return f()
}

export function createFactory<P = any>(
  factory?: <T extends P>(v: T) => T
): <T extends P>(v: T) => T {
  return factory ?? (((v: any) => v) as any)
}
