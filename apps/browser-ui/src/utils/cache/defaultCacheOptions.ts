import { AsyncReCacheOptions } from "./types";

export const defaultCacheOptions: AsyncReCacheOptions = {
  useMemoryCache: true,
  useLocalStorage: true,
  requestMerge: true,
  cacheError: true,
};
