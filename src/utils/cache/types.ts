/**
 * 本地缓存接口
 *
 * @interface LocalCache
 * @template E
 */
export interface Cache<E> {
  value: E;
  //unit ms
  updateTime: number;
  //unit ms
  duration: number;
}
export interface CacheOptions {
  duration?: number;
  useMemoryCache?: boolean;
  useLocalStorage?: boolean;
}
export interface AsyncReCacheOptions extends CacheOptions {
  cacheError?: boolean;
  requestMerge?: boolean;
}
