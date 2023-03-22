import { Cache } from "./types";

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
): Cache<T> {
  return {
    value,
    updateTime: Date.now(),
    duration,
  };
}

/**
 * 序列化
 * @param cache
 * @returns
 */
export function cacheStringify<T>(cache: Cache<T>): string {
  return `${cache.updateTime},${cache.duration},${JSON.stringify(cache.value)}`;
}

/**
 * 反序列化
 * @param cacheString f
 * @returns
 */
export function cacheParser<T>(cacheString: string): Cache<T> {
  // 13 + 21 + 1 === 35
  const index = searchChar(cacheString, ",", 15, 36);
  if (index === -1) throw new Error("CacheString:Expecting a ','");

  const updateTime = parseInt(cacheString.slice(0, 13));
  //"1679491284606,3000,"value""
  // length=13    |13
  const duration = parseInt(cacheString.slice(14, index));
  const value: T = JSON.parse(cacheString.slice(index + 1));
  return {
    updateTime,
    duration,
    value,
  };
}

export function searchChar(
  str: string,
  char: string,
  start: number,
  end: number
) {
  if (str.length - 1 < end) end = str.length - 1;

  for (let i = start; i <= end; i++) {
    if (str[i] === char) {
      return i;
    }
  }
  return -1;
}
