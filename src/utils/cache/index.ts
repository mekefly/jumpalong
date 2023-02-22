import { withDefault } from "../utils";

export * from "./intelligentCleaning";
/**内存缓存数据对象，更快一点 */
let memoryCacheDate: { [key: string]: any } = {};
const onRequestMap: Record<string, [Function, Function][]> = {};
export function getMemoryCacheLength() {
  return Object.keys(memoryCacheDate).length;
}
export function clearMemoryCache() {
  memoryCacheDate = {} as any;
}

/** @type {*} 缓存失效或没有缓存将会抛出此错误 */
const noCache = Symbol("noCache");
const skip = Symbol("skip");

const defaultCacheOptions: AsyncReCacheOptions = {
  useMemoryCache: true,
  useLocalStorage: true,
  requestMerge: true,
  cacheError: true,
};

const callbackCacheMergeDate: Record<string, any[]> = {};
export function useCallbackCache<E, REST extends any[], C extends object>(
  key: string,
  genValue: (callback: C, ...rest: REST) => E,
  options: AsyncReCacheOptions | undefined,
  callback: C,
  ...rest: REST
): E {
  withDefault(options, defaultCacheOptions);
  let callbackList: any;
  if (options?.requestMerge) {
    callbackList = getCallbackList<C>(options, key, callback);
  }

  const RETURN_KEY = "return:" + key;
  try {
    const value = getCache(key, options) as any;

    const returnValue = getCache(RETURN_KEY, options) as any;

    callCallback<C>(value, callback);

    return returnValue;
  } catch (error) {
    const restListMap = {} as any;

    const callbackProxy = callbackProxyFactory<C>(
      options,
      key,
      callback,
      restListMap,
      callbackList
    );

    //加入缓存空数组是因为，未来所有此请求都会优先读取缓存
    setCache(key, restListMap, options);
    return reCache(RETURN_KEY, genValue, options, callbackProxy, ...rest);
  }
}
function callCallback<C extends object>(value: any, callback: C) {
  setTimeout(() => {
    for (const key in value) {
      const c = (callback as any)[key];
      if (typeof c === "function") {
        const restList = value[key];
        if (!restList) continue;
        for (const rest of restList) {
          c(...rest);
        }
      }
    }
  }, 0);
}

function callbackProxyFactory<C extends object>(
  options: AsyncReCacheOptions | undefined,
  key: string,
  callback: C,
  restListMap: any,
  callbackList: any
) {
  let genCallbackFunciton: any = genCallbackFactory<C>(
    options,
    key,
    callback,
    callbackList
  );
  const callBackProxy = new Proxy(callback, {
    get(t: any, p) {
      const callbackFunciton = genCallbackFunciton(p);
      if (typeof callbackFunciton === "function") {
        return (...rest: any) => {
          // rest push 到 restList里面
          (restListMap[p] ?? (restListMap[p] = [])).push(rest);
          setCache(key, restListMap, options);
          return callbackFunciton(...rest);
        };
      }
      return callbackFunciton;
    },
  });
  return callBackProxy;
}

function genCallbackFactory<C extends object>(
  options: AsyncReCacheOptions | undefined,
  key: string,
  callback: C,
  callbackList: any
) {
  let genCallbackFunciton: any;
  if (options?.requestMerge) {
    genCallbackFunciton =
      (p: string) =>
      (...rest: any) =>
        callbackList.forEach((t: any) => {
          t[p](...rest);
        });
  } else {
    genCallbackFunciton =
      (p: string) =>
      (...rest: any) =>
        (callback as any)[p](...rest);
  }
  return genCallbackFunciton;
}

function getCallbackList<C extends object>(
  options: AsyncReCacheOptions | undefined,
  key: string,
  callback: C
) {
  const callbackListKey = `callbackList:${key}`;
  const callbackListOptions = {
    ...options,
    useLocalStorage: false,
  };
  let v;
  try {
    v = getCache(callbackListKey, callbackListOptions) as any;
  } catch (error) {
    setCache(callbackListKey, (v = []), callbackListOptions);
  }
  v.push(callback);
  return v;
}

/**
 * 异步缓存
 *
 * @export
 * @template E
 * @param {string} key 缓存的key名称
 * @param {() => Promise<E>} genValue 要处理的操作函数返回要缓存的Promise,如果Promise返回拒绝状态将不缓存
 * @param {number} [options] 缓存持续时间
 * @return {*}  {Promise<E>}
 */
export async function useAsyncCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => Promise<E>,
  options: AsyncReCacheOptions,
  ...rest: REST
): Promise<E> {
  withDefault(options, defaultCacheOptions);

  try {
    return getCache(key, options);
  } catch (error) {
    return await asyncReCache(key, genValue, options, ...rest);
  }
}
/**
 * 同步缓存
 *
 * @export
 * @template E
 * @param {string} key
 * @param {() => E} genValue 要处理的操作函数返回要缓存的值
 * @param {number} [options]
 * @return {*}  {E}
 */
export function useCache<E, REST extends any[]>(
  key: string,
  genValue: (...rect: REST) => E,
  options: CacheOptions = defaultCacheOptions,
  ...rest: REST
): E {
  try {
    return getCache(key, options);
  } catch (error) {
    return reCache(key, genValue, options, ...rest);
  }
}
/**
 * 异步从新缓存
 *
 * @param {string} key
 * @param {() => Promise<any>} genValue
 * @param {number} [options]
 * @return {*}  {Promise<any>}
 */
function asyncReCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => Promise<E>,
  options: AsyncReCacheOptions,
  ...rest: REST
): Promise<any> {
  return new Promise<any>((res, rej) => {
    if (options.requestMerge) {
      let reC = false;
      const ResRejList = onRequestMap[key] ?? (onRequestMap[key] = []);
      ResRejList.push([res, rej]);
      ResRejList.length === 1 &&
        genValue(...rest).then(
          (value: any) => {
            ResRejList.forEach((resRejItem) => {
              setCache(key, value, options);
              resRejItem[0](value);
            });
            delete onRequestMap[key];
          },
          (value: any) => {
            ResRejList.forEach((resRejItem) => {
              options.cacheError && setCache(key, value, options);
              resRejItem[1](value);
            });
          }
        );
    } else {
      return genValue(...rest).then(
        (value: any) => {
          setCache(key, value, options);
          return value;
        },
        (e) => e
      );
    }
  });
}
interface AsyncReCacheOptions extends CacheOptions {
  cacheError?: boolean;
  requestMerge?: boolean;
}
/**
 * 从新缓存
 *
 * @template E
 * @param {string} key
 * @param {() => E} genValue
 * @param {number} [options]
 * @return {*}
 */
function reCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => E,
  options?: CacheOptions,
  ...rest: REST
) {
  const value = genValue(...rest);
  setCache(key, value, options);

  return value;
}
/**
 * 获取缓存
 *
 * @param {string} key
 * @return {*}
 */
export function getCache(
  key: string,
  options: CacheOptions = defaultCacheOptions
) {
  try {
    if (!options.useMemoryCache) {
      throw skip;
    }
    return getMemoryCache(key);
  } catch (error) {
    if (!options.useLocalStorage) {
      throw skip;
    }
    const cache = getLocalStorageCache(key);

    return cache;
  }
}
/**
 * 设置缓存
 *
 * @param {string} key
 * @param {*} value
 * @param {number} [duration]
 */
export function setCache(key: string, value: any, options?: CacheOptions) {
  const localStorageCache = createCache(value, options?.duration);

  options?.useMemoryCache && setMemoryCache(key, localStorageCache);
  options?.useLocalStorage && setLocalStorage(key, localStorageCache);
}
export interface CacheOptions {
  duration?: number;
  useMemoryCache?: boolean;
  useLocalStorage?: boolean;
}
/**
 * 缓存内存缓存，更快
 *
 * @param {string} key
 * @return {*}
 */
function getMemoryCache(key: string) {
  const cache = memoryCacheDate[key];

  checkLocalCache(cache);

  return cache.value;
}
/**
 * 获取LocationStorage缓存
 *
 * @param {string} key
 * @return {*}
 */
export function getLocalStorageCache(key: string) {
  const catchString = getLocalStorageString(key);
  const cache: LocalCache<any> = JSON.parse(catchString);

  checkLocalCache(cache);

  return cache.value;
}
/**
 * LocalStorage只可以存储文本
 *
 * @param {string} key
 * @return {*}
 */
function getLocalStorageString(key: string) {
  const valueString = localStorage.getItem(key);

  if (!valueString) {
    throw noCache;
  }
  return valueString;
}
/**
 * 设置内存缓存
 *
 * @param {string} key
 * @param {*} value
 */
function setMemoryCache(key: string, value: any) {
  memoryCacheDate[key] = value;
}
/**
 * 设置LocalStorage缓存
 *
 * @param {string} key
 * @param {*} value
 */
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * 验证本地缓存
 *
 * @template E
 * @param {LocalCache<E>} localCache
 * @return {*}
 */
export function checkLocalCache<E>(localCache: LocalCache<E>) {
  if (!localCache) {
    throw noCache;
  }

  const nowTime = Date.now();
  const updateTime = localCache.updateTime;
  const duration = localCache.duration;

  try {
    if (!(nowTime - updateTime < duration)) {
      throw noCache;
    }
  } catch (error) {
    throw noCache;
  }
}
/**
 * 创建本地缓存
 *
 * @template T
 * @param {T} value
 * @param {number} [duration=3600000]
 * @return {*}  {LocalCache<T>}
 */
export function createCache<T>(
  value: T,
  duration: number = 3600000 /**= 1000 * 60 * 60 1h */
): LocalCache<T> {
  return {
    value,
    updateTime: Date.now(),
    duration,
  };
}
export function isLocalCache(v: any): v is LocalCache<any> {
  if (!v) {
    return false;
  }
  if (typeof v !== "object") {
    return false;
  }
  if (typeof v.updateTime !== "number") {
    return false;
  }
  if (typeof v.duration !== "number") {
    return false;
  }
  return true;
}

/**
 * 本地缓存接口
 *
 * @interface LocalCache
 * @template E
 */
interface LocalCache<E> {
  value: E;
  //unit ms
  updateTime: number;
  //unit ms
  duration: number;
}
