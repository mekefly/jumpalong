import { EventEmitter } from "events";
import { isPromise, withDefault } from "../utils";
import { cacheParser, cacheStringify, createCache } from "./cache";
import { defaultCacheOptions } from "./defaultCacheOptions";
import keylist from "./keylist";
import { AsyncReCacheOptions, Cache, CacheOptions } from "./types";

/**内存缓存数据对象，更快一点 */
let memoryCacheDate: { [key: string]: any } = {};
/** promise合并事件对象 */
const promiseMergeEventEmitter = new EventEmitter();
promiseMergeEventEmitter.setMaxListeners(1000);

/**
 * 异步缓存
 * 和useCache实现是一样的，只是历史残留问题
 *
 * @export
 * @template E
 * @param {string} key 缓存的key名称
 * @param {() => Promise<E>} genValue 要处理的操作函数返回要缓存的Promise,如果Promise返回拒绝状态将不缓存
 * @param {number} [options] 缓存持续时间
 * @return {*}  {Promise<E>}
 */
export const useAsyncCache = useCache;

/**
 * 同步和异部缓存
 * 和useAsyncCache实现是一样的，只是历史残留问题
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
  options: AsyncReCacheOptions = defaultCacheOptions,
  ...rest: REST
): E {
  withDefault(options, defaultCacheOptions);
  try {
    return getCache(key, options);
  } catch (error) {
    return autoReCache(key, genValue, options, rest);
  }
}

export function getMemoryCacheLength() {
  return Object.keys(memoryCacheDate).length;
}
export function clearMemoryCache() {
  memoryCacheDate = {} as any;
}

/** @type {*} 缓存失效或没有缓存将会抛出此错误 */
const noCache = Symbol("noCache");
const skip = Symbol("skip");

/**
 * 异步从新缓存
 *
 * @param {string} key
 * @param {() => Promise<any>} genValue
 * @param {number} [options]
 * @return {*}  {Promise<any>}
 */
export function autoReCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => E,
  options: AsyncReCacheOptions,
  rest: REST
): E {
  const _setCache = (v: any) => {
    setCache(key, v, options);
    return v;
  };

  if (options.requestMerge) {
    //只有第一次执行函数才执行，后面的都等待出结果
    return promiseMerge(key, genValue, options, rest);
  } else {
    return autoAsyncChche(
      key,
      genValue,
      options,
      rest,
      (v) =>
        v.then(_setCache, options.cacheError ? _setCache : undefined) as any
    );
  }
}
/**
 *
 * @param key
 * @returns [[promise resolve callback,promise reject callback],add monitor]
 */
function promiseMerge<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => E,
  options: AsyncReCacheOptions,
  rest: REST
): any {
  const resKey = `res:${key}`;
  const rejKey = `rej:${key}`;
  const emitRes = (v: any) => promiseMergeEventEmitter.emit(resKey, v);
  const emitRej = (v: any) => promiseMergeEventEmitter.emit(rejKey, v);
  const asyncOn = () =>
    new Promise<any>((res, rej) => {
      promiseMergeEventEmitter.once(resKey, res);
      promiseMergeEventEmitter.once(rejKey, rej);
    }) as any;

  if (promiseMergeEventEmitter.listenerCount(resKey) > 0) return asyncOn();

  return autoAsyncChche(key, genValue, options, rest, (v) => {
    v.then(
      (value: any) => {
        setCache(key, value, options);

        emitRes(value);
      },
      (error: any) => {
        options.cacheError && setCache(key, error, options);
        emitRej(error);
      }
    );
    return asyncOn();
  });
}

/**
 * 执行代码后检查结果是不是Promise，是的话就运行promiseHandle，不是的话就运行普通缓存步骤
 *
 * @param key
 * @param genValue
 * @param options
 * @param rest
 * @param promiseHandle
 * @returns
 */
function autoAsyncChche<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => E,
  options: AsyncReCacheOptions,
  rest: REST,
  promiseHandle: (v: Promise<any>) => Promise<any>
): any {
  const v = genValue(...rest);
  if (isPromise(v)) {
    return promiseHandle(v as any);
  } else {
    setCache(key, v, options);
    return v;
  }
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
export function getCacheOrNull<T>(
  key: string,
  options?: CacheOptions
): null | T {
  try {
    return getCache(key, options);
  } catch (error) {
    return null;
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
/**
 * 缓存内存缓存，更快
 *
 * @param {string} key
 * @return {*}
 */
function getMemoryCache(key: string) {
  const cache = memoryCacheDate[key];

  checkCache(cache);

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

  try {
    const cache: Cache<any> = cacheParser(catchString);
    checkCache(cache);
    return cache.value;
  } catch (error) {
    keylist.deleteCacheKey(key);
    throw error;
  }
}

export function deleteCache(key: string) {
  deleteLocalStorageCache(key);
  deleteMemoryCache(key);
}
export function deleteMemoryCache(key: string) {
  delete memoryCacheDate[key];
}
export function deleteLocalStorageCache(key: string) {
  keylist.deleteCacheKey(key);
  localStorage.removeItem(key);
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
 * @param {*} cache
 */
export function setLocalStorage(key: string, cache: any) {
  keylist.addCacheKey(key);
  localStorage.setItem(key, cacheStringify(cache));
}

export function removeCache(key: string) {
  removeMemoryCache(key);
  removeLocalStorage(key);
}
export function removeMemoryCache(key: string) {
  delete memoryCacheDate[key];
}
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
/**
 * 验证本地缓存
 *
 * @template E
 * @param {Cache<E>} localCache
 * @return {*}
 */
export function checkCache<E>(localCache: Cache<E>) {
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
export function isCache(v: any): v is Cache<any> {
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
