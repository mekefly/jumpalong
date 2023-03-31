import { config } from "@/nostr/nostr";
import { useCache } from "./cache";

export function getQueryVariable(variable: string): string {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return decodeURI(pair[1]);
    }
  }
  return "";
}

export function interceptTheLastSixDigits(str: string) {
  return str.slice(str.length - 6);
}
export function clipboardText(text: string) {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand("copy", true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
}

export function nowSecondTimestamp() {
  return Math.floor(Date.now() / 1000);
}
export function withDefault<T extends object, D extends object>(
  target?: T,
  def?: D
): T & D {
  if (!target) return { ...def } as any;
  if (!def) return target as any;

  for (const key in def) {
    (target as any)[key] ?? ((target as any)[key] = (def as any)[key]);
  }
  return target as any;
}
export async function timeout(timeout: number = 0) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
export function isClass(c: unknown): c is new (...args: any[]) => any {
  return (
    typeof c === "function" && typeof c.prototype?.constructor === "function"
  );
}
export function isPromise(promise: any) {
  return !!promise && typeof promise.then === "function";
}
export const newWeakMap = (() => {
  if (window.WeakMap) {
    return <K extends object, V>() => {
      return new WeakMap() as WeakMap<K, V>;
    };
  }

  return <K extends object, V>() => {
    return new Map() as WeakMap<K, V>;
  };
})();
export function createId() {
  return Math.random().toString().slice(2);
}

/**
 * 防抖
 * @param f
 * @param delay
 * @returns
 */
export function debounce<F extends (...rest: any) => any>(
  f: F,
  delay: number = 1000
): F & {
  clear?: () => void;
} {
  if (delay <= 0) {
    return f;
  }
  let t: NodeJS.Timeout | undefined;
  const ff = (...rest: any) => {
    clearTimeout(t);
    t = setTimeout(() => f(...rest), delay);
  };
  ff.clear = () => {
    clearTimeout(t);
  };
  return ff as any;
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
  let isRun = false;
  return (...rest: any) => {
    if (isRun) {
      return;
    }

    isRun = true;
    setTimeout(() => (isRun = false), delay);
    return f(...rest);
  };
}
export function searchInsertOnObjectList<
  E extends object,
  K1 extends keyof E,
  K2 extends keyof E[K1],
  K3 extends keyof E[K1][K2],
  K4 extends keyof E[K1][K2][K3],
  K5 extends keyof E[K1][K2][K3][K4]
>(
  objList: E[],
  target: number,
  ...keys: [
    K1,
    K2 | void,
    K3 | void,
    K4 | void,
    K5 | void,
    ...(string | symbol | number | void)[]
  ]
) {
  const len = objList.length;
  const _getValue = (index: number) => getValue(objList[index], keys as any);

  // 两边
  if (target < _getValue(0)) return 0;
  if (target > _getValue(len - 1)) return len;

  // 二分法
  let left = 0,
    right = len - 1;
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (_getValue(mid) === target) return mid;
    else if (_getValue(mid) > target) {
      // target 在左边
      right = mid;
    } else {
      // target 在右边
      left = mid + 1;
    }
  }
  return left;
}
export function reverseSearchInsertOnObjectList<
  E extends object,
  K1 extends keyof E,
  K2 extends keyof E[K1],
  K3 extends keyof E[K1][K2],
  K4 extends keyof E[K1][K2][K3],
  K5 extends keyof E[K1][K2][K3][K4]
>(
  objList: E[],
  target: number,
  ...keys: [
    K1,
    K2 | void,
    K3 | void,
    K4 | void,
    K5 | void,
    ...(string | symbol | number | void)[]
  ]
) {
  const len = objList.length;
  const _getValue = (index: number) => getValue(objList[index], keys as any);

  // 两边
  if (target > _getValue(0)) return 0;
  if (target < _getValue(len - 1)) return len;

  // 二分法
  let left = 0;
  let right = len - 1;

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);

    let midValue = _getValue(mid);

    if (midValue === target) return mid;
    else if (target > midValue) {
      // target 在左边
      right = mid;
    } else {
      // target 在右边
      left = mid + 1;
    }
  }
  return right;
}
function getValue(objs: any, key: (string | number | symbol)[]) {
  return key.reduce((previousValue, currentValue) => {
    if (previousValue === undefined) return undefined;
    return previousValue[currentValue];
  }, objs);
}
export function getSetIncrement<T>(target: Set<T>, increase: Set<T>): Set<T> {
  const increment = new Set<T>();
  increase.forEach((v) => {
    !target.has(v) && increment.add(v);
  });
  return increment;
}

export function arrayRemove<E>(arr: Array<E>, e: E) {
  const index = arr.indexOf(e);
  if (index === -1) {
    return;
  }
  arr.splice(index, 1);
}
export function arrayInsert<E>(arr: Array<E>, e: E, v: E) {
  const index = arr.indexOf(e);
  if (index === -1) {
    return;
  }
  arr.splice(index, 0, v);
}
export function merageSet<T>(...sets: Set<T>[]) {
  const newSet = new Set<T>();
  for (const set of sets) {
    for (const item of set) {
      newSet.add(item);
    }
  }
  return newSet;
}

export function noUndefinedInTheArray<T>(array: T[]): Exclude<T, undefined> {
  return array.filter((item) => item !== undefined) as any;
}
export function objectSet<
  O extends object,
  K extends string | symbol | number,
  V
>(object: O, key: K, value: V): O & { [k in K]: V } {
  (object as any)[key] = value;
  return object as any;
}
export function objectGet<Value>(
  object: object,
  key: string | symbol | number
): Value {
  return (object as any)[key] as any;
}

export async function ping(url: string, timeout: number = 2000) {
  const start = Date.now();
  return new Promise<number>(async (resolve, reject) => {
    try {
      await fetch(`${window.location.protocol}//${url}/`, {
        mode: "no-cors",
      });
      resolve(Date.now() - start);
    } catch (e) {
      if (String(e).includes("Failed to fetch")) {
        reject("无法连接");
      } else {
        reject("未知原因无法连接");
      }
    }
    setTimeout(() => {
      reject(`超时:${Date.now() - start}`);
    }, timeout);
  });
}
export function setAdds<T>(set: Set<T>, iterable: Iterable<T>) {
  for (const item of iterable) {
    set.add(item);
  }
  return set;
}

/**
 * 同步间隔
 * @param key 标记
 * @param fun 函数
 * @param interval 间隔
 * @returns
 */
export function syncInterval(
  key: any,
  fun: () => void,
  interval: number = config.syncInterval
) {
  if (interval === 0) {
    fun();
    return;
  }
  useCache(
    JSON.stringify(key),
    () => {
      fun();
      return true;
    },
    {
      duration: interval,
    }
  );
}

export function _new<Args extends any[]>(
  target: any = {},
  classObj: new (...rest: Args) => any,
  ...args: Args
) {
  //1创建一个新对象
  //2原型链链接
  target.__proto__ = classObj.prototype;
  console.dir(classObj);
  let constructor = classObj.prototype.constructor;

  //3将构造函数的属性和方法添加到这个新对象中
  let result = constructor.apply(target, args) as any;

  if (result && (typeof result == "object" || typeof result == "function")) {
    return result;
  }
  return target;
}
export function isNaN(v: any) {
  return v !== v;
}
export function isNotANumber(v: any) {
  return typeof v !== "number" || isNaN(v);
}
export function isNumberAndNotNaN(v: any): v is number {
  return typeof v === "number" && !isNaN(v);
}

export function createDynamicColor(n: number, min: number, max: number) {
  const x = createDynamicRelativeValue(n, min, max);
  return `rgb(${x * 255},${255 - x * 255},${255})`;
}
export function createDynamicRelativeValue(
  n: number,
  min: number,
  max: number
) {
  if (n >= max) {
    return 1;
  }
  if (n <= min) {
    return 0;
  }

  return n / (max - min);
}
export async function myRequest(
  url: string,
  opt: {
    method: "put" | "post";
    body: FormData;
    onProgress: (e: { percent: number }) => void;
  }
) {
  return new Promise<{ text: string; event: ProgressEvent<EventTarget> }>(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(opt.method, url);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          opt.onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      };
      xhr.onerror = (e) => {
        reject(e);
      };
      xhr.onabort = () => {
        reject("已取消上传");
      };
      xhr.upload.onabort = () => {
        reject("已取消上传");
      };
      xhr.onload = (e) => {
        if (xhr.status === 200) {
          resolve({ text: (e as any).target.responseText, event: e });
        }
      };
      xhr.send(opt.body);
    }
  );
}
export function createCounter(initialValue: number = 0) {
  return {
    count: initialValue,
    reduce() {
      this.count++;
    },
    clear() {
      this.count = 0;
    },
    set(n: number) {
      this.count = n;
    },
  };
}

export function randomColorHex() {
  return `#${Math.floor(Math.random() * 16777216) // 256 * 256 * 256
    .toString(16)
    .padStart(6, "0")}`;
}
